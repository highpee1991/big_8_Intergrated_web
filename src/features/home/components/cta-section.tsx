import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { Cta } from "@/components/common/cta";
import type { HeroContent } from "@/types/content";

export interface CtaSectionProps {
  content: HeroContent;
}

/** Reuses the same hero CTA copy/links for the closing call-to-action ,
 *  keeps the two asks on the page consistent rather than introducing a
 *  third, uncoordinated message. */
function CtaSection({ content }: CtaSectionProps) {
  return (
    <Section tone="paper" spacing="sm">
      <Reveal>
        <Cta
          title="Ready to work with Big 8 Intergrated?"
          description="Reach out for a quote, or explore what each division offers."
          primaryLabel={content.primaryCtaLabel}
          primaryHref={content.primaryCtaHref}
          secondaryLabel={content.secondaryCtaLabel}
          secondaryHref={content.secondaryCtaHref}
        />
      </Reveal>
    </Section>
  );
}

export { CtaSection };
