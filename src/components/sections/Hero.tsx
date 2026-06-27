"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { NodeNetwork } from "../visuals/NodeNetwork";
import { AxiomMark } from "../ui/Logo";
import { PrimaryCta, SecondaryLink } from "../ui/CtaButton";

// Tight 2–3 line break; "automation" is the single deliberate blue hit.
const HEADLINE_LINES: { word: string; accent?: boolean }[][] = [
  [{ word: "Software," }, { word: "AI," }, { word: "and" }],
  [{ word: "automation", accent: true }, { word: "built" }, { word: "around" }],
  [{ word: "your" }, { word: "business." }],
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const networkY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg-primary"
    >
      {/* Layer 2: living node network */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: networkY }}
      >
        <NodeNetwork interactive density={1.25} intensity={1.35} />
      </motion.div>

      {/* Layer 4: Axiom brand watermark, offset to the right. Static — it sits
          in place and scrolls naturally with the hero (no parallax, fade, or
          pinning). */}
      <div
        className="pointer-events-none absolute right-[-6%] top-0 hidden h-full items-center lg:flex"
        aria-hidden="true"
      >
        <AxiomMark
          className="h-[min(46vw,560px)] w-[min(46vw,560px)] opacity-[0.08]"
          pulse={false}
        />
      </div>

      {/* Layer 5: directional blue glow from top-right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,110,245,0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 6: foreground content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
        style={
          reduce
            ? undefined
            : { scale: contentScale, y: contentY, opacity: contentOpacity }
        }
      >
        <div className="relative max-w-3xl">
          {/* HUD eyebrow row: studio mark left, technical readout right */}
          <motion.div
            className="mb-7 flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="blade-chip h-4 w-4 shrink-0 bg-accent" aria-hidden="true" />
            <div className="flex flex-1 items-center justify-between gap-4">
              <p className="eyebrow">{"// TECHNOLOGY SOLUTIONS STUDIO"}</p>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary/70 sm:block">
                [ AX-01 ] · 32.4°N 35.3°E
              </p>
            </div>
          </motion.div>

          <h1 className="font-display text-[clamp(2.9rem,9vw,6.5rem)] font-bold leading-[0.98] tracking-[-0.01em] text-text-primary">
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                {line.map(({ word, accent }) => {
                  const i = wordIndex++;
                  return (
                    <motion.span
                      key={word + i}
                      className={`mr-[0.25em] inline-block ${
                        accent ? "text-accent" : ""
                      }`}
                      initial={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, y: "110%", rotateX: -40 }
                      }
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: reduce ? 0.3 : 0.7,
                        ease: EASE,
                        delay: reduce ? 0 : 0.3 + i * 0.07,
                      }}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0.1 : 1.3 }}
          >
            Axiom helps businesses turn complex workflows, manual processes, and
            product ideas into reliable digital systems that save time, reduce
            friction, and create room to grow.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0.15 : 1.5 }}
          >
            <PrimaryCta href="#contact" size="lg">
              Start a Project
            </PrimaryCta>
            <SecondaryLink href="#services">Explore Services</SecondaryLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduce ? 0.2 : 1.8 }}
        aria-hidden="true"
      >
        <div className="relative h-10 w-px overflow-hidden bg-line">
          <span
            className="absolute left-0 top-0 h-2 w-px bg-accent-bright"
            style={{ animation: "scroll-dot 2.2s var(--ease-axiom) infinite" }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
