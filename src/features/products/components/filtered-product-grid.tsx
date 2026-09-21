// src/features/products/components/filtered-product-grid.tsx
//
// Renders the /products grid, filtered client-side against the shared
// Zustand store. Client-side filtering (not a server round-trip per
// change) is the right call at this catalog size , instant feedback,
// no loading spinner between keystrokes. Revisit if the catalog grows
// into the hundreds/thousands of products.
"use client";

import { useMemo } from "react";
import { useProductFiltersStore } from "@/store/product-filters.store";
import { ProductCard } from "@/components/cards/product-card";
import { Reveal } from "@/components/common/reveal";
import type { ProductSummary } from "@/types/content";

export interface FilteredProductGridProps {
  products: ProductSummary[];
}

function FilteredProductGrid({ products }: FilteredProductGridProps) {
  const { divisionSlug, categorySlug, brandSlug, search } = useProductFiltersStore();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((p) => {
      if (divisionSlug && p.divisionSlug !== divisionSlug) return false;
      if (categorySlug && p.categorySlug !== categorySlug) return false;
      if (brandSlug && p.brandSlug !== brandSlug) return false;
      if (query) {
        const haystack = `${p.title} ${p.summary}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [products, divisionSlug, categorySlug, brandSlug, search]);

  if (filtered.length === 0) {
    return (
      <p className="py-12 text-center text-ink-muted">
        No products match your filters , try clearing one or two.
      </p>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-ink-muted">
        {filtered.length} {filtered.length === 1 ? "product" : "products"}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.05, 0.25)}>
            <ProductCard product={p} accentIndex={i} />
          </Reveal>
        ))}
      </div>
    </>
  );
}

export { FilteredProductGrid };
