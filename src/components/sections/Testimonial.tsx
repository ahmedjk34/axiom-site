"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { SectionIndex } from "../ui/SectionIndex";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Counts $0 → $4M on scroll-in. Renders the final value instantly under
 *  prefers-reduced-motion. */
function ValuationCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const dur = 850;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(eased * 4);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const display = val >= 4 ? "$4M" : `$${val.toFixed(1)}M`;
  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function Testimonial() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-bg-deep py-24 sm:py-32"
      aria-label="Client story: From Google Sheets to a $4M valuation"
    >
      {/* radial spotlight */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[1000px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(59,110,245,0.16) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-12 flex items-center justify-between">
          <Eyebrow>{"// CLIENT STORY"}</Eyebrow>
          <SectionIndex n={4} />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* LEFT — the number is the hero */}
          <div className="lg:col-span-5">
            {/* FROM → TO trajectory */}
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary">
              <span className="shrink-0">Google Sheets</span>
              <span className="relative h-px flex-1 overflow-hidden bg-line">
                <motion.span
                  className="absolute inset-0 origin-left bg-accent"
                  initial={{ scaleX: reduce ? 1 : 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                />
              </span>
              <span className="shrink-0 text-accent">
                Software-backed product ▶
              </span>
            </div>

            <p className="mt-8 font-display text-[clamp(4.5rem,12vw,8.75rem)] font-bold leading-[0.9] tracking-[-0.02em] text-accent">
              <ValuationCounter />
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-text-secondary">
              Valuation reached
            </p>
          </div>

          {/* RIGHT — the quote card */}
          <motion.figure
            className="panel blade-tr group relative overflow-hidden rounded-[8px] border-l-2 border-l-accent p-8 backdrop-blur-sm sm:p-10 lg:col-span-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            {/* scanner sweep */}
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(91,140,255,0.2), transparent)",
                }}
                initial={{ x: "-120%" }}
                whileInView={{ x: "320%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
              />
            )}

            <figcaption className="mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-glass-border bg-bg-deep font-display text-lg font-bold text-accent-bright">
                PE
              </span>
              <span className="flex flex-col">
                <span className="font-display text-base font-bold tracking-tight text-text-primary">
                  Prospect Engine
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-secondary">
                  SaaS · Product
                </span>
              </span>
            </figcaption>

            <blockquote className="font-display text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-[1.4] tracking-tight text-text-primary">
              Axiom helped transform Prospect Engine from a spreadsheet-based
              service into a software-backed product with a{" "}
              <span className="text-accent">$4 million valuation</span>. Their
              ability to understand the business, shape the system, and execute
              technically was exceptional.
            </blockquote>

            <div className="mt-8 border-t border-line pt-5">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-secondary">
                Paul Knox, Founder · Prospect Engine
              </p>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
