import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/types/content";
import Image from "next/image";

export interface HeroSectionProps {
  content: HeroContent;
}

function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="bg-ink text-paper relative overflow-hidden py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="animate-hero-glow-drift bg-brand-blue/20 absolute -top-1/4 left-1/3 size-[36rem] rounded-full blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="animate-hero-glow-drift bg-accent/20 absolute right-0 bottom-0 size-[28rem] rounded-full blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <Container width="wide" className="relative">
      
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-8">
          <span
            className="animate-hero-rise-in rounded-pill border-paper/15 bg-paper/5 text-accent-on-dark inline-flex w-fit items-center border px-3 py-1 font-mono text-xs tracking-widest uppercase"
            style={{ animationDelay: "0.05s" }}
          >
            {content.eyebrow}
          </span>

          <h1
            className="animate-hero-rise-in font-display max-w-3xl text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="text-paper block">{content.headlineLine1}</span>
            <span className="text-brand-amber block">
              {content.headlineHighlight}{" "}
              <span className="text-paper">{content.headlineLine2}</span>
            </span>
          </h1>

          <p
            className="animate-hero-rise-in text-paper/70 max-w-(--measure) text-lg"
            style={{ animationDelay: "0.25s" }}
          >
            {content.subheadline}
          </p>

          {/* Circular photo frame */}
          <div className="relative flex size-40 items-center justify-center sm:size-48 md:col-start-2 md:row-span-4 md:row-start-1 md:mx-auto md:size-56 lg:size-96">
            <div
              className="animate-hero-ring-spin absolute inset-0 rounded-full opacity-70"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--brand-blue), var(--brand-red), var(--brand-amber), var(--brand-green), var(--brand-blue))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
              }}
              aria-hidden="true"
            />
            <div className="border-paper/10 bg-paper/5 absolute inset-2 overflow-hidden rounded-full border">
              <Image
                src="/images/hero/hero.png"
                alt="hero image"
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 224px, (min-width: 640px) 192px, 160px"
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div
            className="animate-hero-rise-in flex flex-col gap-3 pt-2 sm:flex-row md:col-start-1"
            style={{ animationDelay: "0.35s" }}
          >
            <Button asChild size="lg">
              <Link href={content.primaryCtaHref}>
                {content.primaryCtaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-paper/25 text-paper hover:bg-paper/10"
            >
              <Link href={content.secondaryCtaHref}>{content.secondaryCtaLabel}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { HeroSection };
