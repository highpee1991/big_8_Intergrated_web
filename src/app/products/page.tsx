// src/app/products/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { ProductCard } from "@/components/cards/product-card";
import { getAllProducts } from "@/lib/services/products.service";

export const metadata: Metadata = { title: "Products | Big 8 Intergrated, LLC" };

export default async function ProductsPage() {
  const products = await getAllProducts();

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
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.06, 0.3)}>
                <ProductCard product={p} accentIndex={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">No products available yet — check back soon.</p>
        )}
      </Section>
    </main>
  );
}
