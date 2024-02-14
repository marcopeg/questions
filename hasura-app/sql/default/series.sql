--
-- This query resets the auto-increment series in the project.
-- useful after restoring a backup.
--

SELECT setval('tests_id_seq', COALESCE((SELECT MAX(id)+1 FROM tests), 1), false);
SELECT setval('categories_id_seq', COALESCE((SELECT MAX(id)+1 FROM categories), 1), false);
SELECT setval('questions_id_seq', COALESCE((SELECT MAX(id)+1 FROM questions), 1), false);
SELECT setval('answers_id_seq', COALESCE((SELECT MAX(id)+1 FROM answers), 1), false);
SELECT setval('results_id_seq', COALESCE((SELECT MAX(id)+1 FROM results), 1), false);
