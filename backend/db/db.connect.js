import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.REACT_BACKEND_URL,
  process.env.REACT_BACKEND_PUBLIC_KEY
);
