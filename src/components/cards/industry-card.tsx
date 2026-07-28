// src/components/cards/industry-card.tsx
//
// Used on the homepage (no link — purely informational) and on /industries
// (fully clickable — whole card links to /industries/{slug}). Pass `href` to
// make it a link; omit it to keep the old, non-clickable behavior.
import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  href?: string;
  accentIndex?: number;
}

const ACCENT_BARS = ["bg-brand-blue", "bg-brand-red", "bg-brand-amber", "bg-brand-green"];

function IndustryCard({ icon: Icon, title, description, href, accentIndex = 0 }: IndustryCardProps) {
  const accent = ACCENT_BARS[accentIndex % ACCENT_BARS.length];

  const content = (
    <>
      <div className={cn("h-1 w-full", accent)} aria-hidden="true" />
      <div className="flex flex-col gap-3 p-6">
        <Icon className="size-6 text-secondary" aria-hidden="true" />
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
    </>
  );

  const className =
    "group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-base hover:shadow-md";

  if (href) {
    return (
      <Link
        href={href}
        className={cn(className, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue")}
      >
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export { IndustryCard };
