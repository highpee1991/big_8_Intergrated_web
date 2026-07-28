import { CountUp } from "@/components/common/count-up";
import type { CompanyStat } from "@/types/content";

export interface StatsGridProps {
  stats: CompanyStat[];
  columns?: 2 | 4;
}

/** Extracted from the homepage AboutSection so the animated stats
 *  display isn't rebuilt every place it's needed (homepage + About page,
 *  and anywhere else later). */
function StatsGrid({ stats, columns = 2 }: StatsGridProps) {
  return (
    <dl className={`grid gap-6 sm:gap-8 ${columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dt className="font-mono text-xs uppercase tracking-widest text-muted">
            {stat.label}
          </dt>
          <dd className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            <CountUp value={stat.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { StatsGrid };