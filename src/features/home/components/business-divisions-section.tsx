import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { IndustryCard } from "@/components/cards/industry-card";
import type { Division } from "@/types/content";

export interface BusinessDivisionsSectionProps {
  divisions: Division[];
}

function BusinessDivisionsSection({ divisions }: BusinessDivisionsSectionProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeader
          eyebrow="Our Divisions"
          title="Eight divisions, one company"
          description="Big 8 Intergrated brings together specialized capabilities under a single, connected organization."
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {divisions.map((division, i) => (
          <Reveal key={division.id} delay={Math.min(i * 0.06, 0.3)}>
            <IndustryCard
              icon={division.icon}
              title={division.name}
              description={division.description}
              accentIndex={i}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { BusinessDivisionsSection };
