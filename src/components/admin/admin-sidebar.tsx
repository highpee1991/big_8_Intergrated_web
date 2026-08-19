// src/components/admin/admin-sidebar.tsx
//
// Left nav for the whole /admin section. Client component since it needs
// usePathname to highlight the active link — everything else in the admin
// shell (layout, auth check) stays server-side.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/admin/actions";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
];

export interface AdminSidebarProps {
  userEmail: string;
}

function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card flex h-screen w-60 shrink-0 flex-col border-r">
      <div className="border-border border-b px-5 py-5">
        <p className="font-display text-ink text-sm font-semibold">Big 8 Intergrated</p>
        <p className="text-muted font-mono text-xs uppercase tracking-widest">Admin</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          // Dashboard ("/admin") should only be active on an exact match —
          // otherwise every /admin/* sub-page would light it up too.
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-ink-muted hover:bg-surface hover:text-ink",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-border border-t p-3">
        <Link
          href="/"
          target="_blank"
          className="text-ink-muted hover:bg-surface hover:text-ink flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          View live site
        </Link>
        <div className="mt-2 flex items-center justify-between gap-2 px-3 py-2">
          <p className="text-muted truncate text-xs" title={userEmail}>
            {userEmail}
          </p>
          <form action={logout}>
            <button
              type="submit"
              aria-label="Sign out"
              className="text-muted hover:text-danger shrink-0 transition-colors"
            >
              <LogOut className="size-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}

export { AdminSidebar };
