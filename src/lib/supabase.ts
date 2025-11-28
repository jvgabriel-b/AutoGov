import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  full_name: string;
  organization: string | null;
  role: 'admin' | 'manager' | 'analyst' | 'field_worker';
  requires_password_change?: boolean;
  created_at: string;
  updated_at?: string;
};

export type Module = {
  id: string;
  name: string;
  description: string;
  icon: string;
  display_order: number;
  enabled: boolean;
};

export type ActivityLog = {
  id: string;
  user_id: string;
  module_id: string | null;
  action: string;
  description: string | null;
  created_at: string;
};
