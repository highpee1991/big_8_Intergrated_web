// src/components/products/product-gallery.tsx
//
// Main image + clickable thumbnail strip. Works with any number of images —
// 1 or 30 — since `images` always comes from the ProductImage relation,
// never a fixed set of columns. Thumbnails only render when there's more
// than one image to switch between.
"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/content";

export interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

function ProductGallery({ images, title }: ProductGalleryProps) {
  const [active, setActive] = React.useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-surface">
        <Image
          src={current.url}
          alt={current.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                i === active ? "border-brand-blue" : "border-transparent hover:border-border"
              )}
              aria-label={`Show image ${i + 1} of ${images.length} for ${title}`}
              aria-current={i === active}
            >
              <Image src={img.url} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export { ProductGallery };
