-- Fix early access submission permissions for anon and authenticated users.
-- Resolves: "permission denied for function normalize_instagram_profile_url"
-- when visitors submit lead intake forms on the landing page.

-- 1. Ensure trigger function runs with SECURITY DEFINER and a pinned search_path
ALTER FUNCTION public.creator_leads_normalize_links_trg() SECURITY DEFINER;
ALTER FUNCTION public.creator_leads_normalize_links_trg() SET search_path = public, pg_temp;

-- 2. Grant EXECUTE privileges to anon and authenticated roles
GRANT EXECUTE ON FUNCTION public.normalize_instagram_profile_url(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.normalize_youtube_channel_url(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.creator_leads_normalize_links_trg() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public._recalculate_waitlist_stats_trg() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_waitlist_stats() TO anon, authenticated;
