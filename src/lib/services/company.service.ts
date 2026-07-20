import { companyInfo } from "@/data/company";
import type { CompanyInfo } from "@/types/content";

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return companyInfo;
}
