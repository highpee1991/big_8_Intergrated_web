import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Background surface. "paper" (default page bg), "surface" (subtle lift),
   *  or "ink" (dark, for high-contrast sections like the final CTA). */
  tone?: "paper" | "surface" | "ink";
  /** Vertical padding scale. */
  spacing?: "sm" | "md" | "lg";
  containerWidth?: ContainerProps["width"];
  /** Skip the inner Container , use when the section needs full-bleed content. */
  noContainer?: boolean;
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-paper",
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

function Section({
  className,
  tone = "paper",
  spacing = "md",
  containerWidth = "content",
  noContainer = false,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(toneClasses[tone], spacingClasses[spacing], className)}
      {...props}
    >
      {noContainer ? children : <Container width={containerWidth}>{children}</Container>}
    </section>
  );
}

export { Section };
