"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Abstract "messy becomes structured" diagram. Three disorganized geometric
 * forms reorganize on scroll-into-view into one clean, connected system.
 * Geometric forms only — no literal icons.
 */
export function OrderDiagram() {
  const reduce = useReducedMotion();

  const EASE = [0.22, 1, 0.36, 1] as const;

  // each shape: messy (hidden) -> ordered (visible)
  const makeShape = (
    messy: { x: number; y: number; r: number },
    ordered: { x: number; y: number }
  ): Variants => ({
    hidden: reduce
      ? { x: ordered.x, y: ordered.y, rotate: 0, opacity: 0.001 }
      : { x: messy.x, y: messy.y, rotate: messy.r, opacity: 0.55 },
    visible: {
      x: ordered.x,
      y: ordered.y,
      rotate: 0,
      opacity: 1,
      transition: { duration: reduce ? 0.3 : 1, ease: EASE },
    },
  });

  const lineVariants: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: reduce ? 0.2 : 0.9, ease: EASE, delay: 0.5 },
    },
  };

  return (
    <motion.svg
      viewBox="0 0 420 340"
      className="h-auto w-full max-w-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      role="img"
      aria-label="Three scattered shapes reorganizing into one connected system"
    >
      {/* faint frame */}
      <rect
        x="10"
        y="10"
        width="400"
        height="320"
        rx="12"
        fill="none"
        stroke="var(--color-line)"
      />

      {/* connecting lines (drawn after shapes settle) — central hub topology */}
      <motion.path
        d="M210 170 L110 90"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        variants={lineVariants}
      />
      <motion.path
        d="M210 170 L320 110"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        variants={lineVariants}
      />
      <motion.path
        d="M210 170 L160 270"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        variants={lineVariants}
      />
      <motion.path
        d="M210 170 L300 250"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        fill="none"
        variants={lineVariants}
      />

      {/* central hub node */}
      <motion.g
        variants={{
          hidden: { opacity: reduce ? 0.001 : 0, scale: 0.6 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: reduce ? 0.3 : 0.7, ease: EASE, delay: 0.3 },
          },
        }}
        style={{ transformOrigin: "210px 170px" }}
      >
        <circle cx="210" cy="170" r="13" fill="var(--color-accent)" />
        <circle cx="210" cy="170" r="5" fill="var(--color-text-primary)" />
      </motion.g>

      {/* shape 1 — square */}
      <motion.rect
        x="-15"
        y="-15"
        width="30"
        height="30"
        rx="4"
        fill="none"
        stroke="var(--color-text-secondary)"
        strokeWidth="2"
        variants={makeShape({ x: 80, y: 250, r: -28 }, { x: 110, y: 90 })}
      />

      {/* shape 2 — triangle */}
      <motion.path
        d="M0 -17 L16 12 L-16 12 Z"
        fill="none"
        stroke="var(--color-text-secondary)"
        strokeWidth="2"
        variants={makeShape({ x: 330, y: 60, r: 35 }, { x: 320, y: 110 })}
      />

      {/* shape 3 — circle */}
      <motion.circle
        r="16"
        fill="none"
        stroke="var(--color-text-secondary)"
        strokeWidth="2"
        variants={makeShape({ x: 120, y: 70, r: 0 }, { x: 160, y: 270 })}
      />

      {/* shape 4 — diamond, completes the balanced system */}
      <motion.path
        d="M0 -16 L16 0 L0 16 L-16 0 Z"
        fill="none"
        stroke="var(--color-text-secondary)"
        strokeWidth="2"
        variants={makeShape({ x: 280, y: 300, r: 20 }, { x: 300, y: 250 })}
      />
    </motion.svg>
  );
}
