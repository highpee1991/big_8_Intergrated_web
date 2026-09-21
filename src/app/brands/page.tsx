import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Brands | Big 8 Intergrated LLC" };

export default function BrandsPage() {
  return (
    <ComingSoon title="Brands" description="Our partner and carried brands are coming soon." />
  );
}
