"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { SectionIndex } from "../ui/SectionIndex";
import { WHY_STATEMENTS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "$4M", label: "Valuation unlocked" },
  { value: "3", label: "Platforms shipped" },
  { value: "RTL", label: "Arabic-first capable" },
];

export function WhyAxiom() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative bg-bg-deep py-28 sm:py-36"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex items-center justify-between">
          <Eyebrow>{"// WHY AXIOM"}</Eyebrow>
          <SectionIndex n={7} />
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* left — the question + a hard proof block */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h2
                id="why-heading"
                className="font-display text-[clamp(2.6rem,6vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.01em] text-text-primary"
              >
                Why Axiom?
              </h2>

              {/* proof panel with a blade corner */}
              <div className="panel blade-br mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[8px]">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-bg-primary/40 px-4 py-6">
                    <p className="font-display text-3xl font-bold tracking-tight text-accent sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase leading-tight tracking-[0.14em] text-text-secondary">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* right — statements with a sharp, fast wipe */}
          <div className="lg:col-span-7 lg:border-l lg:border-line lg:pl-16">
            <ul>
              {WHY_STATEMENTS.map((statement, i) => (
                <li
                  key={statement}
                  className="relative overflow-hidden border-b border-line py-6 first:pt-0"
                >
                  <p className="font-display text-xl font-bold leading-snug tracking-tight text-text-primary sm:text-2xl">
                    {statement}
                  </p>
                  {!reduce && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 bg-bg-deep"
                      style={{ transformOrigin: "right center" }}
                      initial={{ scaleX: 1 }}
                      whileInView={{ scaleX: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.42,
                        ease: [0.65, 0, 0.35, 1],
                        delay: i * 0.07,
                      }}
                    />
                  )}
                </li>
              ))}
            </ul>

            <motion.p
              className="mt-10 max-w-2xl text-base leading-relaxed text-text-secondary"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              Axiom is built for businesses that need more than a basic website.
              We think through the problem, design the right system, and build
              technology that fits how the business actually works.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
