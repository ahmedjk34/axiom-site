"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 28;

function offsetFor(dir: Direction) {
  switch (dir) {
    case "up":
      return { y: OFFSET };
    case "down":
      return { y: -OFFSET };
    case "left":
      return { x: OFFSET };
    case "right":
      return { x: -OFFSET };
    default:
      return {};
  }
}

type RevealProps = {
  children: ReactNode;
  /** Direction the content travels in from. */
  direction?: Direction;
  delay?: number;
  /** Stagger children that are themselves <Reveal.Item>. */
  stagger?: boolean;
  className?: string;
  as?: "div" | "section" | "ul" | "li" | "span";
  amount?: number;
};

/**
 * Scroll-triggered reveal. Fires once, never blocks reading, and collapses
 * to a simple instant render when the user prefers reduced motion.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  stagger = false,
  className,
  as = "div",
  amount = 0.3,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offsetFor(direction) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0.2 : 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(stagger ? { staggerChildren: 0.09, delayChildren: delay } : {}),
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/** A child unit inside a staggered <Reveal stagger>. */
export function RevealItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, ...offsetFor(direction) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
