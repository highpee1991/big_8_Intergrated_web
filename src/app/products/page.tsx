import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Products | Big 8 Intergrated, LLC" };

export default function ProductsPage() {
  return (
    <ComingSoon title="Products" description="Our full product catalog is coming soon." />
  );
}
