import { heroContent, trustedIndustries, whyChooseUsPoints } from "@/data/homepage";
import type { HeroContent, TrustedIndustry, WhyChooseUsPoint } from "@/types/content";

export async function getHeroContent(): Promise<HeroContent> {
  return heroContent;
}

export async function getTrustedIndustries(): Promise<TrustedIndustry[]> {
  return trustedIndustries;
}

export async function getWhyChooseUsPoints(): Promise<WhyChooseUsPoint[]> {
  return whyChooseUsPoints;
}
