export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export type { User } from "@supabase/supabase-js";
