import type { Database } from './supabase';

export type Tool = Database['public']['Tables']['tools']['Row'];
