import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL'; // TODO: Replace with your Supabase project URL
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'; // TODO: Replace with your Supabase anon/public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 