import { getHeroContent, getTrustedIndustries, getWhyChooseUsPoints } from "@/lib/services/homepage.service";
import { getDivisions } from "@/lib/services/industries.service";
import { getCompanyInfo } from "@/lib/services/company.service";
import { getFeaturedProducts } from "@/lib/services/products.service";
import { getBrands } from "@/lib/services/brands.service";

import { HeroSection } from "@/features/home/components/hero-section";
import { AboutSection } from "@/features/home/components/about-section";
import { StatsBandSection } from "@/features/home/components/stats-band-section";
import { BusinessDivisionsSection } from "@/features/home/components/business-divisions-section";
import { FeaturedProductsSection } from "@/features/home/components/featured-products-section";
import { WhyChooseUsSection } from "@/features/home/components/why-choose-us-section";
import { BrandsSection } from "@/features/home/components/brands-section";
import { CtaSection } from "@/features/home/components/cta-section";
import { TrustedAcross } from "@/components/common/trusted-across";
import { getClients } from "@/lib/services/clients.service";
import { getRandomItems } from "@/lib/array";

/**
 * The page stays thin: fetch everything through the services layer, then
 * hand typed data down to dumb section components. No business logic and
 * no direct data/ imports here , see src/lib/services/.
 */
export default async function HomePage() {
  const [hero, trustedIndustries, whyChooseUs, divisions, company, products, brands, clients] =
    await Promise.all([
      getHeroContent(),
      getTrustedIndustries(),
      getWhyChooseUsPoints(),
      getDivisions(),
      getCompanyInfo(),
      getFeaturedProducts(3),
      getBrands(),
      getClients()
    ]);


  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <HeroSection content={hero} />
      <TrustedAcross clients={clients} />
      <AboutSection company={company} />
      <StatsBandSection stats={company.stats} />
      <BusinessDivisionsSection divisions={divisions} />
      <FeaturedProductsSection products={products} />
      <WhyChooseUsSection points={whyChooseUs} />
      <BrandsSection brands={brands} />
      <CtaSection content={hero} />
    </main>
  );
}
