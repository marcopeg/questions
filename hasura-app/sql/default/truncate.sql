-- --
-- -- This query empties all data tables
-- -- useful before restoring a backup.
-- --

-- -- Tables that appear to be at the end of your dependency chain:
-- TRUNCATE TABLE public.user_trails CASCADE;
-- TRUNCATE TABLE public.user_sessions CASCADE;
-- TRUNCATE TABLE public.user_devices CASCADE;
-- TRUNCATE TABLE public.story_links CASCADE;
-- TRUNCATE TABLE public.story_lines CASCADE;
-- TRUNCATE TABLE public.story_collections CASCADE;
-- TRUNCATE TABLE public.user_login CASCADE;
-- TRUNCATE TABLE public.user_signin CASCADE;
-- TRUNCATE TABLE public.user_profile CASCADE;
-- TRUNCATE TABLE public.user_words CASCADE;
-- TRUNCATE TABLE public.user_words_focus CASCADE;
-- TRUNCATE TABLE public.translate_words CASCADE;

-- -- Tables that are less dependent on others:
-- TRUNCATE TABLE public.issues CASCADE;
-- TRUNCATE TABLE public.stories CASCADE;
-- TRUNCATE TABLE public.languages CASCADE;
-- TRUNCATE TABLE public.levels CASCADE;
-- TRUNCATE TABLE public.settings CASCADE;

-- -- Tables that are central or foundational to your schema:
-- TRUNCATE TABLE public.users CASCADE;

-- -- Support tables
-- TRUNCATE TABLE public.audit_trails CASCADE;
-- TRUNCATE TABLE public.kpis_numeric CASCADE;
-- TRUNCATE TABLE public.settings CASCADE;
-- TRUNCATE TABLE public.voiceover CASCADE;


