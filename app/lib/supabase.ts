import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Types for our database schema
export interface Task {
  id: string;
  name: string;
  domain: string;
  month: string;
  task_index: number;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrmOrganization {
  id: string;
  name: string;
  address: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  business_type: string | null;
  tags: string[];
  date_added: string;
}

export interface CrmPerson {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  job_title: string | null;
  description: string | null;
  tags: string[];
  date_added: string;
  last_contacted: string | null;
}

export interface CrmPersonOrganization {
  id: string;
  person_id: string;
  organization_id: string;
  role: string | null;
  is_primary: boolean;
  created_at: string;
}

export interface CrmNote {
  id: string;
  entity_id: string;
  entity_type: 'person' | 'organization';
  content: string;
  timestamp: string;
}

export interface Link {
  id: string;
  title: string;
  summary: string | null;
  bullet_points: string[];
  url: string;
  date_added: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'editor' | 'viewer';
  created_at: string;
}

// Server-side client (for API routes) - untyped for flexibility
// eslint-disable-next-line
let serverClient: SupabaseClient<any, "public", any> | null = null;

export function getSupabaseServerClient() {
  if (serverClient) return serverClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  serverClient = createClient(supabaseUrl, supabaseAnonKey);
  return serverClient;
}

// Browser client (for client components)
// eslint-disable-next-line
let browserClient: ReturnType<typeof createBrowserClient<any>> | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
}

// Helper to generate task key from database fields
export function getTaskKeyFromTask(task: Task): string {
  return `${task.domain}-${task.month}-${task.task_index}`;
}

// Helper to parse task key into components
export function parseTaskKey(taskKey: string): { domain: string; month: string; taskIndex: number } | null {
  const match = taskKey.match(/^(.+)-(\d{4}-\d{2})-(\d+)$/);
  if (!match) return null;
  return {
    domain: match[1],
    month: match[2],
    taskIndex: parseInt(match[3], 10),
  };
}
