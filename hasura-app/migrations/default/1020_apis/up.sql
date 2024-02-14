
--
-- Returns a randomic set of questions for a test, based on a distribution of categories
--
CREATE OR REPLACE FUNCTION get_random_questions(
  "test_id" INT,
  "max_number" INT,
  "distribution" JSONB
) RETURNS SETOF questions AS $$
DECLARE
  "category_id" INT;
  "percentage" INT;
  "questions_to_fetch" INT;
  "stmt" TEXT;
BEGIN
  -- Loop through each key:value pair in the input JSON object
  FOR "category_id", "percentage" IN
    SELECT * FROM jsonb_each_text("distribution")
  LOOP
    -- Calculate how many questions to fetch for this category
    "questions_to_fetch" := ("percentage"::INT * "max_number") / 100;

    -- Prepare the SQL statement to fetch random questions for the current category
    "stmt" := 'SELECT * FROM questions WHERE test_id = $1 AND category_id = $2 ORDER BY RANDOM() LIMIT $3';

    -- Execute the SQL statement and return the results
    RETURN QUERY EXECUTE "stmt" USING "test_id", "category_id"::INT, "questions_to_fetch";
  END LOOP;
END;
$$ LANGUAGE plpgsql STABLE;


--
-- Replaces the content of a test with the data provided in a JSON object
--
CREATE OR REPLACE FUNCTION import_test(par_test_id INT, json_data JSON)
RETURNS SETOF "ops" AS $$
DECLARE
  category_data JSON;
  question_data JSON;
  answer_data JSON;
  question_id INT;
  category_id INT;
  category_name TEXT;
BEGIN
  -- Remove current data in the test:
  DELETE FROM answers as t WHERE t.question_id IN (SELECT id FROM questions WHERE test_id = par_test_id);
  DELETE FROM questions as t WHERE t.test_id = par_test_id;
  DELETE FROM categories as t WHERE t.test_id = par_test_id;

  -- Update the test with the new data
  UPDATE tests SET
    name = COALESCE(nullif(json_data->>'name', ''), name),
    description = COALESCE(nullif(json_data->>'description', ''), description),
    icon = COALESCE(nullif(json_data->>'icon', ''), icon),
    -- default_num_questions = (json_data->>'default_num_questions')::SMALLINT
    default_num_questions = CASE
                                WHEN json_data::jsonb ? 'default_num_questions' THEN (json_data->>'default_num_questions')::SMALLINT
                                ELSE default_num_questions
                            END
  WHERE id = par_test_id;

  -- Import the categories
  FOR category_data IN SELECT * FROM json_array_elements(json_data->'categories')
  LOOP
    INSERT INTO categories (test_id, name, default_distribution)
    VALUES (par_test_id, category_data->>'name', (category_data->>'default_distribution')::INT);
  END LOOP;

  -- Import the questions
  FOR question_data IN SELECT * FROM json_array_elements(json_data->'questions')
  LOOP
    -- Extract category name from the question data
    -- Fallback on the default category if not present
    IF json_typeof(question_data->'category') IS NOT NULL THEN
      category_name := question_data->>'category';
    ELSE
      IF json_typeof(json_data->'default_category') IS NOT NULL THEN
        category_name := json_data->>'default_category';
      ELSE
        -- hardcoded default category
        category_name := 'default';
      END IF;
    END IF;

    -- Get the category_id by name or create it if it doesn't exist
    SELECT id INTO category_id FROM categories AS t WHERE t.test_id = par_test_id AND name = category_name;
    IF category_id IS NULL THEN
      INSERT INTO categories (test_id, name) VALUES (par_test_id, category_name) RETURNING id INTO category_id;
    END IF;

    -- Insert question into the questions table and get the id of the inserted row
    INSERT INTO questions ("test_id", "category_id", "text")
    VALUES (par_test_id, category_id, question_data->>'text') RETURNING id INTO question_id;
    
    -- Iterate through each answer for the current question
    FOR answer_data IN SELECT * FROM json_array_elements(question_data->'answers')
    LOOP
      INSERT INTO answers (question_id, text, is_correct)
      VALUES (question_id, answer_data->>'text', (answer_data->>'is_correct')::BOOLEAN);
    END LOOP;
  END LOOP;

  RETURN QUERY SELECT 'import' AS name, json_build_object('test_id', par_test_id);
END;
$$ LANGUAGE plpgsql;
