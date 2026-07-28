"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NestedNavItem } from "@/components/common/nested-nav-item";
import type { NavCardItem } from "@/config/nav-data";

export interface MegaMenuProps {
  heading: string;
  href: string;
  items: NavCardItem[];
  onNavigate?: () => void;
}


function MegaMenu({ heading, href, items, onNavigate }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 z-50 w-[min(92vw,54rem)] -translate-x-1/2 pt-3"
    >
      <div className="border-border bg-paper/95 overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md">
        <div className="border-border flex items-center justify-between border-b px-6 py-3">
          <span className="text-muted font-mono text-[11px] tracking-[0.2em] uppercase">
            {heading}
          </span>
          <Link
            href={href}
            onClick={onNavigate}
            className="text-primary text-xs font-medium hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-3">
          {items.map((item) => (
            <NestedNavItem
              key={item.label}
              item={item}
              variant="card"
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export { MegaMenu };

