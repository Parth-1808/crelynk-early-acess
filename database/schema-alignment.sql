-- CreLynk schema alignment migration
-- Run this in Supabase SQL editor.

-- 1) Ambassador form currently stores profile image URL.
ALTER TABLE public.ambassador_applications
  ADD COLUMN IF NOT EXISTS profile_picture_url text;

-- 2) Localite profiles should support the same front-page feature toggle pattern.
ALTER TABLE public.localite_leads
  ADD COLUMN IF NOT EXISTS show_on_front boolean DEFAULT false;

ALTER TABLE public.localite_leads
  ADD COLUMN IF NOT EXISTS show_on_profiles boolean DEFAULT true;

-- 3) Ensure localite table has a PK for stable realtime behavior.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'localite_leads_pkey'
      AND conrelid = 'public.localite_leads'::regclass
  ) THEN
    ALTER TABLE public.localite_leads
      ADD CONSTRAINT localite_leads_pkey PRIMARY KEY (id);
  END IF;
END
$$;

-- 4) Optional: align waitlist totals with current UI copy.
-- Uncomment if desired.
-- UPDATE public.waitlist_stats
-- SET brand_total_spots = 25,
--     ambassador_total_spots = 5
-- WHERE id = 1;

-- 5) Ensure localite table is replicated by Supabase Realtime publication.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'localite_leads'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.localite_leads;
  END IF;
END
$$;

-- 6) RLS policies so localites can be inserted and publicly listed on profiles page.
ALTER TABLE public.localite_leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'localite_leads'
      AND policyname = 'localite_leads_insert_anon'
  ) THEN
    CREATE POLICY localite_leads_insert_anon
    ON public.localite_leads
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'localite_leads'
      AND policyname = 'localite_leads_select_profiles_public'
  ) THEN
    CREATE POLICY localite_leads_select_profiles_public
    ON public.localite_leads
    FOR SELECT
    TO anon, authenticated
    USING (COALESCE(show_on_profiles, true) = true);
  END IF;
END
$$;

-- 7) Grant SELECT and setup public reading policies for creators, brands, and startups
GRANT SELECT ON public.creator_leads TO anon, authenticated;
GRANT SELECT ON public.brand_leads TO anon, authenticated;
GRANT SELECT ON public.startup_leads TO anon, authenticated;

ALTER TABLE public.creator_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_leads ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'creator_leads'
      AND policyname = 'creator_leads_select_profiles_public'
  ) THEN
    CREATE POLICY creator_leads_select_profiles_public
    ON public.creator_leads
    FOR SELECT
    TO anon, authenticated
    USING (COALESCE(show_on_profiles, true) = true);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'brand_leads'
      AND policyname = 'brand_leads_select_profiles_public'
  ) THEN
    CREATE POLICY brand_leads_select_profiles_public
    ON public.brand_leads
    FOR SELECT
    TO anon, authenticated
    USING (COALESCE(show_on_profiles, true) = true);
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'startup_leads'
      AND policyname = 'startup_leads_select_profiles_public'
  ) THEN
    CREATE POLICY startup_leads_select_profiles_public
    ON public.startup_leads
    FOR SELECT
    TO anon, authenticated
    USING (COALESCE(show_on_profiles, true) = true);
  END IF;
END
$$;

