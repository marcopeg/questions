CREATE OR REPLACE FUNCTION get_dashboard()
RETURNS SETOF ops AS $$
BEGIN
  RETURN QUERY SELECT 'data', json_build_object(
    'tot_users', (SELECT COUNT(DISTINCT user_id) FROM stats_tests),
    'tot_tests', (SELECT COUNT(*) FROM tests),
    'tot_questions', (SELECT COUNT(*) FROM questions),
    'tot_answers', (SELECT COUNT(*) FROM answers),
    'tot_results', (SELECT COUNT(*) FROM results),
    'avg_score', (SELECT ROUND(AVG(score)) FROM results),
    'last_result', (SELECT MAX(created_at) FROM results)
  );
END;
$$ LANGUAGE plpgsql STABLE;