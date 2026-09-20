// src/lib/services/products.service.ts
//
// Product data access — backed by Postgres via Prisma. Two return shapes:
//   - ProductSummary: lightweight, for grids/cards (getFeaturedProducts,
//     getProductsByDivision, getProductsByCategory)
//   - ProductDetail: everything, for a single /products/[slug] page
//     (getProductBySlug)
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { Prisma } from "@/generated/prisma/client";
import type { ProductSummary, ProductDetail } from "@/types/content";

// Shared select — every list query pulls exactly what ProductSummary needs
// and nothing more, so listing pages stay fast even as the catalog grows.
const summarySelect = {
  id: true,
  slug: true,
  title: true,
  summary: true,
  price: true,
  currency: true,
  division: { select: { slug: true, name: true } },
  category: { select: { slug: true, name: true } },
  brand: { select: { slug: true, name: true } },
  images: { orderBy: { position: "asc" }, take: 1 },
} satisfies Prisma.ProductSelect;

type SummaryRow = Prisma.ProductGetPayload<{ select: typeof summarySelect }>;

function toSummary(row: SummaryRow): ProductSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    image: row.images[0]
      ? { url: row.images[0].url, alt: row.images[0].alt }
      : { url: "/images/products/placeholder.png", alt: row.title },
    priceLabel: formatPrice(row.price ? Number(row.price) : null, row.currency),
    divisionSlug: row.division.slug,
    divisionName: row.division.name,
    categorySlug: row.category?.slug,
    categoryName: row.category?.name,
    brandSlug: row.brand?.slug,
    brandName: row.brand?.name,
  };
}

export async function getFeaturedProducts(limit?: number): Promise<ProductSummary[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, featured: true },
    select: summarySelect,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toSummary);
}

export async function getProductsByDivision(divisionSlug: string): Promise<ProductSummary[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, division: { slug: divisionSlug } },
    select: summarySelect,
    orderBy: { title: "asc" },
  });
  return rows.map(toSummary);
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductSummary[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, category: { slug: categorySlug } },
    select: summarySelect,
    orderBy: { title: "asc" },
  });
  return rows.map(toSummary);
}

export async function getAllProducts(): Promise<ProductSummary[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    select: summarySelect,
    orderBy: { title: "asc" },
  });
  return rows.map(toSummary);
}

// Powers /products/[slug] — the full detail page.
export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const row = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      division: { select: { slug: true, name: true } },
      category: { select: { slug: true, name: true } },
      brand: { select: { slug: true, name: true, logoUrl: true } },
      images: { orderBy: { position: "asc" } },
    },
  });
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    image: row.images[0]
      ? { url: row.images[0].url, alt: row.images[0].alt }
      : { url: "/images/products/placeholder.png", alt: row.title },
    images: row.images.map((img) => ({ url: img.url, alt: img.alt })),
    priceLabel: formatPrice(row.price ? Number(row.price) : null, row.currency),
    specs: (row.specs as Record<string, string> | null) ?? null,
    divisionSlug: row.division.slug,
    divisionName: row.division.name,
    categorySlug: row.category?.slug,
    categoryName: row.category?.name,
    brand: row.brand,
  };
}

// Used by /products filters — only brands that actually have at least one
// product, so the dropdown never shows an option with zero results.
export async function getProductBrands(): Promise<
  Array<{ slug: string; name: string }>
> {
  const rows = await prisma.brand.findMany({
    where: { products: { some: { isActive: true } } },
    select: { slug: true, name: true },
    orderBy: { name: "asc" },
  });
  return rows;
}

// Used by generateStaticParams() on the product detail route so every
// product page can be statically generated at build time.
export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}
// --- Admin-only ---------------------------------------------------------
// Deliberately separate from the public getAllProducts(): includes inactive
// products (public listings never should), and returns isActive/featured
// so the admin table can show real status, not just what a visitor sees.
export interface AdminProductRow {
  id: string;
  slug: string;
  title: string;
  image: { url: string; alt: string } | null;
  divisionName: string;
  categoryName: string | null;
  brandName: string | null;
  priceLabel: string;
  isActive: boolean;
  featured: boolean;
}

export async function getAllProductsForAdmin(): Promise<AdminProductRow[]> {
  const rows = await prisma.product.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      division: { select: { name: true } },
      category: { select: { name: true } },
      brand: { select: { name: true } },
      images: { orderBy: { position: "asc" }, take: 1 },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    image: row.images[0] ? { url: row.images[0].url, alt: row.images[0].alt } : null,
    divisionName: row.division.name,
    categoryName: row.category?.name ?? null,
    brandName: row.brand?.name ?? null,
    priceLabel: formatPrice(row.price ? Number(row.price) : null, row.currency),
    isActive: row.isActive,
    featured: row.featured,
  }));
}

// Used by the admin product form's Brand dropdown — unlike getProductBrands()
// (used for the public filter bar), this includes brands with zero products
// yet, since the admin needs to be able to assign a brand to a brand-new product.
export async function getAllBrandsForAdmin(): Promise<Array<{ id: string; slug: string; name: string }>> {
  const rows = await prisma.brand.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { name: "asc" },
  });
  return rows;
}