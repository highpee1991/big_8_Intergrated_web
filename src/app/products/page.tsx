// src/app/products/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { ProductFiltersBar } from "@/features/products/components/product-filters-bar";
import { FilteredProductGrid } from "@/features/products/components/filtered-product-grid";
import { getAllProducts, getProductBrands } from "@/lib/services/products.service";
import { getDivisions, getAllCategories } from "@/lib/services/industries.service";

export const metadata: Metadata = { title: "Products | Big 8 Intergrated, LLC" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [products, divisions, categories, brands] = await Promise.all([
    getAllProducts(),
    getDivisions(),
    getAllCategories(),
    getProductBrands(),
  ]);

  // ProductFiltersBar is a Client Component — pass only plain, serializable
  // fields. Division.icon is a component reference, which Server Components
  // are not allowed to hand to Client Components.
  const filterDivisions = divisions.map(({ slug, name }) => ({ slug, name }));

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="md">
        <SectionHeader
          eyebrow="Our Catalog"
          title="Products"
          description="Equipment and supplies across all eight of our divisions."
        />
      </Section>

      <Section tone="surface" className="pt-0">
        <div className="mb-8">
          <ProductFiltersBar
            divisions={filterDivisions}
            categories={categories}
            brands={brands}
            initialSearch={q}
          />
        </div>

        {products.length > 0 ? (
          <FilteredProductGrid products={products} />
        ) : (
          <p className="text-ink-muted">No products available yet — check back soon.</p>
        )}
      </Section>
    </main>
  );
}
