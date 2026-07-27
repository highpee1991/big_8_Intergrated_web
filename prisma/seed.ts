// prisma/seed.ts
//
// One-time (and re-runnable) script that loads your existing static data
// (src/data/*.ts) into the database. Safe to run multiple times — every
// write uses `upsert`, so re-running just updates existing rows instead of
// duplicating them.
//
// Run with: npx prisma db seed
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// --- Divisions (from src/data/industries.ts) --------------------------------
// Icon names match lucide-react export names exactly — the frontend looks
// these up in an icon map component-side (built in a later step).
const divisions = [
  {
    slug: "oil-gas-equipment",
    name: "Oil & Gas Equipment",
    description: "Equipment supply for upstream and midstream oil and gas operations.",
    icon: "Fuel",
  },
  {
    slug: "heavy-equipment",
    name: "Heavy Equipment",
    description: "Heavy machinery and equipment for industrial and construction use.",
    icon: "Truck",
  },
  {
    slug: "information-technology",
    name: "Information Technology",
    description: "Technology solutions and IT services for enterprise operations.",
    icon: "Cpu",
  },
  {
    slug: "medical",
    name: "Medical",
    description: "Medical equipment and supplies for healthcare providers and facilities.",
    icon: "Stethoscope",
  },
  {
    slug: "industrial",
    name: "Industrial",
    description:
      "Industrial parts and supply solutions for manufacturing and production operations.",
    icon: "Factory",
  },
  {
    slug: "logistics",
    name: "Logistics",
    description: "Transportation and freight solutions for supply chain and distribution needs.",
    icon: "Package",
  },
  {
    slug: "government",
    name: "Government",
    description: "Procurement solutions and equipment supply for public sector agencies.",
    icon: "Landmark",
  },
  {
    slug: "other",
    name: "Other Industries",
    description: "Custom sourcing and procurement solutions for specialized industry needs.",
    icon: "Globe",
  },
];

// --- Categories (matching the Products nav sub-menu) ------------------------
// Only Oil & Gas and Heavy Equipment have sub-menus in the nav right now —
// add more here anytime a division grows one. Products in divisions without
// categories simply leave categorySlug unset.
const categories = [
  { slug: "valves", name: "Valves", divisionSlug: "oil-gas-equipment" },
  { slug: "actuators", name: "Actuators", divisionSlug: "oil-gas-equipment" },
  { slug: "welding-material", name: "Welding Material", divisionSlug: "oil-gas-equipment" },
  { slug: "forklifts", name: "Forklifts", divisionSlug: "heavy-equipment" },
  { slug: "industrial-generators", name: "Industrial Generators", divisionSlug: "heavy-equipment" },
  { slug: "tractors", name: "Tractors", divisionSlug: "heavy-equipment" },
];

// --- Brands (from src/data/brands.ts) ---------------------------------------
const brands = [
  { slug: "abb", name: "ABB", logoUrl: "/images/brands/abb.png" },
  { slug: "apollo", name: "Apollo", logoUrl: "/images/brands/apollo.png" },
  { slug: "bobcat", name: "Bobcat", logoUrl: "/images/brands/bobcat.png" },
  { slug: "cameron", name: "Cameron", logoUrl: "/images/brands/cameron.png" },
  { slug: "cat", name: "Caterpillar", logoUrl: "/images/brands/cat.png" },
  { slug: "cummins", name: "Cummins", logoUrl: "/images/brands/cummins.png" },
  { slug: "emerson", name: "Emerson", logoUrl: "/images/brands/emerson.png" },
  { slug: "flowserve", name: "Flowserve", logoUrl: "/images/brands/flowserve.png" },
  { slug: "ge", name: "GE", logoUrl: "/images/brands/ge.png" },
  { slug: "generac", name: "Generac", logoUrl: "/images/brands/genrac.png" },
  { slug: "john-deere", name: "John Deere", logoUrl: "/images/brands/john_deere.png" },
  { slug: "loop-telecom", name: "Loop Telecom", logoUrl: "/images/brands/loop_telecom.png" },
  { slug: "manitou", name: "Manitou", logoUrl: "/images/brands/manitou.png" },
  { slug: "schneider", name: "Schneider Electric", logoUrl: "/images/brands/schneider.png" },
  {
    slug: "siemens-health",
    name: "Siemens Healthineers",
    logoUrl: "/images/brands/siemens_health.png",
  },
  { slug: "teleste", name: "Teleste", logoUrl: "/images/brands/teleste.png" },
  { slug: "victaulic", name: "Victaulic", logoUrl: "/images/brands/victaulic.png" },
];

