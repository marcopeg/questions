--
-- results -> stats_answers
-- collects unique answer records for each test
--
CREATE OR REPLACE FUNCTION fn_insert_stats_answers()
RETURNS TRIGGER AS $$
DECLARE
    answer_record JSONB;
BEGIN
    -- Loop through the array of answers in the 'results' JSONB column of the newly inserted row
    FOR answer_record IN SELECT json_array_elements(NEW.results) AS answer
    LOOP
        INSERT INTO stats_answers (created_at, test_id, question_id, answer_id, user_id, is_correct)
        VALUES (NEW.created_at, NEW.test_id, (answer_record->>'question_id')::INT, 
                (answer_record->>'answer_id')::INT, NEW.user_id, 
                (answer_record->>'is_correct')::BOOLEAN);
    END LOOP;
    
    -- Return the new row to allow the insert operation to complete
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_insert_results_to_stats_answers
AFTER INSERT ON results
FOR EACH ROW
EXECUTE FUNCTION fn_insert_stats_answers();



--
-- stats_answers -> stats_questions
-- collects unique questions records for each test
--
CREATE OR REPLACE FUNCTION fn_update_stats_questions()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if a corresponding record exists in stats_questions
    IF EXISTS (SELECT 1 FROM stats_questions WHERE question_id = NEW.question_id AND user_id = NEW.user_id) THEN
        -- Update existing record
        UPDATE stats_questions
        SET total_answers = total_answers + 1,
            total_correct = total_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
            score = (total_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END)::NUMERIC / (total_answers + 1) * 100,
            updated_at = CURRENT_TIMESTAMP
        WHERE question_id = NEW.question_id AND user_id = NEW.user_id;
    ELSE
        -- Insert new record
        INSERT INTO stats_questions (test_id, question_id, user_id, total_answers, total_correct, score, updated_at)
        VALUES (NEW.test_id, NEW.question_id, NEW.user_id, 1, CASE WHEN NEW.is_correct THEN 1 ELSE 0 END, 
                CASE WHEN NEW.is_correct THEN 100 ELSE 0 END, CURRENT_TIMESTAMP);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_insert_stats_answers
AFTER INSERT ON stats_answers
FOR EACH ROW
EXECUTE FUNCTION fn_update_stats_questions();



--
-- results -> stats_tests
-- collects unique test records for each user
-- (this one was sketched by GPT but I had to work it out quite a bit)
--
CREATE OR REPLACE FUNCTION fn_populate_stats_tests()
RETURNS TRIGGER AS $$
DECLARE
    _total_questions INT := 0;
    _total_questions_answered INT := 0;
    _min_score NUMERIC(5,2) := 0;
    _max_score NUMERIC(5,2) := 0;
    _avg_score NUMERIC(5,2) := 0;
    _unique_answers INT[] := ARRAY[]::INT[];
BEGIN
    -- Assuming results.data contains all questions for the test and results.results contains answered questions
    -- _total_questions := (SELECT json_array_length(data->'questions') FROM results WHERE id = NEW.id);
    _total_questions := (SELECT count(*) FROM questions WHERE test_id = NEW.test_id);
    _total_questions_answered := json_array_length(NEW.results);
    _unique_answers := ARRAY(SELECT json_array_elements_text(NEW.results)::json->>'question_id');

    -- Calculate min, max, and avg scores if applicable from your data structure
    -- For demonstration, assuming NEW.score is directly usable
    _min_score := NEW.score;
    _max_score := NEW.score;
    _avg_score := NEW.score;

    -- Update stats_tests with the new statistics
    IF EXISTS (SELECT 1 FROM stats_tests WHERE test_id = NEW.test_id AND user_id = NEW.user_id) THEN
      UPDATE stats_tests
      SET tot_questions = _total_questions,
          tot_results = tot_results + 1,
          min_score = LEAST(min_score, _min_score),
          max_score = GREATEST(max_score, _max_score),
          avg_score = (_avg_score + avg_score) / 2, -- Simplified calculation
          unique_answers = ARRAY(SELECT DISTINCT unnest(_unique_answers || stats_tests.unique_answers)),
          tot_questions_answered = array_length(ARRAY(SELECT DISTINCT unnest(_unique_answers || stats_tests.unique_answers)), 1),
          completion = ROUND(array_length(ARRAY(SELECT DISTINCT unnest(_unique_answers || stats_tests.unique_answers)), 1) * 100 / _total_questions),
          updated_at = CURRENT_TIMESTAMP
      WHERE test_id = NEW.test_id AND user_id = NEW.user_id;
    ELSE
      INSERT INTO stats_tests (user_id, test_id, tot_results, tot_questions, tot_questions_answered, completion, min_score, max_score, avg_score, unique_answers, created_at, updated_at)
      VALUES (
        NEW.user_id, 
        NEW.test_id,
        1,
        _total_questions, 
        _total_questions_answered,
        ROUND(_total_questions_answered * 100 / _total_questions),
        _min_score, 
        _max_score, 
        _avg_score, 
        _unique_answers, 
        CURRENT_TIMESTAMP, 
        CURRENT_TIMESTAMP
      );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_insert_results_to_stats_tests
AFTER INSERT ON results
FOR EACH ROW
EXECUTE FUNCTION fn_populate_stats_tests();
