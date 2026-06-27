"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Command-center HUD overlay — a quiet monospace technical layer that makes
 * the page feel like a live system: viewport corner brackets, a persistent
 * status readout, and a thin accent scroll-progress line. Purely decorative
 * (aria-hidden, pointer-events-none).
 */
export function Hud() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const bracket =
    "pointer-events-none fixed z-40 h-5 w-5 border-line/80";

  return (
    <div aria-hidden="true">
      {/* scroll progress line — sits above everything at the very top */}
      <motion.div
        className="hud-progress fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent to-accent-bright"
        style={{ scaleX: progress }}
      />

      {/* viewport corner brackets */}
      <span className={`${bracket} left-3 top-3 border-l border-t`} />
      <span className={`${bracket} right-3 top-3 border-r border-t`} />
      <span className={`${bracket} bottom-3 left-3 border-b border-l`} />
      <span className={`${bracket} bottom-3 right-3 border-b border-r`} />

      {/* status readout — bottom-left */}
      <div className="pointer-events-none fixed bottom-5 left-7 z-40 hidden flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary/70 sm:flex">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          SYS.STATUS: ONLINE
        </span>
        <span className="tabular-nums">LAT 32.4° / LON 35.3°{clock ? ` / ${clock}` : ""}</span>
      </div>
    </div>
  );
}
