// src/app/products/[...slug]/page.tsx
//
// Catch-all route serving two different page types on purpose:
//   - 1 segment  -> /products/{product-slug}       (single product detail)
//   - 2 segments -> /products/{division}/{category} (category listing)
// This matches your nav structure (Products -> Oil & Gas -> Valves) while
// keeping product URLs flat and short, e.g. /products/lg-17500-diesel-forklift.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/cards/product-card";
import { ProductGallery } from "@/components/products/product-gallery";
import { SpecTable } from "@/components/products/spec-table";
import { Markdown } from "@/components/common/markdown";
import {
  getProductBySlug,
  getProductsByDivision,
  getProductsByCategory,
  getAllProductSlugs,
} from "@/lib/services/products.service";
import { getCategoryBySlug, getDivisionBySlug } from "@/lib/services/industries.service";

// Statically generate every product page at build time — new products added
// later still work fine, Next just renders them on-demand on first visit.
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug: [slug] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length !== 1) return {};

  const [productSlug] = slug;
  if (!productSlug) return {};

  const product = await getProductBySlug(productSlug);
  if (!product) return {};

  return {
    title: `${product.title} | Big 8 Intergrated, LLC`,
    description: product.summary,
  };
}

export default async function ProductsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (slug.length === 1) {
    const [firstSegment] = slug;
    if (!firstSegment) notFound();

    // A single segment could be a division (e.g. /products/medical, no
    // category yet) or a specific product's flat slug — check division
    // first since division slugs are a small, known set.
    const division = await getDivisionBySlug(firstSegment);
    if (division) return <DivisionListing divisionSlug={firstSegment} />;

    return <ProductDetail slug={firstSegment} />;
  }

  if (slug.length === 2) {
    const [divisionSlug, categorySlug] = slug;
    if (!divisionSlug || !categorySlug) notFound();
    return <CategoryListing divisionSlug={divisionSlug} categorySlug={categorySlug} />;
  }

  notFound();
}

async function DivisionListing({ divisionSlug }: { divisionSlug: string }) {
  const division = await getDivisionBySlug(divisionSlug);
  if (!division) notFound();

  const products = await getProductsByDivision(divisionSlug);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="sm">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: division.name },
          ]}
        />
      </Section>

      <Section spacing="sm" className="pt-0">
        <Reveal>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {division.name}
          </h1>
          <p className="mt-2 text-base text-ink-muted">{division.description}</p>
        </Reveal>
      </Section>

      <Section tone="surface" className="pt-0">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.08, 0.3)}>
                <ProductCard product={p} accentIndex={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">No products in this division yet — check back soon.</p>
        )}
      </Section>
    </main>
  );
}

async function ProductDetail({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getProductsByDivision(product.divisionSlug))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="sm">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.divisionName, href: `/products/${product.divisionSlug}` },
            { label: product.title },
          ]}
        />
      </Section>

      <Section spacing="sm" className="pt-0">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <ProductGallery images={product.images} title={product.title} />

            <div className="flex flex-col gap-5">
              <Badge variant="default" className="w-fit">
                {product.categoryName ?? product.divisionName}
              </Badge>
              <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                {product.title}
              </h1>
              <p className="text-base text-ink-muted">{product.summary}</p>
              <span className="text-xl font-semibold text-brand-blue">{product.priceLabel}</span>

              {product.brand ? (
                <p className="text-sm text-ink-muted">
                  Brand: <span className="font-medium text-ink">{product.brand.name}</span>
                </p>
              ) : null}

              <Button asChild size="lg" className="w-fit">
                <Link href={`/contact?product=${product.slug}`}>
                  Request a Quote
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>

              {product.description ? (
                <Markdown>{product.description}</Markdown>
              ) : null}

              {product.specs ? (
                <div className="mt-2">
                  <h2 className="mb-3 font-display text-lg font-semibold text-ink">
                    Specifications
                  </h2>
                  <SpecTable specs={product.specs} />
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ink">
            More from {product.divisionName}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.08, 0.3)}>
                <ProductCard product={p} accentIndex={i} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}
    </main>
  );
}

async function CategoryListing({
  divisionSlug,
  categorySlug,
}: {
  divisionSlug: string;
  categorySlug: string;
}) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category || category.divisionSlug !== divisionSlug) notFound();

  const products = await getProductsByCategory(categorySlug);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="sm">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: category.divisionName, href: `/products/${category.divisionSlug}` },
            { label: category.name },
          ]}
        />
      </Section>

      <Section spacing="sm" className="pt-0">
        <Reveal>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-2 text-base text-ink-muted">{category.divisionName}</p>
        </Reveal>
      </Section>

      <Section tone="surface" className="pt-0">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.08, 0.3)}>
                <ProductCard product={p} accentIndex={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">No products in this category yet — check back soon.</p>
        )}
      </Section>
    </main>
  );
}
