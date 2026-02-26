import { createClient } from "@supabase/supabase-js";

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const configuredSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasSupabaseConfig = Boolean(
  configuredSupabaseUrl && configuredSupabaseAnonKey
);

if (!hasSupabaseConfig) {
  console.error(
    "Brakuje VITE_SUPABASE_URL lub VITE_SUPABASE_ANON_KEY. Aplikacja uruchomiona w trybie ograniczonym (bez połączenia z Supabase)."
  );
}

const supabaseUrl = configuredSupabaseUrl ?? "https://example.supabase.co";
const supabaseAnonKey = configuredSupabaseAnonKey ?? "missing-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const isSupabaseConfigured = hasSupabaseConfig;

export const auth = {
  signUp: async (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  },
  signIn: async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return supabase.auth.signOut();
  },
  getSession: async () => {
    return supabase.auth.getSession();
  },
};
