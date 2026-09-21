// src/app/industries/page.tsx
import type { Metadata } from "next";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { IndustryCard } from "@/components/cards/industry-card";
import { getDivisions } from "@/lib/services/industries.service";

export const metadata: Metadata = { title: "Industries We Serve | Big 8 Intergrated LLC" };

export default async function IndustriesPage() {
  const divisions = await getDivisions();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="md">
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Eight divisions, one company"
          description="Big 8 Intergrated brings together specialized capabilities under a single, connected organization."
        />
      </Section>

      <Section tone="surface" className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {divisions.map((division, i) => (
            <Reveal key={division.id} delay={Math.min(i * 0.06, 0.3)}>
              <IndustryCard
                icon={division.icon}
                title={division.name}
                description={division.description}
                href={`/industries/${division.slug}`}
                accentIndex={i}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
