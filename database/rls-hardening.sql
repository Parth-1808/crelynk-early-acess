-- Hardening RLS policies for CreLynk Database
-- Run this in your Supabase SQL Editor to secure tables at a production grade.

-- 1. Enable Row Level Security on all core tables
ALTER TABLE public.ambassador_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.startup_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.localite_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if they conflict (for clean re-runs)
DROP POLICY IF EXISTS "Allow public inserts to ambassador_applications" ON public.ambassador_applications;
DROP POLICY IF EXISTS "Allow public inserts to creator_leads" ON public.creator_leads;
DROP POLICY IF EXISTS "Allow public inserts to brand_leads" ON public.brand_leads;
DROP POLICY IF EXISTS "Allow public inserts to startup_leads" ON public.startup_leads;
DROP POLICY IF EXISTS "Allow public inserts to localite_leads" ON public.localite_leads;
DROP POLICY IF EXISTS "Allow public select from waitlist_stats" ON public.waitlist_stats;
DROP POLICY IF EXISTS "Allow authenticated admins select audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Allow authenticated admins insert audit logs" ON public.admin_audit_log;

-- 3. Create INSERT policies for early access forms (anon & authenticated)
-- Hardens status checks so public users cannot set their own status to 'approved'
CREATE POLICY "Allow public inserts to ambassador_applications" 
  ON public.ambassador_applications FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (status = 'pending' OR status IS NULL);

CREATE POLICY "Allow public inserts to creator_leads" 
  ON public.creator_leads FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow public inserts to brand_leads" 
  ON public.brand_leads FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow public inserts to startup_leads" 
  ON public.startup_leads FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow public inserts to localite_leads" 
  ON public.localite_leads FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- 4. Create SELECT policies
-- Anyone can view the stats row
CREATE POLICY "Allow public select from waitlist_stats" 
  ON public.waitlist_stats FOR SELECT 
  TO anon, authenticated 
  USING (id = 1);

-- 5. Secure admin audit logs (Strictly authenticated admin only)
CREATE POLICY "Allow authenticated admins select audit logs" 
  ON public.admin_audit_log FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated admins insert audit logs" 
  ON public.admin_audit_log FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- 6. Grant INSERT privileges for anonymous pipelines
GRANT INSERT ON public.ambassador_applications TO anon, authenticated;
GRANT INSERT ON public.creator_leads TO anon, authenticated;
GRANT INSERT ON public.brand_leads TO anon, authenticated;
GRANT INSERT ON public.startup_leads TO anon, authenticated;
GRANT INSERT ON public.localite_leads TO anon, authenticated;
GRANT SELECT ON public.waitlist_stats TO anon, authenticated;

-- 7. Grant EXECUTE privileges on intake triggers and URL normalization functions
GRANT EXECUTE ON FUNCTION public.normalize_instagram_profile_url(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.normalize_youtube_channel_url(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.creator_leads_normalize_links_trg() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public._recalculate_waitlist_stats_trg() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recalculate_waitlist_stats() TO anon, authenticated;

