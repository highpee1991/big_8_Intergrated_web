// src/app/admin/login/page.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="bg-surface flex min-h-screen items-center justify-center px-4">
      <div className="border-border bg-card w-full max-w-sm rounded-lg border p-8 shadow-sm">
        <h1 className="font-display text-ink mb-1 text-xl font-semibold">Admin Login</h1>
        <p className="text-ink-muted mb-6 text-sm">Big 8 Intergrated admin dashboard</p>

        {error ? (
          <p className="bg-danger/10 text-danger mb-4 rounded-md px-3 py-2 text-sm">{error}</p>
        ) : null}

        <form action={login} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5"
            />
          </div>
          <Button type="submit" className="mt-2 w-full">
            Sign In
          </Button>
        </form>
      </div>
    </main>
  );
}
