-- Run this SQL in your Supabase SQL Editor to support saving coupon codes in the backend
-- and tracking ambassador referrals.

-- Add coupon_code column to creator_leads
ALTER TABLE public.creator_leads 
  ADD COLUMN IF NOT EXISTS coupon_code character varying;

-- Add coupon_code column to brand_leads
ALTER TABLE public.brand_leads 
  ADD COLUMN IF NOT EXISTS coupon_code character varying;

-- Add coupon_code column to startup_leads
ALTER TABLE public.startup_leads 
  ADD COLUMN IF NOT EXISTS coupon_code character varying;

-- Add coupon_code column to localite_leads
ALTER TABLE public.localite_leads 
  ADD COLUMN IF NOT EXISTS coupon_code character varying;

-- Add referral_code column to ambassador_applications
ALTER TABLE public.ambassador_applications 
  ADD COLUMN IF NOT EXISTS referral_code character varying;
