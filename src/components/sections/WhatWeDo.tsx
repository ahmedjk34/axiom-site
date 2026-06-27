import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SectionIndex } from "../ui/SectionIndex";
import { OrderDiagram } from "../visuals/OrderDiagram";

export function WhatWeDo() {
  return (
    <section
      className="relative bg-bg-alt py-24 sm:py-32"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-center justify-between">
          <Reveal>
            <Eyebrow>{"// WHAT WE DO"}</Eyebrow>
          </Reveal>
          <SectionIndex n={2} />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <h2
                id="what-we-do-heading"
                className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.01em] text-text-primary text-balance"
              >
                We turn business problems into{" "}
                <span className="text-accent">working technology.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
                Axiom designs and builds the systems businesses need to operate
                better — automating repetitive work, launching digital products,
                and using AI where it creates real value. We don&apos;t start
                with code. We start with how the business actually works.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal direction="up" amount={0.2}>
              {/* panel with a blade-cut corner + mono label */}
              <div className="panel blade-br relative px-6 py-8 sm:px-10 sm:py-10">
                <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/70">
                  <span className="h-1.5 w-1.5 bg-accent" />
                  INPUT → SYSTEM
                </div>
                <OrderDiagram />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
