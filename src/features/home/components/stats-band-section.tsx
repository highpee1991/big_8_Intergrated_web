// src/features/home/components/stats-band-section.tsx
//
// The homepage's one deliberate high-contrast moment , dark (tone="ink"),
// large mono-numeral stats. Per design direction: spend the boldness in
// exactly one place and keep everything else disciplined. Reuses
// StatsGrid's existing tone="dark" variant rather than building a new
// stats display from scratch.
import { Reveal } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { StatsGrid } from "@/components/common/stats-grid";
import type { CompanyStat } from "@/types/content";

export interface StatsBandSectionProps {
  stats: CompanyStat[];
}

function StatsBandSection({ stats }: StatsBandSectionProps) {
  return (
    <Section tone="ink">
      <Reveal>
        <p className="mb-8 font-mono text-xs font-medium uppercase tracking-widest text-paper/50">
          Big 8 Intergrated by the numbers
        </p>
        <StatsGrid stats={stats} columns={4} tone="dark" />
      </Reveal>
    </Section>
  );
}

export { StatsBandSection };
