DROP TRIGGER IF EXISTS trg_after_insert_results_to_stats_tests ON results;
DROP FUNCTION IF EXISTS fn_populate_stats_tests();

DROP TRIGGER IF EXISTS trg_after_insert_stats_answers ON stats_answers;
DROP FUNCTION IF EXISTS fn_update_stats_questions();

DROP TRIGGER IF EXISTS trg_after_insert_results_to_stats_answers ON results;
DROP FUNCTION IF EXISTS fn_insert_stats_answers();
