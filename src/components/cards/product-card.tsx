// src/components/cards/product-card.tsx
//
// Reusable product card used on the homepage, /products, and /industries/[slug].
// The ENTIRE card is a single Link to the product's detail page — no separate
// "View details" link inside it. Takes a ProductSummary directly so callers
// never have to unpack/rename fields.
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ProductSummary } from "@/types/content";

export interface ProductCardProps {
  product: ProductSummary;
  accentIndex?: number;
}

const ACCENT_BARS = ["bg-brand-blue", "bg-brand-red", "bg-brand-amber", "bg-brand-green"];

function ProductCard({ product, accentIndex = 0 }: ProductCardProps) {
  const accent = ACCENT_BARS[accentIndex % ACCENT_BARS.length];
  const badgeLabel = product.categoryName ?? product.divisionName;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-base hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-surface">
        <Image
          src={product.image.url}
          alt={product.image.alt}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className={cn("absolute inset-x-0 top-0 h-1", accent)} aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Badge variant="default" className="w-fit">
          {badgeLabel}
        </Badge>
        <h3 className="font-display text-base font-semibold text-ink">{product.title}</h3>
        <p className="line-clamp-2 text-sm text-ink-muted">{product.summary}</p>
        <span className="mt-auto pt-2 text-sm font-medium text-brand-blue">
          {product.priceLabel}
        </span>
      </div>
    </Link>
  );
}

export { ProductCard };
