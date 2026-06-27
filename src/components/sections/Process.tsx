"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { PROCESS_STEPS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  // line draws manual -> automated -> intelligent -> outcome
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative scroll-mt-16 overflow-hidden bg-bg-primary py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      {/* faint coordinate grid */}
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow className="mb-6">{"// HOW WE WORK"}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="process-heading"
              className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-text-primary"
            >
              From problem to working system.
            </h2>
          </Reveal>
        </div>

        <div ref={ref} className="mt-16">
          {/* Desktop: horizontal */}
          <div className="relative hidden md:block">
            {/* base line */}
            <div className="absolute left-0 right-0 top-6 h-px bg-accent-dim" />
            {/* drawn line */}
            <motion.div
              className="absolute left-0 top-6 h-px origin-left bg-gradient-to-r from-accent-dim via-accent to-accent-bright"
              style={{ right: 0, scaleX: lineScale }}
            />

            <ol className="relative grid grid-cols-5 gap-5">
              {PROCESS_STEPS.map((step, i) => (
                <StepNode key={step.n} step={step} index={i} />
              ))}
            </ol>
          </div>

          {/* Mobile: vertical */}
          <div className="relative md:hidden">
            <div className="absolute bottom-0 left-[11px] top-0 w-px bg-accent-dim" />
            <motion.div
              className="absolute left-[11px] top-0 w-px origin-top bg-gradient-to-b from-accent-dim via-accent to-accent-bright"
              style={{ bottom: 0, scaleY: lineScale }}
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

function NodeDot({ index }: { index: number }) {
  return (
    <motion.span
      className="relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border bg-bg-primary"
      initial={{ borderColor: "var(--color-accent-dim)" }}
      whileInView={{
        borderColor: "var(--color-accent)",
        boxShadow: "0 0 0 4px rgba(59,110,245,0.12)",
      }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 }}
    >
      <motion.span
        className="h-2 w-2 rounded-full bg-accent"
        initial={{ scale: 0.4, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: EASE, delay: index * 0.05 + 0.1 }}
      />
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
      <NodeDot index={index} />
      <p className="mt-5 font-mono text-xs tracking-[0.18em] text-accent">
        {step.n}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-text-primary">
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
      className="relative pl-12"
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}
    >
      <div className="absolute left-0 top-0">
        <NodeDot index={index} />
      </div>
      <p className="font-mono text-xs tracking-[0.18em] text-accent">{step.n}</p>
      <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-text-primary">
        {step.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        {step.body}
      </p>
    </motion.li>
  );
}
