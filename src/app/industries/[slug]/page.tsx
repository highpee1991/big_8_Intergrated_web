// src/app/industries/[slug]/page.tsx
//
// Single dynamic segment (not a catch-all) — unlike Products, Industries
// nav has no second-level sub-menu, so every industry page is exactly
// /industries/{division-slug}.
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
import {
  getDivisionWithCategoriesBySlug,
  getDivisions,
} from "@/lib/services/industries.service";
import { getProductsByDivision } from "@/lib/services/products.service";
import { CtaSection } from "@/features/home/components/cta-section";
import { getHeroContent } from "@/lib/services/homepage.service";

export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((d) => ({ slug: d.slug }));
}

 const [hero] = await Promise.all([
    getHeroContent(),
  ]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionWithCategoriesBySlug(slug);
  if (!division) return {};

  return {
    title: `${division.name} | Big 8 Intergrated, LLC`,
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
          <div className="flex flex-col gap-4">
            <span className="flex size-12 items-center justify-center rounded-lg bg-surface">
              <Icon className="size-6 text-secondary" aria-hidden="true" />
            </span>
            <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {division.name}
            </h1>
            <p className="max-w-2xl text-base text-ink-muted">{division.description}</p>

            {division.categories && division.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {division.categories.map((category) => (
                  <Link key={category.id} href={`/products/${division.slug}/${category.slug}`}>
                    <Badge variant="default" className="hover:bg-border/40">
                      {category.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : null}

            <Button asChild variant="link" className="w-fit px-0">
              <Link href={`/products/${division.slug}`}>
                View all {division.name} products
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section tone="surface" className="pt-0">
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
            No products listed for this division yet — reach out and we&apos;ll help source what
            you need.
          </p>
        )}
      </Section>

      <Section spacing="sm" className="pt-0">
              <CtaSection content={hero} />
      </Section>
    </main>
  );
}
