-- WaterOS Docs - Storage Bucket Migration
-- Version: 1.0
-- Date: 2025-11-28
--
-- This migration creates the storage bucket for CRM avatars.
--
-- IMPORTANT: Storage bucket creation must be done via the Supabase Dashboard
-- or the Supabase Management API, not via SQL. This file documents the setup.
--
-- Steps to create the bucket:
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New bucket"
-- 3. Name: crm-avatars
-- 4. Public bucket: YES (so avatar URLs are publicly accessible)
-- 5. Click "Create bucket"
--
-- After creating the bucket, run these policies in the SQL Editor:

-- Allow public read access to avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'crm-avatars');

-- Allow authenticated users to upload avatars (when auth is enabled)
-- For now, allow anonymous uploads since auth isn't set up yet
CREATE POLICY "Anyone can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'crm-avatars');

-- Allow updates to avatars
CREATE POLICY "Anyone can update avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'crm-avatars');

-- Allow deletion of avatars
CREATE POLICY "Anyone can delete avatars"
ON storage.objects FOR DELETE
USING (bucket_id = 'crm-avatars');
