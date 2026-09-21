// src/app/industries/[slug]/page.tsx
//
// Single dynamic segment (not a catch-all) , unlike Products, Industries
// nav has no second-level sub-menu, so every industry page is exactly
// /industries/{division-slug}.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/section";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Reveal } from "@/components/common/reveal";
import { Cta } from "@/components/common/cta";
import { ProductCard } from "@/components/cards/product-card";
import {
  getDivisionWithCategoriesBySlug,
  getDivisions,
} from "@/lib/services/industries.service";
import { getProductsByDivision } from "@/lib/services/products.service";

export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionWithCategoriesBySlug(slug);
  if (!division) return {};

  return {
    title: `${division.name} | Big 8 Intergrated LLC`,
    description: division.description,
  };
}

export default async function IndustrySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const division = await getDivisionWithCategoriesBySlug(slug);
  if (!division) notFound();

  const products = await getProductsByDivision(slug);
  const Icon = division.icon;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="sm">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: division.name },
          ]}
        />
      </Section>

      <Section spacing="sm" className="pt-0">
        <Reveal>
          <div className="flex max-w-3xl flex-col gap-4">
            <div className="flex items-center gap-2 text-secondary">
              <Icon className="size-4" aria-hidden="true" />
              <span className="font-mono text-xs font-medium uppercase tracking-widest">
                Industry
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
              {division.name}
            </h1>
            <p className="max-w-2xl text-lg text-ink-muted">{division.description}</p>

            <Link
              href={`/products/${division.slug}`}
              className="group mt-2 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary"
            >
              View all {division.name} products
              <ArrowRight
                className="size-4 transition-transform duration-base group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {division.categories && division.categories.length > 0 ? (
            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-muted">
                Product Categories
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {division.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/${division.slug}/${category.slug}`}
                    className="group inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-primary"
                  >
                    {category.name}
                    <ArrowRight
                      className="size-3.5 -translate-x-0.5 opacity-0 transition-all duration-base group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </Reveal>
      </Section>

      <Section tone="surface">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 0.08, 0.3)}>
                <ProductCard product={p} accentIndex={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">
            No products listed for this division yet , reach out and we&apos;ll help source what
            you need.
          </p>
        )}
      </Section>

      <Section spacing="sm" className="pt-0">
        <Reveal>
          <Cta
            title={`Need something specific from ${division.name}?`}
            description="Tell us what you're looking for and we'll source it."
            primaryLabel="Contact Us"
            primaryHref={`/contact?division=${division.slug}`}
          />
        </Reveal>
      </Section>
    </main>
  );
}
