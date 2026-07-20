import type { Metadata } from "next";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Contact | Big 8 Intergrated, LLC" };

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Us"
      description="A request-a-quote form is coming soon. In the meantime, reach out directly."
    />
  );
}
