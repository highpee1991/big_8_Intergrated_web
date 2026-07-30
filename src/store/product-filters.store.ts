// src/store/product-filters.store.ts
//
// Client-side filter state for the /products grid. Deliberately simple:
// four fields, four setters, one reset. Filtering itself happens in the
// component that reads this store (useFilteredProducts) — this store only
// holds "what's currently selected," nothing else.
"use client";

import { create } from "zustand";

export interface ProductFiltersState {
  divisionSlug: string | null;
  categorySlug: string | null;
  brandSlug: string | null;
  search: string;
  setDivision: (slug: string | null) => void;
  setCategory: (slug: string | null) => void;
  setBrand: (slug: string | null) => void;
  setSearch: (value: string) => void;
  reset: () => void;
}

const initialState = {
  divisionSlug: null,
  categorySlug: null,
  brandSlug: null,
  search: "",
};

export const useProductFiltersStore = create<ProductFiltersState>((set) => ({
  ...initialState,
  setDivision: (slug) =>
    set({
      divisionSlug: slug,
      // Changing division invalidates any selected category from a
      // different division, so clear it rather than leave a stale filter
      // silently applied.
      categorySlug: null,
    }),
  setCategory: (slug) => set({ categorySlug: slug }),
  setBrand: (slug) => set({ brandSlug: slug }),
  setSearch: (value) => set({ search: value }),
  reset: () => set(initialState),
}));