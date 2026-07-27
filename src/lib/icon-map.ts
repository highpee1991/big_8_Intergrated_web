// src/lib/icon-map.ts
//
// Divisions store their icon as a plain string in the database (e.g. "Fuel")
// so the DB has no dependency on React/lucide-react. This map resolves that
// string back to the actual icon component wherever it's rendered.
//
// To add a new division icon: import it below and add it to the map — the
// string in the database (Division.icon / seed.ts) must match the key exactly.
import {
  Fuel,
  Truck,
  Cpu,
  Stethoscope,
  Factory,
  Package,
  Landmark,
  Globe,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Fuel,
  Truck,
  Cpu,
  Stethoscope,
  Factory,
  Package,
  Landmark,
  Globe,
};

// Fallback keeps the UI safe if a division is ever seeded with a typo'd
// icon name instead of crashing the page.
export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Package;
}
