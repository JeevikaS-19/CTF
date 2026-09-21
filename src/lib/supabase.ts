/**
 * lib/supabase.ts — Supabase client initialization.
 * AREA: Backend + Supabase
 * OWNER: TBD (Backend owner)
 * STATUS: initialized only — not imported by any page yet
 * TODO(backend): wire this into shared/api/* functions
 *
 * DECISION: createClient is called once here (module singleton pattern).
 * Env vars are read at import time; missing vars will cause a runtime warning
 * but won't crash the dev server, keeping the scaffold runnable without .env.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. ' +
      'Copy .env.example to .env and fill in your Supabase credentials.',
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '');
