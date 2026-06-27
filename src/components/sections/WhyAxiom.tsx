"use client";

import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { WHY_STATEMENTS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhyAxiom() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative bg-bg-deep py-28 sm:py-36"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* left — the question */}
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Eyebrow className="mb-6">{"// WHY AXIOM"}</Eyebrow>
            <h2
              id="why-heading"
              className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.02] tracking-tight text-text-primary"
            >
              Why Axiom?
            </h2>
          </motion.div>
        </div>

        {/* right — statements with text-wipe + vertical divider */}
        <div className="lg:col-span-7 lg:col-start-6 lg:border-l lg:border-line lg:pl-16">
          <ul>
            {WHY_STATEMENTS.map((statement, i) => (
              <li
                key={statement}
                className="relative overflow-hidden border-b border-line py-6 first:pt-0"
              >
                <p className="font-display text-xl font-medium leading-snug tracking-tight text-text-primary sm:text-2xl">
                  {statement}
                </p>
                {/* left→right wipe: a cover that retracts toward the right */}
                {!reduce && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 bg-bg-deep"
                    style={{ transformOrigin: "right center" }}
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                      delay: i * 0.09,
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
            Axiom is built for businesses that need more than a basic website. We
            think through the problem, design the right system, and build
            technology that fits how the business actually works.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
