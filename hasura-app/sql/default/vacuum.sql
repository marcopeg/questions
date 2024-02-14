-- --
-- -- This query vacuums all tables.
-- -- useful after restoring a backup or running huge changes
-- --

-- VACUUM ANALYZE public.user_trails;
-- VACUUM ANALYZE public.user_sessions;
-- VACUUM ANALYZE public.user_devices;
-- VACUUM ANALYZE public.story_links;
-- VACUUM ANALYZE public.story_lines;
-- VACUUM ANALYZE public.story_collections;
-- VACUUM ANALYZE public.user_login;
-- VACUUM ANALYZE public.user_profile;
-- VACUUM ANALYZE public.user_words;
-- VACUUM ANALYZE public.user_words_focus;
-- VACUUM ANALYZE public.translate_words;

-- -- Tables that are less dependent on others:
-- VACUUM ANALYZE public.issues;
-- VACUUM ANALYZE public.stories;
-- VACUUM ANALYZE public.languages;
-- VACUUM ANALYZE public.levels;
-- VACUUM ANALYZE public.settings;

-- -- Tables that are central or foundational to your schema:
-- VACUUM ANALYZE public.users;

-- -- Support tables
-- VACUUM ANALYZE public.audit_trails;
-- VACUUM ANALYZE public.kpis_numeric;
-- VACUUM ANALYZE public.settings;
-- VACUUM ANALYZE public.voiceover;


