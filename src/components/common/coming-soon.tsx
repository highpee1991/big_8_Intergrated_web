import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "./section";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ComingSoonProps {
  title: string;
}

function ComingSoon({ title }: ComingSoonProps) {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <Section spacing="lg" className="flex flex-1 items-center">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Construction className="text-brand-amber" size={40} />
          <h1 className="font-display text-navy mt-6 text-3xl font-semibold md:text-4xl">
            {title}
          </h1>
          <span className="text-accent font-mono text-xs tracking-widest uppercase">
            This page is under maintenance. We&apos;re working on it, check back soon.
          </span>

          <Button asChild  className="mt-2">
            <Link href="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}

export { ComingSoon };
