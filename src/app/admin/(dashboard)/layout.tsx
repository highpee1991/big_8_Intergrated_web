// src/app/admin/(dashboard)/layout.tsx
//
// The (dashboard) route group means this layout applies to every admin
// page EXCEPT /admin/login, which lives outside this group and therefore
// never gets the sidebar , the clean, idiomatic way to do this in the App
// Router, instead of trying to detect the current path inside a layout
// (layouts don't receive pathname directly).
//
// Auth check here is defense-in-depth, not the primary guard , proxy.ts
// already redirects unauthenticated requests before this layout even runs.
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userEmail={user.email ?? ""} />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
