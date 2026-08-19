import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/common/container";
import { NAV_LINKS } from "@/config/nav-data";
import { getCompanyInfo } from "@/lib/services/company.service";

const FOOTER_DIVISIONS = [
  { label: "Oil & Gas Equipment", href: "/industries/oil-gas-equipment" },
  { label: "Heavy Equipment", href: "/industries/heavy-equipment" },
  { label: "IT Solutions", href: "/industries/information-technology" },
  { label: "Medical Equipment", href: "/industries/medical" },
];

const STAFF_INVOICE_URL = "https://big-eight-invoice-studio.vercel.app/";

async function Footer() {
  const company = await getCompanyInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/brand/logo.png"
                alt="Big 8 intergrated, LLC"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="font-display text-paper text-base font-semibold">
                Big 8 intergrated
              </span>
            </Link>

            <p className="text-paper/50 text-sm">Eight sectors. One partner.</p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-paper/40 font-mono text-xs tracking-widest uppercase">
              Navigate
            </span>

            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/70 hover:text-paper duration-base text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div className="flex flex-col gap-3">
            <span className="text-paper/40 font-mono text-xs tracking-widest uppercase">
              Divisions
            </span>

            <ul className="flex flex-col gap-2">
              {FOOTER_DIVISIONS.map((division) => (
                <li key={division.href}>
                  <Link
                    href={division.href}
                    className="text-paper/70 hover:text-paper duration-base text-sm transition-colors"
                  >
                    {division.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="text-paper/40 font-mono text-xs tracking-widest uppercase">
              Contact
            </span>

            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <Phone
                  className="text-paper/40 mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                  className="text-paper/70 hover:text-paper duration-base text-sm transition-colors"
                >
                  {company.contact.phone}
                </a>
              </li>

              <li className="flex items-start gap-2">
                <Mail
                  className="text-paper/40 mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-paper/70 hover:text-paper duration-base text-sm transition-colors"
                >
                  {company.contact.email}
                </a>
              </li>

              <li className="flex items-start gap-2">
                <MapPin
                  className="text-paper/40 mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-paper/70 text-sm">{company.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-paper/10 text-paper/50 flex flex-col gap-3 border-t py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Big 8 Intergrated, LLC. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <p>Houston, Texas, USA</p>

            <a
              href={STAFF_INVOICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/25 hover:text-paper/50 duration-base transition-colors"
            >
              Staff Portal
            </a>

            <Link
              href="/admin"
              className="text-paper/25 hover:text-paper/50 duration-base transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
