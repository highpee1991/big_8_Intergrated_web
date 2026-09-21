import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short mono-set label above the heading, e.g. "OUR DIVISIONS". Optional ,
   *  only use when it encodes real information (a category, a step number),
   *  not as decoration. */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

function SectionHeader({
  className,
  eyebrow,
  title,
  description,
  align = "left",
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    >
      {eyebrow ? (
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-(--measure) text-base text-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { SectionHeader };
