import type { Client } from "@/types/content";

/**
 * Real clients — confirmed by the user, not placeholder. Logo files live
 * in public/images/clients/.
 */
export const clients: Client[] = [
  {
    id: "tdcj",
    name: "Texas Department of Criminal Justice",
    logoSrc: "/images/clients/tdcj.png",
  },
  {
    id: "texas-dept-agriculture",
    name: "Texas Department of Agriculture",
    logoSrc: "/images/clients/texasdepartmentofagriculture.png",
  },
  {
    id: "thhs",
    name: "Texas Health and Human Services",
    logoSrc: "/images/clients/thhs.png",
  },
  { id: "tpwd", name: "Texas Parks and Wildlife", logoSrc: "/images/clients/tpwd.png" },
  {
    id: "txdt",
    name: "Texas Department of Transportation",
    logoSrc: "/images/clients/TXDT.png",
  },
  { id: "chevron", name: "Chevron", logoSrc: "/images/clients/chevron.png" },
  { id: "cps-energy", name: "CPS Energy", logoSrc: "/images/clients/cpsenergy.png" },
  {
    id: "exl-canada",
    name: "EXL Canada Lubricant",
    logoSrc: "/images/clients/exlcanada.png",
  },
  { id: "lukons", name: "Lukons", logoSrc: "/images/clients/lukons.png" },
  { id: "oilserv", name: "Oilserv Limited", logoSrc: "/images/clients/oilserv.png" },
  { id: "total-energies", name: "Total Energies", logoSrc: "/images/clients/total.png" },
  { id: "optimum", name: "Optimum", logoSrc: "/images/clients/optimum.png" },
];
