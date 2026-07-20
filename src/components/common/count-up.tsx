"use client";

import * as React from "react";
import { useInView, animate } from "framer-motion";

export interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseValue(value: string): { number: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { number: parseInt(match[1] ?? "0", 10), suffix: match[2] ?? "" };
}

function CountUp({ value, className, duration = 1.4 }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parseValue(value);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView || !parsed) return;
    const controls = animate(0, parsed.number, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, parsed?.number, duration]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {parsed.suffix}
    </span>
  );
}

export { CountUp };
