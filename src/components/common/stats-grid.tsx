import { CountUp } from "@/components/common/count-up";
import { cn } from "@/lib/utils";
import type { CompanyStat } from "@/types/content";

export interface StatsGridProps {
  stats: CompanyStat[];
  columns?: 2 | 4;
  /** "light" (default) for paper/surface backgrounds, "dark" for the ink-toned band. */
  tone?: "light" | "dark";
}

/** Extracted from the homepage AboutSection so the animated stats
 *  display isn't rebuilt every place it's needed (homepage + About page,
 *  and anywhere else later). */
function StatsGrid({ stats, columns = 2, tone = "light" }: StatsGridProps) {
  return (
    <dl className={`grid gap-6 sm:gap-8 ${columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2"}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dt
            className={cn(
              "font-mono text-xs uppercase tracking-widest",
              tone === "dark" ? "text-paper/50" : "text-muted",
            )}
          >
            {stat.label}
          </dt>
          <dd
            className={cn(
              "font-display text-3xl font-semibold sm:text-4xl",
              tone === "dark" ? "text-paper" : "text-ink",
            )}
          >
            <CountUp value={stat.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { StatsGrid };
