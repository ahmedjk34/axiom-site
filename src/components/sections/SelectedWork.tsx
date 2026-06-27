"use client";

import { useRef } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { ProjectDiagram } from "../visuals/ProjectDiagram";
import { PROJECTS, type Project } from "@/lib/content";

export function SelectedWork() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 460);
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-16 overflow-hidden bg-bg-alt py-24 sm:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow className="mb-6">{"// PROOF OF EXECUTION"}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="work-heading"
                className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-tight text-text-primary text-balance"
              >
                Selected systems &amp; digital products.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
                Platforms built around operational complexity — where business
                rules, payments, user roles, and workflows all need to work
                together. We don&apos;t start with code. We start with how the
                business actually works.
              </p>
            </Reveal>
          </div>

          {/* arrows (desktop) */}
          <div className="hidden gap-2 md:flex">
            <ScrollArrow direction="left" onClick={() => scrollBy(-1)} />
            <ScrollArrow direction="right" onClick={() => scrollBy(1)} />
          </div>
        </div>
      </div>

      {/* horizontal scroller (md+) / stacked (mobile) */}
      <div
        ref={scrollerRef}
        className="mt-12 flex snap-x snap-mandatory flex-col gap-5 overflow-x-auto px-5 pb-4 sm:px-8 md:flex-row md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROJECTS.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ScrollArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous projects" : "Next projects"}
      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-glass-border bg-glass text-text-secondary transition-colors duration-200 hover:border-accent hover:text-text-primary"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <Reveal
      as="div"
      className="w-[86vw] shrink-0 snap-start sm:w-[80vw] md:w-[440px]"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[12px] border border-glass-border bg-glass transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/70">
        {/* visual preview with parallax depth */}
        <div className="relative h-52 overflow-hidden bg-bg-deep">
          <div className="dot-pattern absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <ProjectDiagram type={project.diagram} />
          </div>

          {/* View Project overlay */}
          <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-bg-deep/90 via-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-text-primary">
              View Project
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* service-colored tag bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-accent to-accent-bright/30" />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {project.tag}
            </span>
            {project.rtl && (
              <span className="rounded-full border border-glass-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary">
                Arabic-first · RTL
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-text-primary">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {project.line}
          </p>

          {/* capability tags */}
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-[6px] border border-glass-border bg-bg-deep/60 px-2.5 py-1 text-[11px] text-text-secondary"
              >
                {t}
              </li>
            ))}
          </ul>

          {/* owner quote slot (present for all; populated when available) */}
          {project.quote && (
            <figure className="mt-auto pt-6">
              <blockquote className="border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-text-secondary/90">
                {project.quote}
              </blockquote>
              {project.quoteAttribution && (
                <figcaption className="mt-3 pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                  {project.quoteAttribution}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </article>
    </Reveal>
  );
}
