"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { SectionIndex } from "../ui/SectionIndex";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Testimonial() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-bg-deep py-24 sm:py-32"
      aria-labelledby="testimonial-heading"
    >
      {/* radial spotlight behind the card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,110,245,0.14) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <div className="absolute right-5 top-0 sm:right-8">
          <SectionIndex n={4} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Eyebrow className="mb-6 justify-center">{"// CLIENT STORY"}</Eyebrow>
          <h2
            id="testimonial-heading"
            className="mx-auto max-w-3xl font-display text-[clamp(1.95rem,4.4vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.01em] text-text-primary text-balance"
          >
            From Google Sheets to a{" "}
            <span className="text-accent">$4M valuation.</span>
          </h2>
        </motion.div>

        {/* quote card */}
        <motion.figure
          className="panel blade-tr group relative mx-auto mt-12 w-full max-w-3xl overflow-hidden rounded-[8px] p-8 text-left backdrop-blur-sm sm:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {/* scanner sweep verifying the source */}
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(91,140,255,0.18), transparent)",
              }}
              initial={{ x: "-120%" }}
              whileInView={{ x: "320%" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
            />
          )}

          <figcaption className="mb-6 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-glass-border bg-bg-deep font-display text-sm font-bold text-accent-bright">
              PE
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
              Prospect Engine
            </span>
          </figcaption>

          <blockquote className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.4] tracking-tight text-text-primary">
            Axiom helped transform Prospect Engine from a spreadsheet-based
            service into a software-backed product with a{" "}
            <span className="text-accent-bright">$4 million valuation</span>.
            Their ability to understand the business, shape the system, and
            execute technically was exceptional.
          </blockquote>

          <div className="mt-8 border-t border-line pt-5">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-secondary">
              Paul Knox, Founder · Prospect Engine
            </p>
            <p className="mt-2 text-sm text-text-secondary/80">
              A service-based product transformed into a scalable
              software-backed platform.
            </p>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
