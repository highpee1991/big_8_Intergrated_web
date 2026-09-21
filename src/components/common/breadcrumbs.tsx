// src/components/common/breadcrumbs.tsx
//
// Reusable across product detail pages, category listings, and (later)
// industry pages , anywhere a "Home / Section / Current page" trail is needed.
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit on the last/current item
}

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
          {i > 0 ? <ChevronRight className="size-3.5 text-ink-muted" aria-hidden="true" /> : null}
          {item.href ? (
            <Link href={item.href} className="text-ink-muted transition-colors hover:text-ink">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export { Breadcrumbs };
