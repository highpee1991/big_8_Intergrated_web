import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CtaProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/**
 * Full-width call-to-action banner. Deliberately dark/high-contrast so it
 * reads as a distinct closing moment, not another content section.
 */
function Cta({ title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref }: CtaProps) {
  return (
    <div className="flex flex-col items-start gap-6 rounded-lg bg-ink px-8 py-12 sm:px-12 sm:py-16 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-(--measure) text-base text-paper/70">{description}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={primaryHref}>
            {primaryLabel}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button asChild size="lg" variant="outline" className="border-paper/20 text-paper hover:bg-paper/10">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export { Cta };
