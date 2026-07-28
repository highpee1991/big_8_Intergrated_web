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
  { slug: "jcb", name: "JCB", logoUrl: "/images/brands/jcb.png" },
  { slug: "yale", name: "Yale", logoUrl: "/images/brands/yale.png" },
  { slug: "hangcha", name: "Hangcha", logoUrl: "/images/brands/hangcha.png" },
  { slug: "varian", name: "Varian (Siemens Healthineers)", logoUrl: "/images/brands/varian.png" },
  { slug: "philips", name: "Philips", logoUrl: "/images/brands/philips.png" },
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
    slug: "ethernet-cable",
    title: "Ethernet Cable",
    summary: "Stripped networking cable with multi-conductor gauge options for enterprise wiring.",
    description:
      "A large wooden spool (cable reel) loaded with thick, gray cable wound into many neat vertical coils, along with stripped cable segments showing exposed multicolored inner wires — available with labeled cable types and gauges to match your infrastructure needs.",
    divisionSlug: "information-technology",
    images: [{ url: "/images/products/ethernet_cable.png", alt: "Ethernet cable reel" }],
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

  // --- Forklifts / Telehandlers (heavy-equipment / forklifts) ---------------
  {
    slug: "manitou-mt1840a-telehandler",
    title: "2022 Manitou MT1840A Telehandler",
    summary: "Telehandler with 4,000 kg lift capacity and 17.55 m maximum lift height.",
    description:
      "Low-hour 2022 Manitou MT1840A telehandler with integrated fire suppression, an underground brake configuration, and a spare tire included.",
    specs: {
      "Serial Number": "MA00000T0101A570",
      "Operating Hours": "Approx. 220 hours",
      Manufacturer: "Manitou",
      Model: "MT1840A",
      Year: "2022",
      Engine: "Perkins Stage 3B",
      "Maximum Load Capacity": "4,000 kg (8,818 lb)",
      "Maximum Lift Height": "17.55 m (57 ft 7 in)",
      "Maximum Reach": "13.08 m (42 ft 11 in)",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "manitou",
    images: [
      { url: "/images/products/manitou1.png", alt: "Manitou MT1840A telehandler" },
      { url: "/images/products/manitou2.png", alt: "Manitou MT1840A telehandler" },
      { url: "/images/products/manitou3.png", alt: "Manitou MT1840A telehandler" },
      { url: "/images/products/manitou4.png", alt: "Manitou MT1840A telehandler" },
      { url: "/images/products/manitou5.png", alt: "Manitou MT1840A telehandler" },
    ],
  },
  {
    slug: "jcb-540-170-telehandler",
    title: "2021 JCB 540-170 Telehandler",
    summary: "Telehandler with 4,000 kg lift capacity and 16.7 m lift height.",
    description:
      "The 2021 JCB 540-170 telehandler is built to deliver reliable performance in demanding work environments. With a strong lifting capacity of up to 4,000 kg and an impressive reach of over 16 meters, it is ideal for construction, warehousing, and industrial material handling tasks. Its robust design, combined with advanced safety and control features, ensures efficient operation while maintaining operator comfort. Includes integrated fire suppression, an enclosed operator cab with air conditioning, a load moment indicator (LMI) system, auxiliary hydraulics, stabilizers for enhanced lifting stability, and standard pallet forks.",
    specs: {
      "Serial Number": "JCB540170X12345",
      "Operating Hours": "Approx. 850 hours",
      Manufacturer: "JCB",
      Model: "540-170",
      Year: "2021",
      Engine: "JCB EcoMAX Tier 4 Final",
      "Maximum Load Capacity": "4,000 kg (8,818 lb)",
      "Maximum Lift Height": "16.7 m (54 ft 9 in)",
      "Maximum Forward Reach": "12.5 m (41 ft)",
      Transmission: "Powershift",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "jcb",
    images: [
      { url: "/images/products/telehandler1.png", alt: "JCB 540-170 telehandler" },
      { url: "/images/products/telehandler2.png", alt: "JCB 540-170 telehandler" },
      { url: "/images/products/telehandler3.png", alt: "JCB 540-170 telehandler" },
      { url: "/images/products/telehandler4.png", alt: "JCB 540-170 telehandler" },
    ],
  },
  {
    slug: "yale-nta-sb-turret-forklift",
    title: "Yale NTA-SB Turret Forklift",
    summary: "Very narrow aisle turret truck for high-bay warehouse operations.",
    description:
      "The Yale NTA-SB turret truck very narrow aisle series provides the ergonomics, stability and performance necessary for maximum productivity in high-bay warehouses — built for ultimate performance, service, and dependability.",
    specs: {
      "Model Numbers": "NTA030/035SB",
      Capacity: "3,000–3,500 lbs",
      Manufacturer: "Yale",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "yale",
    images: [
      { url: "/images/products/turret1.png", alt: "Yale NTA-SB turret forklift" },
      { url: "/images/products/turret2.png", alt: "Yale NTA-SB turret forklift" },
      { url: "/images/products/turret3.png", alt: "Yale NTA-SB turret forklift" },
      { url: "/images/products/turret4.png", alt: "Yale NTA-SB turret forklift" },
    ],
  },
  {
    slug: "yale-electric-order-picker",
    title: "Yale Medium/High Lift Electric Order Picker",
    summary: "Electric order picker built for productive, high-throughput picking.",
    description:
      "Productive order picking applications are vital to your success. The Yale warehouse electric order picker series goes the distance, with thoughtfully designed ergonomics, Smart-Glide technology, and reliable performance that helps keep orders moving efficiently, shift after shift. Available in four model configurations.",
    specs: {
      "Model Numbers": "FS030BF, OS030BF, OS030EF, SS030BF",
      Capacity: "3,000 lbs",
      Manufacturer: "Yale",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "yale",
    images: [
      { url: "/images/products/picker1.png", alt: "Yale electric order picker" },
      { url: "/images/products/picker2.png", alt: "Yale electric order picker" },
      { url: "/images/products/picker3.png", alt: "Yale electric order picker" },
    ],
  },
  {
    slug: "hangcha-cpcd30-diesel-forklift",
    title: "HC (Hangcha) Diesel Forklift CPCD30-XW97B1",
    summary: "3,000 kg capacity diesel forklift, 2026 model, zero running hours.",
    specs: {
      "Engine Type": "Diesel",
      Capacity: "3,000 kg (6,613 lb)",
      Manufacturer: "Hangcha",
      Year: "2026",
      "Running Hours": "0",
      "Serial Number": "12BE03615",
      "Rated Capacity": "4,500 kg (9,920.8 lb)",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "hangcha",
    images: [
      { url: "/images/products/hangcha1.jpeg", alt: "Hangcha CPCD30 diesel forklift" },
      { url: "/images/products/hangcha2.png", alt: "Hangcha CPCD30 diesel forklift" },
      { url: "/images/products/hangcha3.png", alt: "Hangcha CPCD30 diesel forklift" },
      { url: "/images/products/hangcha4.png", alt: "Hangcha CPCD30 diesel forklift" },
    ],
  },
  {
    slug: "hangcha-cpyd50-lpg-forklift",
    title: "HC Hangcha CPYD50-XXH11BN Okamura LPG Forklift",
    summary: "5,000 kg capacity LPG forklift with Kubota propellant gas motor.",
    specs: {
      Type: "XF-series propellant",
      Design: "LPG forklift",
      Manufacturer: "Hangcha",
      "Drive Type": "Propellant gas",
      "Load Capacity": "5,000 kg (11,023.11 lb)",
      "Load Center of Gravity": "500 mm",
      Motor: "Kubota WG3800-L-E3C LPG",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "forklifts",
    brandSlug: "hangcha",
    images: [
      { url: "/images/products/hangchaCPYD501.png", alt: "Hangcha CPYD50 LPG forklift" },
      { url: "/images/products/hangchaCPYD502.png", alt: "Hangcha CPYD50 LPG forklift" },
      { url: "/images/products/hangchaCPYD503.png", alt: "Hangcha CPYD50 LPG forklift" },
    ],
  },

  // --- Generators (heavy-equipment / industrial-generators) -----------------
  {
    slug: "generac-mdg100df4-diesel-generator",
    title: "Generac MDG100DF4 Mobile Diesel Generator, 80/85kW",
    summary: "John Deere-powered mobile diesel generator on a single-axle trailer.",
    description:
      "Designed to provide safe and reliable prime power, the MDG100 includes a wide variety of customer-inspired features for safety, ease-of-use, and low maintenance. A single-to-three-phase selector switch makes this generator powerful and versatile.",
    specs: {
      Series: "MDG",
      "Engine Lubrication": "John Deere",
      "Surge Watts": "85,000 W",
      "Rated Watts": "80,000 W",
      "Fuel Tank Capacity": "165 gal",
      "Run Time": "24 hr",
      Voltage: "120/240 V",
      "Start Switch Type": "Electric",
      "Pack Type": "Configured unit – Skid Mount + Single Axle Trailer",
      "Manufacturer Part Number": "MDG100DF4-STD3",
      "Fuel Type": "Diesel",
      Decibels: "74",
      "Engine Type": "4.5L John Deere Liquid Cooled Diesel (Final Tier 4)",
      "Engine RPM": "1,800 rpm",
      "Low Oil Shutoff": "Yes",
      Brand: "Generac",
      Warranty: "2 yr",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    brandSlug: "generac",
    images: [
      { url: "/images/products/powergen1.png", alt: "Generac MDG100DF4 diesel generator" },
      { url: "/images/products/powergen2.png", alt: "Generac MDG100DF4 diesel generator" },
      { url: "/images/products/powergen3.png", alt: "Generac MDG100DF4 diesel generator" },
    ],
  },
  {
    slug: "generac-mdg75df4-diesel-generator",
    title: "Generac MDG75DF4 Mobile Diesel Generator, 60/68kW",
    summary: "John Deere-powered mobile diesel generator on a single-axle trailer.",
    description:
      "Designed to provide safe and reliable prime power, the MDG75 includes a wide variety of customer-inspired features for safety, ease-of-use, and low maintenance. A single-to-three-phase selector switch makes this generator powerful and versatile.",
    specs: {
      "Manufacturer Part Number": "MDG75DF4-STD3",
      Series: "MDG",
      "Engine Lubrication": "John Deere",
      "Surge Watts": "68,000 W",
      "Rated Watts": "60,000 W",
      "Fuel Tank Capacity": "165 gal",
      "Run Time": "30 hr",
      Voltage: "120/240 V",
      "Start Switch Type": "Electric",
      "Pack Type": "Configured unit – Skid Mount + Single Axle Trailer",
      "Fuel Type": "Diesel",
      Decibels: "74",
      "Engine Type": "4.5L John Deere Liquid Cooled Diesel (Final Tier 4)",
      "Engine RPM": "1,800 rpm",
      "Low Oil Shutoff": "Yes",
      Brand: "Generac",
      Warranty: "2 yr",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    brandSlug: "generac",
    images: [
      { url: "/images/products/powergen1.png", alt: "Generac MDG75DF4 diesel generator" },
      { url: "/images/products/powergen2.png", alt: "Generac MDG75DF4 diesel generator" },
      { url: "/images/products/powergen3.png", alt: "Generac MDG75DF4 diesel generator" },
    ],
  },
  {
    slug: "generac-standby-generator-10kw-wifi",
    title: "Generac Standby Generator, 10kW | WiFi Enabled",
    summary: "Automatic home standby generator with WiFi connectivity.",
    description:
      "Provides essential circuit power protection for your home, ensuring the necessities remain powered during an outage. This affordable automatic standby generator offers protection for about half the cost of central air conditioning.",
    specs: {
      "Serial Number": "G0071710",
      "Battery Size": "12V",
      Manufacturer: "Generac",
      "Running Watts": "10,000 W",
      "Fuel Type": "Liquid Propane or Natural Gas",
      "Oil Capacity": "1.1 qt",
      "Battery Type": "Group 26R 540 CCA Min. or Group 35AGM 650 CCA Min.",
      "Engine Type": "G-Force 400",
      Weight: "338 lb",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    brandSlug: "generac",
    images: [
      { url: "/images/products/gen1.png", alt: "Generac 10kW standby generator" },
      { url: "/images/products/gen2.png", alt: "Generac 10kW standby generator" },
      { url: "/images/products/gen3.png", alt: "Generac 10kW standby generator" },
    ],
  },
  {
    slug: "generac-standby-generator-10kw-transfer-switch",
    title: "Generac Standby Generator, 10kW | With 16-Circuit Transfer Switch | WiFi Enabled",
    summary: "10kW standby generator bundled with a 16-circuit transfer switch.",
    description:
      "Provides essential circuit power protection for your home, ensuring the necessities remain powered during an outage. This affordable automatic standby generator offers protection for about half the cost of central air conditioning.",
    specs: {
      "Base Model": "G007172_",
      "Serial Number": "G0071720",
      "Battery Size": "12V",
      Manufacturer: "Generac",
      "Running Watts": "10,000 W",
      "Fuel Type": "Liquid Propane or Natural Gas",
      "Oil Capacity": "1.1 qt",
      "Battery Type": "Group 26R 540 CCA Min. or Group 35AGM 650 CCA Min.",
      "Engine Type": "G-Force 400",
      Weight: "338 lb",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    brandSlug: "generac",
    images: [
      { url: "/images/products/gen1.png", alt: "Generac 10kW standby generator with transfer switch" },
      { url: "/images/products/gen2.png", alt: "Generac 10kW standby generator with transfer switch" },
      { url: "/images/products/gen3.png", alt: "Generac 10kW standby generator with transfer switch" },
    ],
  },
  {
    slug: "generac-standby-generator-22kw-wifi",
    title: "Generac Standby Generator, 22kW | WiFi Enabled",
    summary: "One of the most powerful air-cooled home standby generators available.",
    description:
      "One of the most powerful air-cooled generators on the market today, the Guardian Series 22kW automatic home standby generator can provide whole-house backup power for many homes — with the lowest cost per kilowatt of any air-cooled home standby generator.",
    specs: {
      "Serial Number": "G0070420",
      "Oil Filter P/N": "070185ES",
      "Spark Plug P/N": "0G0767A",
      "Battery Size": "12V",
      "Engine Size": "999cc",
      Manufacturer: "Generac",
      "Running Watts": "22,000 W",
      "Fuel Type": "Liquid Propane or Natural Gas",
      "Oil Capacity": "1.9 qt",
      "Air Filter P/N": "0J8478S",
      "Battery Type": "Group 26R 540 CCA Min. or Group 35AGM 650 CCA Min.",
      "Engine Type": "G-Force 1000",
      Weight: "466 lb",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    brandSlug: "generac",
    images: [
      { url: "/images/products/gen1.png", alt: "Generac 22kW standby generator" },
      { url: "/images/products/gen2.png", alt: "Generac 22kW standby generator" },
      { url: "/images/products/gen3.png", alt: "Generac 22kW standby generator" },
    ],
  },
  {
    slug: "generac-portable-inverter-generator-iq3800",
    title: "Generac Portable Inverter Generator, iQ3800 | Dual Fuel | 49ST",
    summary: "Dual-fuel portable inverter generator with electric start.",
    specs: {
      "Base Model": "8944_",
      "Variant Number": "G0089440",
      "Fuel Tank Capacity": "3.2 gal",
      "Oil Capacity": "0.6 qt",
      "Starting Method": "Electric Start",
      "Battery Size": "4.5\" x 2.8\" x 5.2\"",
      "Engine Type": "OHV",
      Manufacturer: "Generac",
      "Battery Type": "Lead Acid (12V DC, 6 Ah)",
      "Engine Size": "212cc",
    },
    divisionSlug: "heavy-equipment",
    categorySlug: "industrial-generators",
    brandSlug: "generac",
    images: [
      { url: "/images/products/portableinverter1.png", alt: "Generac iQ3800 portable inverter generator" },
      { url: "/images/products/portableinverter2.png", alt: "Generac iQ3800 portable inverter generator" },
    ],
  },

  // --- Medical equipment (medical) -------------------------------------------
  {
    slug: "siemens-acuson-sequoia-ultrasound",
    title: "OptiFidelity Premium Diagnostic Ultrasound Platform",
    summary: "High-resolution diagnostic ultrasound platform for multi-specialty imaging.",
    description:
      "Engineered by Siemens Healthineers under the ACUSON Sequoia model lineage, this top-tier imaging solution is optimized for exceptional high-resolution diagnostic imaging across radiology, cardiology, obstetrics and gynecology, advanced vascular studies, and general imaging. Built with advanced computational imaging (BioAcoustic) to overcome challenging patient anatomies, it delivers consistent diagnostic clarity with intelligent workflow automation and a highly adaptable, multi-specialty probe configuration.",
    specs: {
      Manufacturer: "Siemens Healthineers",
      Platform: "ACUSON Sequoia",
      Specialties: "Radiology, cardiology, OB/GYN, vascular, general imaging",
      Imaging: "Advanced computational imaging (BioAcoustic)",
    },
    divisionSlug: "medical",
    brandSlug: "siemens-health",
    images: [
      { url: "/images/products/diagnostic-ultrasound1.png", alt: "OptiFidelity diagnostic ultrasound platform" },
      { url: "/images/products/diagnostic-ultrasound2.png", alt: "OptiFidelity diagnostic ultrasound platform" },
      { url: "/images/products/diagnostic-ultrasound3.png", alt: "OptiFidelity diagnostic ultrasound platform" },
    ],
  },
  {
    slug: "varian-halcyon-linear-accelerator",
    title: "Radiance Precision Linear Accelerator Platform",
    summary: "Image-guided radiation therapy platform for high-precision oncology.",
    description:
      "Engineered by Varian (Siemens Healthineers) under the Halcyon model lineage, this radiation therapy system is optimized for modern oncology centers dedicated to high-precision cancer treatment. It delivers highly targeted, image-guided radiation directly to tumor sites while sparing surrounding healthy tissue, with automated treatment delivery protocols that enhance efficiency and daily patient throughput.",
    specs: {
      Manufacturer: "Varian (Siemens Healthineers)",
      Platform: "Halcyon",
      Application: "Image-guided radiation therapy (IMRT, VMAT)",
    },
    divisionSlug: "medical",
    brandSlug: "varian",
    images: [
      { url: "/images/products/diagnostic-ultrasound1.png", alt: "Radiance Precision Linear Accelerator Platform" },
      { url: "/images/products/diagnostic-ultrasound2.png", alt: "Radiance Precision Linear Accelerator Platform" },
      { url: "/images/products/diagnostic-ultrasound3.png", alt: "Radiance Precision Linear Accelerator Platform" },
    ],
  },
  {
    slug: "ge-revolution-maxima-ct-scanner",
    title: "MaximScan High-Performance Computed Tomography System",
    summary: "High-performance CT scanner for detailed multi-planar imaging.",
    description:
      "Developed by GE HealthCare under the Revolution Maxima model lineage, this CT scanner streamlines complex clinical workflows and elevates patient care by delivering exceptionally detailed, multi-planar cross-sectional imagery of internal organs, skeletal structures, vascular networks, and soft tissue. Intelligent automation optimizes scan consistency and dose efficiency for precise diagnostic clarity, from emergency trauma response to routine oncology monitoring.",
    specs: {
      Manufacturer: "GE HealthCare",
      Platform: "Revolution Maxima",
      Imaging: "Multi-planar cross-sectional CT",
    },
    divisionSlug: "medical",
    brandSlug: "ge",
    images: [
      { url: "/images/products/maximscan1.png", alt: "MaximScan CT system" },
      { url: "/images/products/maximscan2.png", alt: "MaximScan CT system" },
      { url: "/images/products/maximscan3.png", alt: "MaximScan CT system" },
    ],
  },
  {
    slug: "philips-ingenia-mri",
    title: "OptiScan High-Fidelity Resonance Imaging Platform",
    summary: "1.5T MRI platform for ultra-detailed soft tissue and neurological imaging.",
    description:
      "Engineered by Philips under the Ingenia 1.5T model series, this MRI system is optimized for ultra-detailed profiling of soft tissue structures, neurological pathways, the spinal column, musculoskeletal joints, and internal abdominal organs. An expansive bore environment significantly lowers patient anxiety while capturing exceptionally crisp, high-contrast imagery, providing the dependable, premium-grade fidelity clinical teams need for precise condition monitoring and intervention planning.",
    specs: {
      Manufacturer: "Philips",
      Platform: "Ingenia 1.5T",
      Field: "1.5 Tesla",
      Applications: "Neurological, spinal, musculoskeletal, abdominal imaging",
    },
    divisionSlug: "medical",
    brandSlug: "philips",
    images: [
      { url: "/images/products/optiscanhighfidelity1.png", alt: "OptiScan High-Fidelity MRI platform" },
      { url: "/images/products/optiscanhighfidelity2.png", alt: "OptiScan High-Fidelity MRI platform" },
      { url: "/images/products/optiscanhighfidelity3.png", alt: "OptiScan High-Fidelity MRI platform" },
    ],
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
        description: p.description ?? null,
        specs: p.specs ?? undefined,
        divisionId,
        brandId: brandId ?? null,
        categoryId: categoryId ?? null,
      },
      create: {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        description: p.description ?? undefined,
        specs: p.specs ?? undefined,
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