"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SectionIndex } from "../ui/SectionIndex";
import { PROCESS_STEPS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      {/* stronger coordinate grid */}
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-80" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <Reveal>
            <Eyebrow>{"// HOW WE WORK"}</Eyebrow>
          </Reveal>
          <SectionIndex n={6} />
        </div>
        <Reveal delay={0.05}>
          <h2
            id="process-heading"
            className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.01em] text-text-primary"
          >
            From problem to working system.
          </h2>
        </Reveal>

        <div ref={ref} className="mt-16">
          {/* Desktop: horizontal */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-[27px] h-0.5 bg-accent-dim" />
            <motion.div
              className="absolute left-0 top-[27px] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-bright"
              style={{ right: 0, scaleX: lineScale }}
            />
            {/* traveling data pulse */}
            <span
              className="pulse-travel absolute top-[23px] z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-bright shadow-[0_0_12px_4px_rgba(91,140,255,0.7)]"
              aria-hidden="true"
            />

            <ol className="relative grid grid-cols-5 gap-5">
              {PROCESS_STEPS.map((step, i) => (
                <StepNode key={step.n} step={step} index={i} />
              ))}
            </ol>
          </div>

          {/* Mobile: vertical */}
          <div className="relative md:hidden">
            <div className="absolute bottom-0 left-[21px] top-0 w-0.5 bg-accent-dim" />
            <motion.div
              className="absolute left-[21px] top-0 w-0.5 origin-top bg-gradient-to-b from-accent to-accent-bright"
              style={{ bottom: 0, scaleY: lineScale }}
            />
            <span
              className="pulse-travel-y absolute left-[21px] z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-bright shadow-[0_0_12px_4px_rgba(91,140,255,0.7)]"
              aria-hidden="true"
            />
            <ol className="relative flex flex-col gap-10">
              {PROCESS_STEPS.map((step, i) => (
                <StepNodeMobile key={step.n} step={step} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

type Step = (typeof PROCESS_STEPS)[number];

function NodeRing({ n, index }: { n: string; index: number }) {
  return (
    <motion.span
      className="relative z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 bg-bg-primary font-mono text-sm font-medium"
      initial={{
        borderColor: "var(--color-accent-dim)",
        color: "var(--color-text-secondary)",
      }}
      whileInView={{
        borderColor: "var(--color-accent)",
        color: "var(--color-accent-bright)",
        boxShadow: "0 0 0 5px rgba(59,110,245,0.16), 0 0 22px rgba(59,110,245,0.5)",
      }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
    >
      {n}
    </motion.span>
  );
}

function StepNode({ step, index }: { step: Step; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
    >
      <NodeRing n={step.n} index={index} />
      <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-text-primary">
        {step.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {step.body}
      </p>
    </motion.li>
  );
}

function StepNodeMobile({ step, index }: { step: Step; index: number }) {
  return (
    <motion.li
      className="relative pl-16"
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}
    >
      <div className="absolute left-0 top-0">
        <NodeRing n={step.n} index={index} />
      </div>
      <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-text-primary">
        {step.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {step.body}
      </p>
    </motion.li>
  );
}
