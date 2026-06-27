"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";

type PrimaryProps = {
  href: string;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
  ariaLabel?: string;
};

/**
 * Primary CTA — animated border trace, navy→blue gradient fill on hover, and a
 * magnetic pull toward the cursor within ~80px. The signature action element.
 */
export function PrimaryCta({
  href,
  children,
  size = "md",
  className = "",
  ariaLabel,
}: PrimaryProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const reach = 80 + Math.max(rect.width, rect.height) / 2;
        if (Math.hypot(dx, dy) < reach) {
          x.set(dx * 0.3);
          y.set(dy * 0.45);
        } else {
          x.set(0);
          y.set(0);
        }
      });
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, x, y]);

  const pad =
    size === "xl"
      ? "px-11 py-5 text-lg"
      : size === "lg"
        ? "px-8 py-4 text-base"
        : "px-6 py-3 text-sm";

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      style={reduce ? undefined : { x: sx, y: sy }}
      className={`cta-primary group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[8px] font-semibold tracking-tight will-change-transform hover:-translate-y-0.5 ${pad} ${className}`}
    >
      {/* Animated perimeter light-trace — bright highlight over the fill */}
      <svg
        className="pointer-events-none absolute inset-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)]"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <rect
          className="cta-trace-line"
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="7"
          pathLength={200}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      <span className="relative flex items-center gap-2">{children}</span>
      <Arrow />
    </motion.a>
  );
}

function Arrow() {
  return (
    <svg
      className="relative h-4 w-4 -translate-x-0.5 opacity-80 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Secondary text link — quieter, with a sliding arrow. */
export function SecondaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary ${className}`}
    >
      {children}
      <svg
        className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
