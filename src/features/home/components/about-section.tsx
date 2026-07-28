import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { StatsGrid } from "@/components/common/stats-grid";
import type { CompanyInfo } from "@/types/content";

export interface AboutSectionProps {
  company: CompanyInfo;
}

function AboutSection({ company }: AboutSectionProps) {
  return (
    <Section tone="paper">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionHeader
            eyebrow="About Us"
            title={`${company.legalName} — ${company.city}, ${company.state}`}
            description={company.description}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <StatsGrid stats={company.stats} />
        </Reveal>
      </div>
    </Section>
  );
}

export { AboutSection };