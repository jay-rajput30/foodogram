import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ydeaiqvklkrvicygqzsp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZWFpcXZrbGtydmljeWdxenNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MTg0MzgsImV4cCI6MjAwMjA5NDQzOH0.SDyz8XjrYiClI8kshxdLavOLUqcd7XNdxRVtyp2hQ50"
);
