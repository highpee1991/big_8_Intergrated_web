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

// Used by generateStaticParams() on the product detail route so every
// product page can be statically generated at build time.
export async function getAllProductSlugs(): Promise<string[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}
