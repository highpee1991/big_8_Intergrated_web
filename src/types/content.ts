import type { LucideIcon } from "lucide-react";

export interface Division {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  categories?: Category[]; // populated only where a query asks for it (e.g. nav)
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  divisionSlug: string;
  divisionName: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductBrand {
  slug: string;
  name: string;
  logoUrl: string;
}

// Lightweight shape for cards/grids , every product listing page uses this.
export interface ProductSummary {
  id: string;
  slug: string; // -> /products/{slug}
  title: string;
  summary: string;
  image: ProductImage; // primary (first) image
  priceLabel: string; // pre-formatted; "Contact us for pricing" when no price is set
  divisionSlug: string;
  divisionName: string;
  categorySlug?: string;
  categoryName?: string;
  brandSlug?: string;
  brandName?: string;
}

// Full shape for a single product detail page , everything ProductSummary
// has, plus the gallery, specs, description, and brand.
export interface ProductDetail extends ProductSummary {
  description: string | null;
  images: ProductImage[];
  specs: Record<string, string> | null;
  brand: ProductBrand | null;
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

export interface CompanyContact {
  phone: string;
  email: string;
  address: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  city: string;
  state: string;
  country: string;
  description: string;
  tagline: string;
  story: string;
  mission: string;
  coreArea: string;
  contact: CompanyContact;
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