// src/lib/services/industries.service.ts
//
// Division ("industry") data access — now backed by Postgres via Prisma
// instead of the static src/data/industries.ts file. Function names and
// return shapes match the original static-data version on purpose, so
// every component that already calls getDivisions()/getDivisionBySlug()
// keeps working unchanged.
import { prisma } from "@/lib/prisma";
import { resolveIcon } from "@/lib/icon-map";
import type { Division, Category } from "@/types/content";

export async function getDivisions(): Promise<Division[]> {
  const rows = await prisma.division.findMany({
    orderBy: { name: "asc" },
  });

  return rows.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    description: d.description,
    icon: resolveIcon(d.icon),
  }));
}

export async function getDivisionBySlug(slug: string): Promise<Division | undefined> {
  const row = await prisma.division.findUnique({ where: { slug } });
  if (!row) return undefined;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: resolveIcon(row.icon),
  };
}

// Used by the Products nav mega-menu — each division comes back with its
// categories attached (e.g. Oil & Gas -> [Valves, Actuators, Welding Material]).
// Divisions with no categories yet simply return an empty array, not an error —
// the nav renders them as a flat link instead of a dropdown.
export async function getDivisionsWithCategories(): Promise<Division[]> {
  const rows = await prisma.division.findMany({
    orderBy: { name: "asc" },
    include: { categories: { orderBy: { sortOrder: "asc" } } },
  });

  return rows.map((d) => ({
    id: d.id,
    slug: d.slug,
    name: d.name,
    description: d.description,
    icon: resolveIcon(d.icon),
    categories: d.categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      divisionSlug: d.slug,
      divisionName: d.name,
    })),
  }));
}

// Powers /products/[division]/[category] listing pages.
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const row = await prisma.category.findUnique({
    where: { slug },
    include: { division: { select: { slug: true, name: true } } },
  });
  if (!row) return undefined;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    divisionSlug: row.division.slug,
    divisionName: row.division.name,
  };
}

// Powers /industries/[slug] — one division plus its categories (if any),
// e.g. Oil & Gas -> [Valves, Actuators, Welding Material]. More efficient
// than fetching all divisions when only one is needed.
export async function getDivisionWithCategoriesBySlug(
  slug: string,
): Promise<Division | undefined> {
  const row = await prisma.division.findUnique({
    where: { slug },
    include: { categories: { orderBy: { sortOrder: "asc" } } },
  });
  if (!row) return undefined;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: resolveIcon(row.icon),
    categories: row.categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      divisionSlug: row.slug,
      divisionName: row.name,
    })),
  };
}
