import { Eyebrow } from "../ui/Eyebrow";
import { Reveal, RevealItem } from "../ui/Reveal";
import { SectionIndex } from "../ui/SectionIndex";
import { ServiceSchematic } from "../visuals/ServiceSchematic";
import { SERVICES } from "@/lib/content";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary py-24 sm:py-32"
      aria-labelledby="services-heading"
    >
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <Reveal>
            <Eyebrow>{"// CAPABILITIES"}</Eyebrow>
          </Reveal>
          <SectionIndex n={3} />
        </div>
        <Reveal delay={0.05}>
          <h2
            id="services-heading"
            className="max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.01em] text-text-primary text-balance"
          >
            Four ways we move your business forward.
          </h2>
        </Reveal>

        <Reveal
          stagger
          amount={0.15}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {SERVICES.map((service, i) => (
            <RevealItem key={service.id}>
              <article className="panel panel-hover group relative h-full overflow-hidden rounded-[8px] p-7">
                {/* corner bracket — engineered chamber */}
                <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-text-secondary/40" />
                {/* blade accent (brightens on hover) */}
                <span className="pointer-events-none absolute right-0 top-0 h-0 w-0 border-l-[20px] border-t-[20px] border-l-transparent border-t-accent opacity-25 transition-opacity duration-300 group-hover:opacity-100" />

                {/* schematic — visible at rest, traces + brightens on hover */}
                <div className="mb-7 h-28 w-full">
                  <ServiceSchematic type={service.schematic} />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tracking-[0.18em] text-accent">
                    {`[ 0${i + 1} ]`}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
                    {service.pillar}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                  {service.headline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
                  {service.body}
                </p>
              </article>
            </RevealItem>
          ))}

          {/* 5th "empty" card — sharper dashed, intentional */}
          <RevealItem className="md:col-span-2">
            <div className="group flex min-h-[96px] items-center justify-center rounded-[8px] border border-dashed border-text-secondary/25 bg-transparent p-7 text-text-secondary transition-colors duration-300 hover:border-accent hover:text-text-primary">
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
