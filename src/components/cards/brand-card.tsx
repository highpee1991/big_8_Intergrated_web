import * as React from "react";
import Image from "next/image";

export interface BrandCardProps {
  name: string;
  logoSrc: string;
}

/** Deliberately quiet , a logo wall reads as trust through restraint, not
 *  through decoration. No accent bar here; that treatment is reserved for
 *  content cards (industries/products), not third-party brand marks. */
function BrandCard({ name, logoSrc }: BrandCardProps) {
  return (
    <div className="flex h-24 items-center justify-center rounded-lg border border-border bg-card px-6 grayscale transition-all duration-base hover:grayscale-0">
      <div className="relative h-10 w-full">
        <Image
          src={logoSrc}
          alt={name}
          fill
          className="object-contain"
          sizes="(min-width: 640px) 25vw, 50vw"
        />
      </div>
    </div>
  );
}

export { BrandCard };
