import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { getCompanyInfo } from "@/lib/services/company.service";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { ContactForm } from "@/features/contact/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Big 8 Intergrated, LLC",
  description:
    "Get in touch with Big 8 Intergrated, LLC — request a quote or ask a question about any of our eight divisions.",
};

export default async function ContactPage() {
  const company = await getCompanyInfo();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk about what you need"
        description="Whether it's a quote, a question, or a custom-sourced part, our team responds directly — no ticket queue."
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <ContactDetail icon={Phone} label="Phone" href={`tel:${company.contact.phone.replace(/\s/g, "")}`}>
                {company.contact.phone}
              </ContactDetail>
              <ContactDetail icon={Mail} label="Email" href={`mailto:${company.contact.email}`}>
                {company.contact.email}
              </ContactDetail>
              <ContactDetail icon={MapPin} label="Address">
                {company.contact.address}
              </ContactDetail>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Section>
    </main>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
        <span className="text-base text-ink">{children}</span>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="transition-opacity duration-base hover:opacity-70">
      {content}
    </a>
  ) : (
    content
  );
}