import type { LucideIcon } from "lucide-react";

export interface Division {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  divisionSlug?: string;
}

export interface Brand {
  id: string;
  name: string;
  logoSrc: string;
  url?: string;
}

export interface Client {
  id: string;
  name: string;
  logoSrc: string;
}

export interface CompanyStat {
  label: string;
  value: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  city: string;
  state: string;
  country: string;
  description: string;
  stats: CompanyStat[];
}

export interface HeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface TrustedIndustry {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface WhyChooseUsPoint {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
