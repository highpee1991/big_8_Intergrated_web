import { brands } from "@/data/brands";
import type { Brand } from "@/types/content";

export async function getBrands(): Promise<Brand[]> {
  return brands;
}
