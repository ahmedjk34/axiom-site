"use client";

import { motion } from "motion/react";
import { NodeNetwork } from "../visuals/NodeNetwork";
import { PerspectiveGrid } from "../visuals/PerspectiveGrid";
import { PrimaryCta } from "../ui/CtaButton";
import { CONTACT_EMAIL } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] scroll-mt-16 items-center overflow-hidden bg-bg-primary py-28"
      aria-labelledby="cta-heading"
    >
      {/* sparse node network returns, quieter */}
      <div className="absolute inset-0 opacity-60">
        <NodeNetwork density={0.7} intensity={0.7} />
      </div>

      {/* runway grid viewed forward */}
      <PerspectiveGrid variant="runway" />

      {/* slow background pulse — a system idling, ready */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,110,245,0.22) 0%, transparent 70%)",
          animation: "runway-pulse 6s var(--ease-axiom) infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <motion.h2
          id="cta-heading"
          className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-text-primary text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Have a workflow, idea, or product to build?
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-lg text-text-secondary"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
        >
          Let&apos;s turn it into a system that works.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
        >
          <PrimaryCta href={`mailto:${CONTACT_EMAIL}`} size="lg">
            Start a Project
          </PrimaryCta>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            or contact us directly
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
