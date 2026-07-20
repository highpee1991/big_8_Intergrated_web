import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/content";

export interface FeaturedProductsSectionProps {
  products: Product[];
}

function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <Section tone="paper">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            className="min-w-0"
            eyebrow="Featured Products"
            title="A sample of what we supply"
            description="A cross-section of equipment and products across our divisions."
          />
          <Button asChild variant="link" className="shrink-0">
            <Link href="/products">
              View all products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i * 0.08, 0.3)}>
            <ProductCard
              title={product.title}
              category={product.category}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              accentIndex={i}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { FeaturedProductsSection };
