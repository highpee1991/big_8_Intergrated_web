import Image from "next/image";
import { Reveal } from "@/components/common/reveal";
import type { Client } from "@/types/content";

export interface TrustedAcrossProps {
  clients: Client[];
}

function TrustedAcross({ clients }: TrustedAcrossProps) {
  if (clients.length === 0) return null;

  return (
    <section className="border-border bg-surface border-y py-10">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-muted mb-6 text-center font-mono text-xs tracking-widest uppercase">
            Trusted by
          </p>
        </Reveal>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {clients.map((client, i) => (
            <Reveal key={client.id} delay={Math.min(i * 0.04, 0.3)}>
              <div className="group bg-paper duration-base hover:border-primary/30 flex h-16 w-32 items-center justify-center rounded-lg border border-transparent p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm">
                <Image
                  src={client.logoSrc}
                  alt={client.name}
                  width={112}
                  height={40}
                  className="duration-base h-full w-full object-contain opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TrustedAcross };
