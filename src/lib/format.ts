// src/lib/format.ts

export function formatPrice(price: number | null, currency = "USD"): string {
  if (price === null) return "Contact us for pricing";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
