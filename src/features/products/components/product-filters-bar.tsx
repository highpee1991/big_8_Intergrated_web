// src/features/products/components/product-filters-bar.tsx
//
// Filter controls for /products — Division, Category (scoped to the
// selected division), Brand, and a text search. Reads/writes the shared
// Zustand store; the actual filtering happens in filtered-product-grid.tsx,
// which subscribes to the same store.
"use client";

import * as React from "react";
import { useProductFiltersStore } from "@/store/product-filters.store";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/content";

export interface ProductFiltersBarProps {
  // Deliberately NOT the full Division type — Division.icon is a component
  // (LucideIcon), and Server Components cannot pass functions/components as
  // props into Client Components like this one. Only plain, serializable
  // data crosses that boundary, so this only takes what the dropdown
  // actually needs.
  divisions: Array<{ slug: string; name: string }>;
  categories: Category[];
  brands: Array<{ slug: string; name: string }>;
  /** From ?q= on /products — set once, from the header search redirect. */
  initialSearch?: string;
}

function ProductFiltersBar({
  divisions,
  categories,
  brands,
  initialSearch,
}: ProductFiltersBarProps) {
  const { divisionSlug, categorySlug, brandSlug, search, setDivision, setCategory, setBrand, setSearch, reset } =
    useProductFiltersStore();

  React.useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
    // Only ever apply the URL's initial value once, on mount — not on
    // every render, or it would fight with the user typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryOptions = divisionSlug
    ? categories.filter((c) => c.divisionSlug === divisionSlug)
    : categories;

  const hasActiveFilters = Boolean(divisionSlug || categorySlug || brandSlug || search);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="filter-search">
            Search
          </label>
          <Input
            id="filter-search"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="filter-division">
            Division
          </label>
          <Select
            id="filter-division"
            value={divisionSlug ?? ""}
            onChange={(e) => setDivision(e.target.value || null)}
          >
            <option value="">All Divisions</option>
            {divisions.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="filter-category">
            Category
          </label>
          <Select
            id="filter-category"
            value={categorySlug ?? ""}
            onChange={(e) => setCategory(e.target.value || null)}
            disabled={categoryOptions.length === 0}
          >
            <option value="">All Categories</option>
            {categoryOptions.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="filter-brand">
            Brand
          </label>
          <Select
            id="filter-brand"
            value={brandSlug ?? ""}
            onChange={(e) => setBrand(e.target.value || null)}
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {hasActiveFilters ? (
        <Button variant="ghost" size="sm" onClick={reset} className="w-fit">
          Clear all filters
        </Button>
      ) : null}
    </div>
  );
}

export { ProductFiltersBar };
