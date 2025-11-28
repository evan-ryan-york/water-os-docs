-- WaterOS Docs - Initial Schema Migration
-- Version: 1.0
-- Date: 2025-11-28

-- ============================================
-- 1. TASKS (Execution Plan)
-- ============================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  month TEXT NOT NULL,
  task_index INT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(domain, month, task_index)
);

-- Index for common queries
CREATE INDEX idx_tasks_domain_month ON tasks(domain, month);
CREATE INDEX idx_tasks_is_completed ON tasks(is_completed);

-- ============================================
-- 2. CRM ORGANIZATIONS
-- ============================================
CREATE TABLE crm_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  business_type TEXT,
  tags TEXT[] DEFAULT '{}',
  date_added TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crm_organizations_name ON crm_organizations(name);

-- ============================================
-- 3. CRM PEOPLE
-- ============================================
CREATE TABLE crm_people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  job_title TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  date_added TIMESTAMPTZ DEFAULT NOW(),
  last_contacted TIMESTAMPTZ
);

CREATE INDEX idx_crm_people_name ON crm_people(last_name, first_name);
CREATE INDEX idx_crm_people_email ON crm_people(email);

-- ============================================
-- 4. CRM PEOPLE <-> ORGANIZATIONS (Many-to-Many)
-- ============================================
CREATE TABLE crm_people_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES crm_people(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES crm_organizations(id) ON DELETE CASCADE,
  role TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(person_id, organization_id)
);

CREATE INDEX idx_crm_people_organizations_person ON crm_people_organizations(person_id);
CREATE INDEX idx_crm_people_organizations_org ON crm_people_organizations(organization_id);

-- ============================================
-- 5. CRM NOTES
-- ============================================
CREATE TABLE crm_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('person', 'organization')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crm_notes_entity ON crm_notes(entity_id, entity_type);

-- ============================================
-- 6. LINKS
-- ============================================
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  bullet_points TEXT[] DEFAULT '{}',
  url TEXT NOT NULL UNIQUE,
  date_added TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_links_date_added ON links(date_added DESC);

-- ============================================
-- 7. USER ROLES (for auth)
-- ============================================
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id)
);

-- ============================================
-- 8. HELPER FUNCTION FOR ROLE CHECKING
-- ============================================
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role FROM user_roles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_editor()
RETURNS BOOLEAN AS $$
  SELECT get_user_role(auth.uid()) = 'editor';
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_viewer_or_editor()
RETURNS BOOLEAN AS $$
  SELECT get_user_role(auth.uid()) IN ('editor', 'viewer');
$$ LANGUAGE SQL SECURITY DEFINER;

-- ============================================
-- 9. ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_people_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- TASKS policies
CREATE POLICY "tasks_select" ON tasks FOR SELECT USING (is_viewer_or_editor());
CREATE POLICY "tasks_insert" ON tasks FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "tasks_update" ON tasks FOR UPDATE USING (is_editor());
CREATE POLICY "tasks_delete" ON tasks FOR DELETE USING (is_editor());

-- CRM ORGANIZATIONS policies
CREATE POLICY "crm_organizations_select" ON crm_organizations FOR SELECT USING (is_viewer_or_editor());
CREATE POLICY "crm_organizations_insert" ON crm_organizations FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "crm_organizations_update" ON crm_organizations FOR UPDATE USING (is_editor());
CREATE POLICY "crm_organizations_delete" ON crm_organizations FOR DELETE USING (is_editor());

-- CRM PEOPLE policies
CREATE POLICY "crm_people_select" ON crm_people FOR SELECT USING (is_viewer_or_editor());
CREATE POLICY "crm_people_insert" ON crm_people FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "crm_people_update" ON crm_people FOR UPDATE USING (is_editor());
CREATE POLICY "crm_people_delete" ON crm_people FOR DELETE USING (is_editor());

-- CRM PEOPLE_ORGANIZATIONS policies
CREATE POLICY "crm_people_organizations_select" ON crm_people_organizations FOR SELECT USING (is_viewer_or_editor());
CREATE POLICY "crm_people_organizations_insert" ON crm_people_organizations FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "crm_people_organizations_update" ON crm_people_organizations FOR UPDATE USING (is_editor());
CREATE POLICY "crm_people_organizations_delete" ON crm_people_organizations FOR DELETE USING (is_editor());

-- CRM NOTES policies
CREATE POLICY "crm_notes_select" ON crm_notes FOR SELECT USING (is_viewer_or_editor());
CREATE POLICY "crm_notes_insert" ON crm_notes FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "crm_notes_update" ON crm_notes FOR UPDATE USING (is_editor());
CREATE POLICY "crm_notes_delete" ON crm_notes FOR DELETE USING (is_editor());

-- LINKS policies
CREATE POLICY "links_select" ON links FOR SELECT USING (is_viewer_or_editor());
CREATE POLICY "links_insert" ON links FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "links_update" ON links FOR UPDATE USING (is_editor());
CREATE POLICY "links_delete" ON links FOR DELETE USING (is_editor());

-- USER ROLES policies (users can see their own role, only editors can manage)
CREATE POLICY "user_roles_select_own" ON user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_roles_select_all" ON user_roles FOR SELECT USING (is_editor());
CREATE POLICY "user_roles_insert" ON user_roles FOR INSERT WITH CHECK (is_editor());
CREATE POLICY "user_roles_update" ON user_roles FOR UPDATE USING (is_editor());
CREATE POLICY "user_roles_delete" ON user_roles FOR DELETE USING (is_editor());

-- ============================================
-- 10. STORAGE BUCKET FOR AVATARS
-- ============================================
-- Run this in the Supabase dashboard or via the Storage API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('crm-avatars', 'crm-avatars', true);

-- Storage policies (run in dashboard):
-- CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'crm-avatars');
-- CREATE POLICY "Editors can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'crm-avatars' AND is_editor());
-- CREATE POLICY "Editors can update avatars" ON storage.objects FOR UPDATE USING (bucket_id = 'crm-avatars' AND is_editor());
-- CREATE POLICY "Editors can delete avatars" ON storage.objects FOR DELETE USING (bucket_id = 'crm-avatars' AND is_editor());

-- ============================================
-- 11. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
