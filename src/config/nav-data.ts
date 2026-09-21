import type { LucideIcon } from "lucide-react";
import {
  Fuel,
  HardHat,
  Stethoscope,
  Cpu,
  Factory,
  Landmark,
  Globe,
  Truck,
  Package,
  HeartPulse,
  Cog,
  MonitorSmartphone,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

/**
 * Central nav content. Editing menu structure , adding a division, adding
 * a nested item under a card , never touches component code, only this
 * file. See NavCardItem.children for how nesting works: any card can have
 * its own sub-list, at any depth, and both the desktop mega menu and the
 * mobile accordion render it the same way via NestedNavItem.
 */

export interface NavChild {
  label: string;
  href: string;
  /** Children can nest further , NestedNavItem renders recursively. */
  children?: NavChild[];
}

export interface NavCardItem {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  children?: NavChild[];
}

export interface NavLink {
  label: string;
  href: string;
  megaMenu?: {
    heading: string;
    items: NavCardItem[];
  };
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Industries",
    href: "/industries",
    megaMenu: {
      heading: "Industries We Serve",
      items: [
        {
          label: "Oil & Gas",
          href: "/industries/oil-gas-equipment",
          description: "Equipment & field solutions",
          icon: Fuel,
        },
        {
          label: "Heavy Equipment",
          href: "/industries/heavy-equipment",
          description: "Construction & site machinery",
          icon: HardHat,
        },
        {
          label: "Medical",
          href: "/industries/medical",
          description: "Medical equipment & supply",
          icon: Stethoscope,
        },
        {
          label: "IT",
          href: "/industries/information-technology",
          description: "Infrastructure & technology",
          icon: Cpu,
        },
        {
          label: "Industrial",
          href: "/industries/industrial",
          description: "Industrial parts & supply",
          icon: Factory,
        },
        {
          label: "Logistics",
          href: "/industries/logistics",
          description: "Transportation & freight",
          icon: Truck,
        },
        {
          label: "Government",
          href: "/industries/government",
          description: "Public sector procurement",
          icon: Landmark,
        },
        {
          label: "Other Industries",
          href: "/industries/other",
          description: "Custom sourcing solutions",
          icon: Globe,
        },
      ],
    },
  },
  {
    label: "Products",
    href: "/products",
    megaMenu: {
      heading: "Product Categories",
      items: [
        {
          label: "Oil & Gas",
          href: "/products/oil-gas-equipment",
          description: "Field equipment & flow control",
          icon: Fuel,
          children: [
            { label: "Valves", href: "/products/oil-gas-equipment/valves" },
            { label: "Actuators", href: "/products/oil-gas-equipment/actuators" },
            { label: "Welding Material", href: "/products/oil-gas-equipment/welding-material" },
          ],
        },
        {
          label: "Heavy Equipment",
          href: "/products/heavy-equipment",
          description: "Machinery & attachments",
          icon: Package,
          children: [
            { label: "Forklifts", href: "/products/heavy-equipment/forklifts" },
            {
              label: "Industrial Generators",
              href: "/products/heavy-equipment/industrial-generators",
            },
            { label: "Tractors", href: "/products/heavy-equipment/tractors" },
          ],
        },
        {
          label: "Medical Equipment",
          href: "/products/medical",
          description: "Clinical & diagnostic gear",
          icon: HeartPulse,
        },
        {
          label: "Industrial Parts",
          href: "/products/industrial",
          description: "Components & replacements",
          icon: Cog,
        },
        {
          label: "IT Hardware",
          href: "/products/information-technology",
          description: "Servers, networking & devices",
          icon: MonitorSmartphone,
        },
        {
          label: "Safety Equipment",
          href: "/products/industrial/safety-equipment",
          description: "PPE & site safety gear",
          icon: ShieldCheck,
        },
        {
          label: "Custom Procurement",
          href: "/products/other",
          description: "Sourced to your spec",
          icon: ClipboardList,
        },
      ],
    },
  },
  { label: "Brands", href: "/brands" },
  { label: "Contact Us", href: "/contact" },
];


/** Finds the label/description for any href defined in NAV_LINKS,
 *  including nested children , used by the catch-all placeholder pages. */
export function findNavLabel(href: string): { label: string; description?: string } | null {
  for (const link of NAV_LINKS) {
    if (link.href === href) return { label: link.label };
    if (!link.megaMenu) continue;

    for (const item of link.megaMenu.items) {
      if (item.href === href) return { label: item.label, description: item.description };
      for (const child of item.children ?? []) {
        if (child.href === href) return { label: child.label };
      }
    }
  }
  return null;
}