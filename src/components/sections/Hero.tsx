"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { NodeNetwork } from "../visuals/NodeNetwork";
import { PerspectiveGrid } from "../visuals/PerspectiveGrid";
import { AxiomMark } from "../ui/Logo";
import { PrimaryCta, SecondaryLink } from "../ui/CtaButton";

const HEADLINE_LINES = [
  ["Software,", "AI,", "and"],
  ["automation", "built"],
  ["around", "your", "business."],
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-out: the sensation of entering the system.
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const networkY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-bg-primary"
    >
      {/* Layer 2: node network */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: networkY }}
      >
        <NodeNetwork interactive density={1} intensity={1} />
      </motion.div>

      {/* Layer 3: perspective grid floor */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { opacity: gridOpacity }}
      >
        <PerspectiveGrid />
      </motion.div>

      {/* Layer 4: ghost triangle mark behind the headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <AxiomMark
          className="h-[min(70vw,640px)] w-[min(70vw,640px)] opacity-[0.04]"
          pulse={false}
        />
      </div>

      {/* Layer 5: directional blue glow from top-right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,110,245,0.35) 0%, transparent 70%)",
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
        <div className="max-w-4xl">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="inline-block h-px w-6 bg-accent/60" />
            {"// TECHNOLOGY SOLUTIONS STUDIO"}
          </motion.p>

          <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[1.02] tracking-[0.01em] text-text-primary">
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                {line.map((word) => {
                  const i = wordIndex++;
                  const isLast = li === HEADLINE_LINES.length - 1;
                  return (
                    <motion.span
                      key={word + i}
                      className={`mr-[0.25em] inline-block ${
                        isLast ? "text-gradient" : ""
                      }`}
                      initial={
                        reduce
                          ? { opacity: 0 }
                          : { opacity: 0, y: "110%", rotateX: -40 }
                      }
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: reduce ? 0.3 : 0.85,
                        ease: EASE,
                        delay: reduce ? 0 : 0.35 + i * 0.085,
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
            transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0.1 : 1.5 }}
          >
            Axiom helps businesses turn complex workflows, manual processes, and
            product ideas into reliable digital systems that save time, reduce
            friction, and create room to grow.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: reduce ? 0.15 : 1.7 }}
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
        transition={{ duration: 0.8, delay: reduce ? 0.2 : 2 }}
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
