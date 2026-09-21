"use client";

import Image from "next/image";
import type { Brand } from "@/types/content";

export interface LogoMarqueeProps {
  items: Brand[];
  /** Seconds for one full loop , lower = faster. */
  speed?: number;
}

function LogoMarquee({ items, speed = 35 }: LogoMarqueeProps) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className="border-border bg-paper flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border p-3"
          >
            <Image
              src={brand.logoSrc}
              alt={brand.name}
              width={112}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { LogoMarquee };
