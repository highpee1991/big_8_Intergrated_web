import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import type { CompanyInfo } from "@/types/content";

export interface StorySectionProps {
  company: CompanyInfo;
}

function StorySection({ company }: StorySectionProps) {
  return (
    <>
      <Section tone="paper">
        <Reveal>
          <SectionHeader eyebrow="Our Story" title="How we got here" />
          <p className="mt-6 max-w-(--measure) text-base text-ink/80 sm:text-lg">
            {company.story}
          </p>
        </Reveal>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeader eyebrow="Our Mission" title={company.tagline} />
            <p className="mt-6 text-base text-muted">{company.mission}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader eyebrow="Our Focus" title="What we do" />
            <p className="mt-6 text-base text-muted">{company.coreArea}</p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

export { StorySection };