import { Factory, HardHat, Zap, Ship, Building2, Fuel } from "lucide-react";
import { Layers, Landmark, MapPin, ClipboardList } from "lucide-react";
import type { HeroContent, TrustedIndustry, WhyChooseUsPoint } from "@/types/content";

export const heroContent: HeroContent = {
  eyebrow: "8 Divisions, One Company",
  headlineLine1: "Eight sectors.",
  headlineHighlight: "One",
  headlineLine2: "partner.",
  subheadline:
    "Big 8 Intergrated supplies, equips, and supports businesses across the oil and gas, heavy equipment, IT, medical, and other specialized industries, so you can work with one trusted partner instead of eight different vendors.",
  primaryCtaLabel: "Request a Quote",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "Explore Divisions",
  secondaryCtaHref: "/industries",
};


export const trustedIndustries: TrustedIndustry[] = [
  { id: "energy", name: "Energy (PLACEHOLDER)", icon: Zap },
  { id: "construction", name: "Construction (PLACEHOLDER)", icon: HardHat },
  { id: "manufacturing", name: "Manufacturing (PLACEHOLDER)", icon: Factory },
  { id: "marine", name: "Marine (PLACEHOLDER)", icon: Ship },
  { id: "government", name: "Government (PLACEHOLDER)", icon: Building2 },
  { id: "oil-gas", name: "Oil & Gas (PLACEHOLDER)", icon: Fuel },
];

export const whyChooseUsPoints: WhyChooseUsPoint[] = [
  {
    id: "one-partner",
    icon: Layers,
    title: "One Partner, Eight Capabilities",
    description:
      "A single point of contact across oil & gas, heavy equipment, medical, IT, and more — no juggling separate vendors per category.",
  },
  {
    id: "public-private",
    icon: Landmark,
    title: "Trusted by Public & Private Sector",
    description:
      "From Texas state agencies to major energy operators, we meet the vetting standards of both government and industry.",
  },
  {
    id: "houston-based",
    icon: MapPin,
    title: "Houston-Based, Texas-Focused",
    description: "Headquartered in Houston and built around the needs of Texas industry.",
  },
  {
    id: "custom-procurement",
    icon: ClipboardList,
    title: "Procurement Built Around You",
    description:
      "From stock equipment to custom-sourced parts, we scope to your spec instead of a fixed catalog.",
  },
];