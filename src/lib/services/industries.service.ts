import { divisions } from "@/data/industries";
import type { Division } from "@/types/content";


export async function getDivisions(): Promise<Division[]> {
  return divisions;
}

export async function getDivisionBySlug(slug: string): Promise<Division | undefined> {
  return divisions.find((d) => d.slug === slug);
}
