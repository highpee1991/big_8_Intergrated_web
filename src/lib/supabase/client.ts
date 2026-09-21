// src/lib/supabase/client.ts
//
// Browser-side Supabase client , used in Client Components. Not needed for
// the admin login itself (that goes through a Server Action instead, so the
// password never needs client-side JS to handle it), but kept here since
// any future client-side Supabase usage should import from this one place.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
