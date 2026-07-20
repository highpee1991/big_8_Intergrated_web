import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { FeatureCard } from "@/components/cards/feature-card";
import type { WhyChooseUsPoint } from "@/types/content";

export interface WhyChooseUsSectionProps {
  points: WhyChooseUsPoint[];
}

function WhyChooseUsSection({ points }: WhyChooseUsSectionProps) {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Built for reliability at scale"
          align="center"
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((point, i) => (
          <Reveal key={point.id} delay={Math.min(i * 0.06, 0.3)}>
            <FeatureCard icon={point.icon} title={point.title} description={point.description} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { WhyChooseUsSection };
