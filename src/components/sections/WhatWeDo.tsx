import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { OrderDiagram } from "../visuals/OrderDiagram";

export function WhatWeDo() {
  return (
    <section className="relative bg-bg-alt py-24 sm:py-32" aria-labelledby="what-we-do-heading">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow className="mb-6">{"// WHAT WE DO"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="what-we-do-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-text-primary text-balance"
            >
              We turn business problems into working technology.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
              Axiom designs and builds the systems businesses need to operate
              better — automating repetitive work, launching digital products,
              and using AI where it creates real value. We don&apos;t start with
              code. We start with how the business actually works.
            </p>
          </Reveal>
        </div>

        <div className="flex justify-center lg:col-span-6 lg:justify-end">
          <Reveal direction="up" amount={0.2} className="w-full max-w-md">
            <OrderDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
