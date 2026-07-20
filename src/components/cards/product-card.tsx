import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface ProductCardProps {
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  accentIndex?: number;
}

const ACCENT_BARS = ["bg-brand-blue", "bg-brand-red", "bg-brand-amber", "bg-brand-green"];

function ProductCard({ title, category, imageSrc, imageAlt, accentIndex = 0 }: ProductCardProps) {
  const accent = ACCENT_BARS[accentIndex % ACCENT_BARS.length];

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-base hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className={cn("absolute inset-x-0 top-0 h-1", accent)} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <Badge variant="default" className="w-fit">
          {category}
        </Badge>
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      </div>
    </div>
  );
}

export { ProductCard };
