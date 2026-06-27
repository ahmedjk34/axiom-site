"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const txt = "var(--color-text-secondary)";
const node = "var(--color-accent)";
const nodeBright = "var(--color-accent-bright)";
const lineSoft = "var(--color-line)";

/**
 * "Messy → structured" shown as a clear before → after. Left: a faint
 * spreadsheet fragment with scattered, disconnected shapes (MANUAL /
 * SCATTERED). Right: the same elements snap into one connected system around
 * the central blue node (AUTOMATED / STRUCTURED). The snap animates on scroll.
 */
export function OrderDiagram() {
  const reduce = useReducedMotion();

  const snap = (from: { x: number; y: number; r: number }): Variants => ({
    hidden: reduce
      ? { x: 0, y: 0, rotate: 0, opacity: 0.001 }
      : { x: from.x, y: from.y, rotate: from.r, opacity: 0.4 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: reduce ? 0.3 : 0.8, ease: EASE, delay: 0.25 },
    },
  });

  const line: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: reduce ? 0.2 : 0.7, ease: EASE, delay: 0.6 },
    },
  };

  const pop: Variants = {
    hidden: { scale: reduce ? 1 : 0.3, opacity: reduce ? 0.001 : 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: reduce ? 0.3 : 0.6, ease: EASE, delay: 0.45 },
    },
  };

  const fade: Variants = {
    hidden: { opacity: 0.001 },
    visible: {
      opacity: 1,
      transition: { duration: reduce ? 0.3 : 0.6, ease: EASE },
    },
  };

  return (
    <motion.svg
      viewBox="0 0 540 340"
      className="h-auto w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      role="img"
      aria-label="A manual, scattered process on the left becomes one structured, automated system on the right"
    >
      {/* ---- LEFT: MANUAL / SCATTERED ---- */}
      <motion.g variants={fade}>
        <text x="24" y="40" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={txt}>
          MANUAL
        </text>
        {/* spreadsheet fragment */}
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={24 + c * 30}
              y={60 + r * 22}
              width="26"
              height="16"
              rx="2"
              fill="none"
              stroke={lineSoft}
              strokeWidth="1"
            />
          ))
        )}
        {/* scattered, disconnected shapes */}
        <rect x="150" y="70" width="30" height="30" rx="3" fill="none" stroke={txt} strokeWidth="1.5" transform="rotate(-18 165 85)" />
        <path d="M40 210 l16 28 l-32 0 Z" fill="none" stroke={txt} strokeWidth="1.5" transform="rotate(12 40 224)" />
        <circle cx="150" cy="225" r="15" fill="none" stroke={txt} strokeWidth="1.5" />
        <text x="24" y="300" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={txt}>
          SCATTERED
        </text>
      </motion.g>

      {/* ---- ARROW ---- */}
      <motion.g variants={fade}>
        <path d="M232 170 H300" stroke={txt} strokeWidth="1.5" strokeDasharray="5 5" />
        <path d="M294 163 L302 170 L294 177" stroke={nodeBright} strokeWidth="1.8" fill="none" />
      </motion.g>

      {/* ---- RIGHT: AUTOMATED / STRUCTURED ---- */}
      <text x="516" y="40" textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={nodeBright}>
        <motion.tspan variants={fade}>AUTOMATED</motion.tspan>
      </text>

      {/* connecting lines from hub */}
      <motion.path d="M430 175 L350 95" stroke={node} strokeWidth="1.6" fill="none" variants={line} />
      <motion.path d="M430 175 L516 110" stroke={node} strokeWidth="1.6" fill="none" variants={line} />
      <motion.path d="M430 175 L360 260" stroke={node} strokeWidth="1.6" fill="none" variants={line} />
      <motion.path d="M430 175 L510 255" stroke={node} strokeWidth="1.6" fill="none" variants={line} />

      {/* central hub */}
      <motion.g variants={pop} style={{ transformOrigin: "430px 175px" }}>
        <circle cx="430" cy="175" r="16" fill={node} />
        <circle cx="430" cy="175" r="6" fill="var(--color-text-primary)" />
      </motion.g>

      {/* satellites snapping into place */}
      <motion.rect x="335" y="80" width="30" height="30" rx="3" fill="none" stroke={nodeBright} strokeWidth="1.8" variants={snap({ x: -120, y: 40, r: -30 })} />
      <motion.path d="M516 110 m-15 13 l15 -26 l15 26 Z" fill="none" stroke={nodeBright} strokeWidth="1.8" variants={snap({ x: 60, y: -50, r: 28 })} />
      <motion.circle cx="360" cy="260" r="15" fill="none" stroke={nodeBright} strokeWidth="1.8" variants={snap({ x: -90, y: 70, r: 0 })} />
      <motion.path d="M510 255 m0 -16 l16 16 l-16 16 l-16 -16 Z" fill="none" stroke={nodeBright} strokeWidth="1.8" variants={snap({ x: 70, y: 60, r: 20 })} />

      <text x="516" y="305" textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={nodeBright}>
        <motion.tspan variants={fade}>STRUCTURED</motion.tspan>
      </text>
    </motion.svg>
  );
}
