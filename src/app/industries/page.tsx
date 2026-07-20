import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Industries | Big 8 Intergrated, LLC" };

export default function IndustriesPage() {
  return (
    <ComingSoon
      title="Industries We Serve"
      description="A full breakdown of every division is coming soon."
    />
  );
}
