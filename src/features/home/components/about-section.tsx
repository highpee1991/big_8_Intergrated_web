import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import type { CompanyInfo } from "@/types/content";

export interface AboutSectionProps {
  company: CompanyInfo;
}

function AboutSection({ company }: AboutSectionProps) {
  return (
    <Section tone="paper">
      <Reveal>
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="About Us"
            title={`${company.legalName} — ${company.city}, ${company.state}`}
            description={company.description}
          />
        </div>
      </Reveal>
    </Section>
  );
}

export { AboutSection };