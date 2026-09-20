// src/components/admin/admin-sidebar.tsx
//
// Left nav for the whole /admin section. Collapsible — wide tables (like
// the products list) need the room, so the collapsed state persists across
// visits via localStorage rather than resetting every page load.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut, ExternalLink, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/admin/actions";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
];

const STORAGE_KEY = "admin-sidebar-collapsed";

export interface AdminSidebarProps {
  userEmail: string;
}

function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Read the saved preference after mount (not during SSR, since
  // localStorage doesn't exist on the server) so a returning admin's
  // choice persists across page loads instead of resetting every time.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "true") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "border-border bg-card flex h-screen shrink-0 flex-col border-r transition-[width] duration-base",
        collapsed ? "w-16" : "w-60",
      )}
    >
      <div className="border-border flex items-center justify-between gap-2 border-b px-3 py-5">
        {!collapsed ? (
          <div className="min-w-0 px-2">
            <p className="font-display text-ink truncate text-sm font-semibold">Big 8 Intergrated</p>
            <p className="text-muted font-mono text-xs uppercase tracking-widest">Admin</p>
          </div>
        ) : null}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-muted hover:bg-surface hover:text-ink flex size-8 shrink-0 items-center justify-center rounded-md transition-colors"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                isActive ? "bg-primary/10 text-primary" : "text-ink-muted hover:bg-surface hover:text-ink",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              {!collapsed ? item.label : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-border border-t p-3">
        <Link
          href="/"
          target="_blank"
          title={collapsed ? "View live site" : undefined}
          className={cn(
            "text-ink-muted hover:bg-surface hover:text-ink flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            collapsed && "justify-center px-0",
          )}
        >
          <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
          {!collapsed ? "View live site" : null}
        </Link>
        <div
          className={cn(
            "mt-2 flex items-center gap-2 px-3 py-2",
            collapsed ? "justify-center px-0" : "justify-between",
          )}
        >
          {!collapsed ? (
            <p className="text-muted truncate text-xs" title={userEmail}>
              {userEmail}
            </p>
          ) : null}
          <form action={logout}>
            <button
              type="submit"
              aria-label="Sign out"
              title={collapsed ? `Sign out (${userEmail})` : undefined}
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
