import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IndustryCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;

  accentIndex?: number;
}

const ACCENT_BARS = ["bg-brand-blue", "bg-brand-red", "bg-brand-amber", "bg-brand-green"];

function IndustryCard({ icon: Icon, title, description, accentIndex = 0 }: IndustryCardProps) {
  const accent = ACCENT_BARS[accentIndex % ACCENT_BARS.length];

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-base hover:shadow-md">
      <div className={cn("h-1 w-full", accent)} aria-hidden="true" />
      <div className="flex flex-col gap-3 p-6">
        <Icon className="size-6 text-secondary" aria-hidden="true" />
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
      </div>
    </div>
  );
}

export { IndustryCard };
