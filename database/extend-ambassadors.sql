-- 1. Extend the public.ambassador_applications table
ALTER TABLE public.ambassador_applications ADD COLUMN IF NOT EXISTS photo_url text;
ALTER TABLE public.ambassador_applications ADD COLUMN IF NOT EXISTS public_tagline text; -- max 60 chars, e.g. "Skincare · Mumbai · 47k"
ALTER TABLE public.ambassador_applications ADD COLUMN IF NOT EXISTS consent_public_feature boolean DEFAULT false;
ALTER TABLE public.ambassador_applications ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE public.ambassador_applications ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT true;

-- 2. Create the public bucket 'ambassador-photos' if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ambassador-photos', 'ambassador-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Setup bucket upload/download policies for public uploads
-- Allow anonymous / public users to upload photos to 'ambassador-photos'
CREATE POLICY "Allow public uploads to ambassador-photos" 
  ON storage.objects FOR INSERT 
  TO public 
  WITH CHECK (bucket_id = 'ambassador-photos');

-- Allow anyone (public/anon) to read photos from the 'ambassador-photos' bucket
CREATE POLICY "Allow public select from ambassador-photos" 
  ON storage.objects FOR SELECT 
  TO public 
  USING (bucket_id = 'ambassador-photos');
