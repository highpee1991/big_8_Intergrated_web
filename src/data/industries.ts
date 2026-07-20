import {
  Fuel,
  Truck,
  Cpu,
  Stethoscope,
  Factory,
  Package,
  Landmark,
  Globe,
} from "lucide-react";
import type { Division } from "@/types/content";

export const divisions: Division[] = [
  {
    id: "oil-gas-equipment",
    slug: "oil-gas-equipment",
    name: "Oil & Gas Equipment",
    description: "Equipment supply for upstream and midstream oil and gas operations.",
    icon: Fuel,
  },
  {
    id: "heavy-equipment",
    slug: "heavy-equipment",
    name: "Heavy Equipment",
    description: "Heavy machinery and equipment for industrial and construction use.",
    icon: Truck,
  },
  {
    id: "information-technology",
    slug: "information-technology",
    name: "Information Technology",
    description: "Technology solutions and IT services for enterprise operations.",
    icon: Cpu,
  },
  {
    id: "medical",
    slug: "medical",
    name: "Medical",
    description:
      "Medical equipment and supplies for healthcare providers and facilities.",
    icon: Stethoscope,
  },
  {
    id: "industrial",
    slug: "industrial",
    name: "Industrial",
    description:
      "Industrial parts and supply solutions for manufacturing and production operations.",
    icon: Factory,
  },
  {
    id: "logistics",
    slug: "logistics",
    name: "Logistics",
    description:
      "Transportation and freight solutions for supply chain and distribution needs.",
    icon: Package,
  },
  {
    id: "government",
    slug: "government",
    name: "Government",
    description: "Procurement solutions and equipment supply for public sector agencies.",
    icon: Landmark,
  },
  {
    id: "other-industries",
    slug: "other",
    name: "Other Industries",
    description:
      "Custom sourcing and procurement solutions for specialized industry needs.",
    icon: Globe,
  },
];
