import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detect if we are in "Mock Mode" (missing or placeholder key)
const isMock = !supabaseAnonKey || supabaseAnonKey.includes('... ') || supabaseAnonKey === 'YOUR_ACTUAL_KEY_HERE';

if (isMock && typeof window !== 'undefined') {
  console.warn('⚠️ Supabase API key is missing or invalid. ScamShield is running in DEVELOPMENT MOCK MODE.');
}

// Singleton pattern to prevent multiple instances in development
const globalForSupabase = global as unknown as { supabase: ReturnType<typeof createClient> };

export const supabase = 
  globalForSupabase.supabase || 
  createClient(supabaseUrl, isMock ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.key' : supabaseAnonKey);

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = supabase;

/**
 * Helper to check if we should bypass real auth
 */
export const useMockAuth = () => isMock;
