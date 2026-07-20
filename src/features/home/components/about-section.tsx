import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { CountUp } from "@/components/common/count-up";
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
          <dl className="grid grid-cols-2 gap-6 sm:gap-8">
            {company.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="text-muted font-mono text-xs tracking-widest uppercase">
                  {stat.label}
                </dt>
                <dd className="font-display text-ink text-3xl font-semibold sm:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

export { AboutSection };
