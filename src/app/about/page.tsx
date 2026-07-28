import type { Metadata } from "next";
import { getCompanyInfo } from "@/lib/services/company.service";
import { getDivisions } from "@/lib/services/industries.service";
import { getWhyChooseUsPoints, getHeroContent } from "@/lib/services/homepage.service";

import { PageHeader } from "@/components/common/page-header";
import { StorySection } from "@/features/about/components/story-section";
import { Section } from "@/components/common/section";
import { SectionHeader } from "@/components/common/section-header";
import { Reveal } from "@/components/common/reveal";
import { StatsGrid } from "@/components/common/stats-grid";
import { BusinessDivisionsSection } from "@/features/home/components/business-divisions-section";
import { WhyChooseUsSection } from "@/features/home/components/why-choose-us-section";
import { CtaSection } from "@/features/home/components/cta-section";

export const metadata: Metadata = {
  title: "About Us | Big 8 Intergrated, LLC",
  description:
    "Big 8 Intergrated, LLC — Better Solution for a Better World. Learn about our story, mission, and the eight divisions we serve.",
};

export default async function AboutPage() {
  const [company, divisions, whyChooseUs, hero] = await Promise.all([
    getCompanyInfo(),
    getDivisions(),
    getWhyChooseUsPoints(),
    getHeroContent(),
  ]);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="About Us"
        title={company.tagline}
        description={`${company.legalName} — ${company.city}, ${company.state}`}
      />

      <StorySection company={company} />

      <Section tone="paper">
        <Reveal>
          <SectionHeader eyebrow="By the Numbers" title="Big 8 Intergrated at a glance" align="center" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <StatsGrid stats={company.stats} columns={4} />
        </Reveal>
      </Section>

      <BusinessDivisionsSection divisions={divisions} />
      <WhyChooseUsSection points={whyChooseUs} />
      <CtaSection content={hero} />
    </main>
  );
}