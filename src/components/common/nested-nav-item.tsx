"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NestedNavItemData {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: NestedNavItemData[];
}

export interface NestedNavItemProps {
  item: NestedNavItemData;
  variant: "card" | "list";
  depth?: number;
  onNavigate?: () => void;
}

function NestedNavItem({ item, variant, depth = 0, onNavigate }: NestedNavItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = !!item.children?.length;
  const Icon = item.icon;

  if (variant === "card") {
    return (
      <div
        className={cn(
          "group flex flex-col rounded-xl border border-transparent p-3 transition-all duration-200",
          "hover:border-border hover:bg-surface",
          expanded && "border-border bg-surface"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="flex flex-1 flex-col gap-2 text-left"
            >
              {Icon ? (
                <span className="border-border bg-card text-ink/60 group-hover:border-primary group-hover:text-primary flex size-9 items-center justify-center rounded-lg border transition-colors duration-200">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
              ) : null}
              <span className="flex flex-col gap-0.5">
                <span className="text-ink text-sm font-semibold">{item.label}</span>
                {item.description ? (
                  <span className="text-muted text-xs leading-snug">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </button>
          ) : (
            <Link
              href={item.href}
              onClick={onNavigate}
              className="flex flex-1 flex-col gap-2"
            >
              {Icon ? (
                <span className="border-border bg-card text-ink/60 group-hover:border-primary group-hover:text-primary flex size-9 items-center justify-center rounded-lg border transition-colors duration-200">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
              ) : null}
              <span className="flex flex-col gap-0.5">
                <span className="text-ink text-sm font-semibold">{item.label}</span>
                {item.description ? (
                  <span className="text-muted text-xs leading-snug">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </Link>
          )}

          {hasChildren ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} submenu`}
              className="text-muted hover:bg-card hover:text-ink mt-1 shrink-0 rounded-md p-1"
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  expanded && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>

        {hasChildren ? (
          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="border-border mt-2 flex flex-col gap-0.5 overflow-hidden border-t pt-2"
              >
                {item.children!.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className="text-muted hover:bg-card hover:text-ink block rounded-md px-2 py-1.5 text-xs"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
        ) : null}
      </div>
    );
  }

  // variant === "list" , mobile accordion row, recursive for any depth
  return (
    <li>
      <div className="flex items-center" style={{ paddingLeft: depth * 12 }}>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="text-ink/80 hover:text-ink flex-1 rounded-md px-2 py-2 text-left text-sm"
          >
            {item.label}
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={onNavigate}
            className="text-ink/80 hover:text-ink flex-1 rounded-md px-2 py-2 text-sm"
          >
            {item.label}
          </Link>
        )}
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} submenu`}
            className="text-muted p-2"
          >
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-200",
                expanded && "rotate-90"
              )}
              aria-hidden="true"
            />
          </button>
        ) : null}
      </div>
      {hasChildren ? (
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="flex flex-col gap-0.5 overflow-hidden"
            >
              {item.children!.map((child) => (
                <NestedNavItem
                  key={child.label}
                  item={child}
                  variant="list"
                  depth={depth + 1}
                  onNavigate={onNavigate}
                />
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      ) : null}
    </li>
  );
}

export { NestedNavItem };
