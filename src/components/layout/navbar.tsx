"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { MegaMenu } from "@/components/common/mega-menu";
import { NestedNavItem } from "@/components/common/nested-nav-item";
import { NAV_LINKS, type NavLink } from "@/config/nav-data";
import { motion as motionTokens } from "@/config/theme";

/** Exact match highlights "About"; startsWith also highlights
 *  "Industries" while on /industries/oil-gas/valves, etc. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="border-border bg-paper/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container>
        <nav aria-label="Primary" className="flex h-18 items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/brand/logo.png"
              alt="Big 8 Intergrated, LLC"
              width={32}
              height={32}
              style={{ height: "auto" }}
              priority
            />
            <span className="font-display text-ink text-base font-semibold">
              Big 8 Intergrated
            </span>
          </Link>

          <ul
            className="hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {NAV_LINKS.map((link) => (
              <DesktopNavItem
                key={link.href}
                link={link}
                active={isActive(pathname, link.href)}
                hovered={hoveredHref === link.href}
                onEnter={() => setHoveredHref(link.href)}
                onLeave={() =>
                  setHoveredHref((current) => (current === link.href ? null : current))
                }
              />
            ))}
          </ul>

          <div className="hidden md:block">
            <Button asChild size="sm">
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>

          <button
            type="button"
            className="text-ink inline-flex items-center justify-center rounded-md p-2.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionTokens.duration.base, ease: motionTokens.ease }}
            className="border-border overflow-hidden border-t md:hidden"
          >
            <Container>
              <ul className="flex flex-col gap-1 py-4">
                {NAV_LINKS.map((link) =>
                  link.megaMenu ? (
                    <NestedNavItem
                      key={link.href}
                      variant="list"
                      onNavigate={() => setOpen(false)}
                      item={{
                        label: link.label,
                        href: link.href,
                        children: link.megaMenu.items,
                      }}
                    />
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`hover:bg-surface block rounded-md px-2 py-3 text-base font-medium ${
                          isActive(pathname, link.href) ? "text-primary" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
                <li className="pt-2">
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <Link href="/contact">Request a Quote</Link>
                  </Button>
                </li>
              </ul>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/** Desktop nav item — sliding hover pill (layoutId glide, not an instant
 *  swap), persistent active underline, and the mega menu trigger. */
function DesktopNavItem({
  link,
  active,
  hovered,
  onEnter,
  onLeave,
}: {
  link: NavLink;
  active: boolean;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const itemRef = React.useRef<HTMLLIElement>(null);

  return (
    <li
      ref={itemRef}
      className="relative"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onBlur={(e) => {
        // Only clear when focus leaves this whole item (not when it
        // moves from the trigger link to a card inside the mega menu).
        if (!itemRef.current?.contains(e.relatedTarget as Node | null)) {
          onLeave();
        }
      }}
    >
      <Link
        href={link.href}
        className={`rounded-pill duration-base relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors ${
          active ? "text-primary" : "text-ink/70 hover:text-ink"
        }`}
      >
        {hovered ? (
          <motion.span
            layoutId="nav-hover-pill"
            className="rounded-pill bg-surface absolute inset-0 -z-10"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        ) : null}
        {link.label}
        {link.megaMenu ? (
          <ChevronDown
            className={`duration-base size-3.5 transition-transform ${hovered ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        ) : null}
        {active ? (
          <span className="rounded-pill bg-primary absolute inset-x-3 -bottom-0.5 h-0.5" />
        ) : null}
      </Link>

      <AnimatePresence>
        {link.megaMenu && hovered ? (
          <MegaMenu
            heading={link.megaMenu.heading}
            href={link.href}
            items={link.megaMenu.items}
          />
        ) : null}
      </AnimatePresence>
    </li>
  );
}

export { Navbar };
