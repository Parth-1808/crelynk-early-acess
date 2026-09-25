-- Run this SQL in your Supabase SQL Editor to enable anonymous validation
-- of ambassador referral codes from the landing page.

-- 1. Enable RLS on the ambassador_applications table
ALTER TABLE public.ambassador_applications ENABLE ROW LEVEL SECURITY;

-- 2. Grant SELECT privileges to public (anonymous) and logged-in users
GRANT SELECT ON public.ambassador_applications TO anon, authenticated;

-- 3. Create a policy that allows anyone to verify if a referral code is approved/active
-- (It only returns matching rows if the ambassador status is 'approved')
CREATE POLICY "Allow public verification of active referral codes"
  ON public.ambassador_applications
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');
