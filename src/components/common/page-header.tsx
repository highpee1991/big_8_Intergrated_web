import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Standard top-of-page header for interior pages (About, Industries,
 * Products, Contact...) , one component instead of every page rolling
 * its own hero-ish opener. Deliberately lighter than the homepage
 * HeroSection: no dark background, no circular image, just a clean,
 * consistent entry point.
 */
function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-surface py-16 sm:py-20">
      <Container>
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            {eyebrow}
          </span>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="text-base text-muted sm:text-lg">{description}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

export { PageHeader };