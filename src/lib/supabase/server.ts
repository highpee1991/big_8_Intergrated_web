// src/lib/supabase/server.ts
//
// Server-side Supabase client — used in Server Components, Server Actions,
// and Route Handlers. Reads/writes the session via cookies. The setAll
// try/catch is intentional: Server Components can't write cookies (only
// read them) — proxy.ts is what actually persists a refreshed session;
// this just needs to not crash when called from a context that can't write.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component — proxy.ts handles session refresh.
          }
        },
      },
    },
  );
}
