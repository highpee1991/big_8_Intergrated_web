import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { LogoMarquee } from "@/components/common/logo-marquee";
import type { Brand } from "@/types/content";

export interface BrandsSectionProps {
  brands: Brand[];
}

function BrandsSection({ brands }: BrandsSectionProps) {
  if (brands.length === 0) return null;

  return (
    <Section tone="paper">
      <Reveal>
        <SectionHeader
          eyebrow="Brands"
          title="Brands we carry and partner with"
          align="center"
        />
      </Reveal>
      <div className="mt-10">
        <LogoMarquee items={brands} />
      </div>
    </Section>
  );
}

export { BrandsSection };
