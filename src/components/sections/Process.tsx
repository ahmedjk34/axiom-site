"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SectionIndex } from "../ui/SectionIndex";
import { PROCESS_STEPS } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const HEX = "12,2 36,2 46,24 36,46 12,46 2,24";
const LAST = PROCESS_STEPS.length - 1;

type StepState = "pending" | "active" | "completed";

function stepState(index: number, activeIndex: number): StepState {
  if (index < activeIndex) return "completed";
  if (index === activeIndex) return "active";
  return "pending";
}

function fillPercent(activeIndex: number) {
  return LAST === 0 ? 100 : (activeIndex / LAST) * 100;
}

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const clickedUntil = useRef(0);
  const reduce = useReducedMotion();
  const axisInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 35%"],
  });
  const fill = fillPercent(activeIndex);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (Date.now() < clickedUntil.current) return;
    const idx =
      progress <= 0
        ? 0
        : Math.min(LAST, Math.max(0, Math.round(progress * LAST)));
    setActiveIndex(idx);
  });

  const jumpToStep = useCallback((index: number) => {
    setActiveIndex(index);
    clickedUntil.current = Date.now() + 1200;
    cardRefs.current[index]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "nearest",
    });
  }, [reduce]);

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary py-24 sm:py-32"
      aria-labelledby="process-heading"
    >
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <Reveal>
            <Eyebrow>{"// HOW WE WORK"}</Eyebrow>
          </Reveal>
          <SectionIndex n={6} />
        </div>
        <Reveal delay={0.05}>
          <h2
            id="process-heading"
            className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.01em] text-text-primary"
          >
            From problem to working system.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary">
            One sequence, start to finish — each stage produces something
            concrete that feeds the next.
          </p>
        </Reveal>

        <div ref={sectionRef} className="mt-12">
          <PipelineHud axisInView={axisInView} fill={fill} activeIndex={activeIndex} onNodeClick={jumpToStep} />

          <ol
            className="flex flex-col gap-6 md:grid md:grid-cols-5 md:items-stretch md:gap-5"
            aria-label="Process steps"
          >
            {PROCESS_STEPS.map((step, i) => (
              <StepCard
                key={step.n}
                step={step}
                index={i}
                state={stepState(i, activeIndex)}
                cardRef={(el) => {
                  cardRefs.current[i] = el;
                }}
                onActivate={() => jumpToStep(i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PipelineHud({
  axisInView,
  fill,
  activeIndex,
  onNodeClick,
}: {
  axisInView: boolean;
  fill: number;
  activeIndex: number;
  onNodeClick: (index: number) => void;
}) {
  return (
    <div className="mb-7 hidden md:block">
      {/* Axis + HUD */}
      <div className="mb-5 flex items-center gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="shrink-0 text-text-secondary">Problem</span>
          <div className="relative h-px min-w-0 flex-1 bg-accent-dim/40">
            <motion.div
              className="absolute inset-y-0 left-0 border-t border-dashed border-text-secondary/45"
              initial={{ width: "0%" }}
              animate={{ width: axisInView ? "100%" : "0%" }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          </div>
          <span className="shrink-0 text-accent">Working system</span>
        </div>
        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Pipeline: active
        </span>
      </div>

      {/* Rail */}
      <div className="relative h-4" role="presentation" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-accent-dim" />
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent"
          animate={{ width: `${fill}%` }}
          transition={{ duration: 0.55, ease: EASE }}
        />
        {fill > 0 && (
          <div
            className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 overflow-visible"
            style={{ width: `${fill}%` }}
          >
            <span className="pipeline-packet absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright shadow-[0_0_10px_3px_rgba(91,140,255,0.65)]" />
          </div>
        )}
        {PROCESS_STEPS.map((step, i) => {
          const state = stepState(i, activeIndex);
          const left = LAST === 0 ? "0%" : `${(i / LAST) * 100}%`;
          return (
            <button
              key={step.n}
              type="button"
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-offset-4"
              style={{ left }}
              onClick={() => onNodeClick(i)}
              aria-label={`Go to step ${step.n}: ${step.name}`}
            >
              <RailNode state={state} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RailNode({ state }: { state: StepState }) {
  if (state === "active") {
    return (
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent shadow-[0_0_0_6px_rgba(59,110,245,0.5)]" />
      </span>
    );
  }
  if (state === "completed") {
    return <span className="block h-2 w-2 rounded-full bg-accent/80" />;
  }
  return <span className="block h-2 w-2 rounded-full bg-accent-dim" />;
}

type Step = (typeof PROCESS_STEPS)[number];

function HexBadge({
  n,
  state,
  onClick,
}: {
  n: string;
  state: StepState;
  onClick: () => void;
}) {
  const active = state === "active";
  const completed = state === "completed";

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative h-[48px] w-[48px] shrink-0 rounded-sm focus-visible:outline-offset-4",
        active ? "shadow-[0_0_0_6px_rgba(59,110,245,0.5)]" : "",
      ].join(" ")}
      aria-label={`Step ${n}`}
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden="true">
        <polygon
          points={HEX}
          fill={active ? "var(--color-accent)" : completed ? "rgba(59,110,245,0.35)" : "var(--color-bg-deep)"}
          stroke={active ? "var(--color-accent-bright)" : completed ? "rgba(59,110,245,0.5)" : "var(--color-accent-dim)"}
          strokeWidth="1.5"
        />
      </svg>
      {completed ? (
        <svg
          viewBox="0 0 16 16"
          className="absolute inset-0 m-auto h-4 w-4 text-accent-bright"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.5 8.2l2.8 2.8 6.2-6.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <span
          className={[
            "absolute inset-0 flex items-center justify-center font-mono text-sm font-medium",
            active ? "text-text-primary" : "text-accent-bright/45",
          ].join(" ")}
        >
          {n}
        </span>
      )}
    </button>
  );
}

function StepCard({
  step,
  index,
  state,
  cardRef,
  onActivate,
}: {
  step: Step;
  index: number;
  state: StepState;
  cardRef: (el: HTMLLIElement | null) => void;
  onActivate: () => void;
}) {
  const active = state === "active";
  const completed = state === "completed";
  const cardInViewRef = useRef<HTMLLIElement | null>(null);
  const seen = useInView(cardInViewRef, { once: true, amount: 0.45 });
  const targetOpacity = state === "pending" ? 0.55 : completed ? 0.8 : 1;

  return (
    <motion.li
      ref={(el) => {
        cardInViewRef.current = el;
        cardRef(el);
      }}
      className={[
        "panel relative flex h-full flex-col rounded-[6px] p-5 transition-[border-color,filter,box-shadow] duration-500",
        active ? "blade-tr z-[1] border-accent brightness-[1.04]" : "",
        completed ? "border-[rgba(59,110,245,0.25)]" : "",
        state === "pending" ? "border-[rgba(255,255,255,0.07)]" : "",
      ].join(" ")}
      style={active ? ({ "--blade": "10px" } as React.CSSProperties) : undefined}
      initial={{ opacity: 0, y: 18 }}
      animate={seen ? { opacity: targetOpacity, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.45, ease: EASE, delay: seen ? 0 : index * 0.06 }}
      data-state={state}
    >
      <HexBadge n={step.n} state={state} onClick={onActivate} />

      <h3
        className={[
          "mt-4 font-display text-lg tracking-tight text-text-primary",
          active ? "font-bold" : "font-normal",
        ].join(" ")}
      >
        {step.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-snug text-text-secondary">{step.body}</p>

      <div
        className={[
          "relative mt-4 border-t border-line",
          active ? "border-t-line" : "",
        ].join(" ")}
      >
        <div
          className={[
            "border-l-[3px] bg-[rgba(59,110,245,0.06)] px-3.5 py-2.5",
            active ? "border-l-accent" : "border-l-accent/35",
          ].join(" ")}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary">
            Output
          </p>
          <p
            className={[
              "mt-1 text-sm font-medium uppercase leading-snug tracking-wide",
              active ? "text-accent" : "text-text-primary",
            ].join(" ")}
          >
            {step.produces}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
