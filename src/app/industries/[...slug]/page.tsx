// src/app/industries/[...slug]/page.tsx
import { ComingSoon } from "@/components/common/coming-soon";
import { findNavLabel } from "@/config/nav-data";

function toTitleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => (word[0]?? "").toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function IndustriesSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/industries/${slug.join("/")}`;
  const match = findNavLabel(href);
  const title = match?.label ?? toTitleCase(slug[slug.length - 1] ?? "");

  return <ComingSoon title={title} />;
}
