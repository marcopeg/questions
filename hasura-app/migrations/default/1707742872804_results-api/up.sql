CREATE OR REPLACE FUNCTION submit_results(hasura_session JSON, test_id INT, user_answers JSON)
RETURNS SETOF results AS $$
#variable_conflict use_variable
DECLARE
    verification_result JSONB := '[]'::JSONB;
    test_data JSONB;
    total_answers INT := 0;
    correct_answers INT := 0;
    qa_record RECORD;
    _user_id TEXT;
    _score INT;
    recent_entry_exists BOOLEAN;
    question_ids INT[];
BEGIN
    -- Extract user_id from the Hasura session JSON object
    _user_id := hasura_session ->> 'x-hasura-user-id';
    
    -- Check if a result for the same test and the same user exists within the last 30 seconds
    SELECT EXISTS(
        SELECT 1
        FROM results AS r
        WHERE r.test_id = test_id
          AND r.user_id = _user_id
          AND r.created_at > NOW() - INTERVAL '30 seconds'
    ) INTO recent_entry_exists;

    -- IF recent_entry_exists THEN
    --     RAISE EXCEPTION 'Too many answers in so little time!';
    -- END IF;

    -- Extract question IDs from user_answers
    SELECT array_agg((trim(leading 'q' from key))::INT)
    INTO question_ids
    FROM json_each_text(user_answers);

    -- Aggregate information about the test, categories, and questions with answers
    -- Filter questions based on the extracted question IDs
    SELECT jsonb_build_object(
        'test', (SELECT to_jsonb(t.*) FROM tests t WHERE t.id = test_id),
        'categories', (SELECT jsonb_agg(to_jsonb(c.*)) FROM categories c WHERE c.test_id = test_id),
        'questions', (SELECT jsonb_agg(jsonb_build_object(
            'id', q.id,
            'text', q.text,
            'category_id', q.category_id,
            'answers', (
                SELECT jsonb_agg(jsonb_build_object(
                    'id', a.id,
                    'text', a.text,
                    'is_correct', a.is_correct
                )) FROM answers a WHERE a.question_id = q.id
            )
        )) FROM questions q WHERE q.test_id = test_id AND q.id = ANY(question_ids))
    ) INTO test_data;

    -- Iterate through each key-value pair in the input JSONB object to verify answers
    FOR qa_record IN SELECT (trim(leading 'q' from key)::INT) AS question_id, (value::text::INT) AS answer_id
        FROM json_each_text(user_answers)
    LOOP
        -- Append each verification result as an element of the array
        verification_result := verification_result || jsonb_build_array(jsonb_build_object(
            'question_id', qa_record.question_id,
            'answer_id', qa_record.answer_id,
            'is_correct', COALESCE((SELECT a.is_correct FROM answers a WHERE a.id = qa_record.answer_id AND a.question_id = qa_record.question_id), false)
        ));

        IF COALESCE((SELECT a.is_correct FROM answers a WHERE a.id = qa_record.answer_id AND a.question_id = qa_record.question_id), false) THEN
            correct_answers := correct_answers + 1;
        END IF;
        total_answers := total_answers + 1;
    END LOOP;

    -- Calculate score as correct answers / total answers * 100
    IF total_answers > 0 THEN
        _score := (correct_answers * 100) / total_answers;
    ELSE
        _score := 0; -- Handle case with no answers
    END IF;

    -- Insert the record into the results table and return the inserted record
    RETURN QUERY INSERT INTO results (test_id, user_id, score, results, data)
    VALUES (test_id, _user_id, _score, verification_result, test_data)
    RETURNING *;
END;
$$ LANGUAGE plpgsql;