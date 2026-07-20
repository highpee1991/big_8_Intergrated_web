import { products } from "@/data/products";
import { getRandomItems } from "@/lib/array";
import type { Product } from "@/types/content";

export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  return typeof limit === "number"
    ? getRandomItems(products, limit)
    : getRandomItems(products, products.length);
}

export async function getProductsByDivision(divisionSlug: string): Promise<Product[]> {
  return products.filter((p) => p.divisionSlug === divisionSlug);
}