// --- Products (from src/data/products.ts) -----------------------------------
// NOTE: divisionSlug values below are normalized to match real division
// slugs above — several in the original static file didn't match anything
// (e.g. "Custom Equipment", "Heavy Equipment" with capitals/spaces).
const products = [
  {
    slug: "container",
    title: "Container",
    summary: "Heavy-duty shipping and storage containers.",
    divisionSlug: "heavy-equipment",
    images: [{ url: "/images/products/container.png", alt: "Container" }],
  },
  {
    slug: "ethernet-fiber",
    title: "Ethernet Fiber",
    summary: "Fiber and networking cabling for enterprise IT infrastructure.",
    divisionSlug: "information-technology",
    images: [{ url: "/images/products/ethernet_fiber.png", alt: "Ethernet fiber cabling" }],
  },
  {
    slug: "generator",
    title: "Generator",
    summary: "Industrial power generators for continuous or backup power.",
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    images: [{ url: "/images/products/generator.png", alt: "Generator" }],
  },
  {
    slug: "inverter",
    title: "Inverter",
    summary: "Custom power inverter solutions.",
    divisionSlug: "other",
    images: [{ url: "/images/products/inverter.png", alt: "Inverter" }],
  },
  {
    slug: "tractor",
    title: "Tractor",
    summary: "Heavy equipment tractors for industrial and construction use.",
    divisionSlug: "heavy-equipment",
    categorySlug: "tractors",
    images: [{ url: "/images/products/jcb_tractor.png", alt: "Tractor" }],
  },
  {
    slug: "manitou-forklift",
    title: "Fork Lift",
    summary: "Manitou forklifts for material handling.",
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "manitou",
    images: [{ url: "/images/products/manitou_forklift.png", alt: "Manitou forklift" }],
  },
  {
    slug: "optiscan",
    title: "Optiscan",
    summary: "Diagnostic medical imaging equipment.",
    divisionSlug: "medical",
    images: [{ url: "/images/products/optiscan.png", alt: "Optiscan medical device" }],
  },
  {
    slug: "valve",
    title: "Valve",
    summary: "Industrial valves for oil and gas operations.",
    divisionSlug: "oil-gas-equipment",
    categorySlug: "valves",
    images: [{ url: "/images/products/valve.png", alt: "Industrial valve" }],
  },
];

async function main() {
  console.log("Seeding divisions...");
  const divisionMap = new Map<string, string>(); // slug -> id
  for (const d of divisions) {
    const row = await prisma.division.upsert({
      where: { slug: d.slug },
      update: { name: d.name, description: d.description, icon: d.icon },
      create: d,
    });
    divisionMap.set(d.slug, row.id);
  }

  console.log("Seeding categories...");
  const categoryMap = new Map<string, string>(); // slug -> id
  for (const c of categories) {
    const divisionId = divisionMap.get(c.divisionSlug);
    if (!divisionId) {
      console.warn(`  Skipping category "${c.slug}" — no division found for "${c.divisionSlug}"`);
      continue;
    }
    const row = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, divisionId },
      create: { slug: c.slug, name: c.name, divisionId },
    });
    categoryMap.set(c.slug, row.id);
  }

  console.log("Seeding brands...");
  const brandMap = new Map<string, string>(); // slug -> id
  for (const b of brands) {
    const row = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name, logoUrl: b.logoUrl },
      create: b,
    });
    brandMap.set(b.slug, row.id);
  }

  console.log("Seeding products...");
  for (const p of products) {
    const divisionId = divisionMap.get(p.divisionSlug);
    if (!divisionId) {
      console.warn(`  Skipping "${p.slug}" — no division found for "${p.divisionSlug}"`);
      continue;
    }
    const brandId = p.brandSlug ? brandMap.get(p.brandSlug) : undefined;
    const categoryId = p.categorySlug ? categoryMap.get(p.categorySlug) : undefined;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        summary: p.summary,
        divisionId,
        brandId: brandId ?? null,
        categoryId: categoryId ?? null,
      },
      create: {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        divisionId,
        brandId: brandId ?? undefined,
        categoryId: categoryId ?? undefined,
      },
    });

    // Replace images each run so re-seeding stays in sync with the list above
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.createMany({
      data: p.images.map((img, i) => ({
        productId: product.id,
        url: img.url,
        alt: img.alt,
        position: i,
      })),
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
