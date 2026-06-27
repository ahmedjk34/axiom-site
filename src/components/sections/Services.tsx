import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, RevealItem } from "../ui/Reveal";
import { ServiceSchematic } from "../visuals/ServiceSchematic";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-16 overflow-hidden bg-bg-primary py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      {/* faint geometric pattern */}
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-6">{"// CAPABILITIES"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="services-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-text-primary text-balance"
            >
              Four ways we move your business forward.
            </h2>
          </Reveal>
        </div>

        <Reveal
          stagger
          amount={0.15}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES.map((service, i) => (
            <RevealItem key={service.id}>
              <article className="group relative h-full overflow-hidden rounded-[12px] border border-glass-border bg-glass p-7 transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent hover:shadow-[0_24px_60px_-24px_rgba(59,110,245,0.5)]">
                {/* schematic */}
                <div className="mb-7 h-28 w-full">
                  <ServiceSchematic type={service.schematic} />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tracking-[0.18em] text-accent">
                    {`0${i + 1}`}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                    {service.pillar}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
                  {service.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                  {service.body}
                </p>
              </article>
            </RevealItem>
          ))}

          {/* 5th "empty" card — Axiom is growing */}
          <RevealItem className="md:col-span-2">
            <div className="group flex min-h-[112px] items-center justify-center rounded-[12px] border border-dashed border-glass-border bg-transparent p-7 text-text-secondary transition-colors duration-300 hover:border-accent/60 hover:text-text-primary">
              <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
                <span className="text-2xl leading-none text-accent">+</span>
                More capabilities, as you grow
              </span>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
