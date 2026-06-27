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
      className="relative flex min-h-[75vh] scroll-mt-24 items-center overflow-hidden bg-bg-primary py-28"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 opacity-70">
        <NodeNetwork density={0.8} intensity={0.9} />
      </div>

      <PerspectiveGrid variant="runway" />

      {/* brighter central glow framing the button */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,110,245,0.34) 0%, transparent 70%)",
          animation: "runway-pulse 6s var(--ease-axiom) infinite",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center sm:px-8">
        {/* HUD frame */}
        <div className="relative px-4 py-10 sm:px-10">
          <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l border-t border-accent/50" />
          <span className="pointer-events-none absolute right-0 top-0 h-6 w-6 border-r border-t border-accent/50" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b border-l border-accent/50" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b border-r border-accent/50" />

          <motion.p
            className="mb-6 flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="blade-chip h-3.5 w-3.5 bg-accent" aria-hidden="true" />
            {"// READY TO BUILD"}
          </motion.p>

          <motion.h2
            id="cta-heading"
            className="font-display text-[clamp(2.3rem,5.6vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.01em] text-text-primary text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
          >
            Have a workflow, idea, or product to build?
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-lg text-text-secondary"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            Let&apos;s turn it into a system that works.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <PrimaryCta href={`mailto:${CONTACT_EMAIL}`} size="xl">
              Start a Project
            </PrimaryCta>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              or contact us directly
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
