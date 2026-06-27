"use client";

import { useRef } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SectionIndex } from "../ui/SectionIndex";
import { ProjectDiagram } from "../visuals/ProjectDiagram";
import { PROJECTS, type Project } from "@/lib/content";

export function SelectedWork() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 480);
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-24 overflow-hidden bg-bg-alt py-24 sm:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <Reveal>
            <Eyebrow>{"// PROOF OF EXECUTION"}</Eyebrow>
          </Reveal>
          <SectionIndex n={5} />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal delay={0.05}>
              <h2
                id="work-heading"
                className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.01em] text-text-primary text-balance"
              >
                Selected systems &amp; digital products.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
                Platforms built around operational complexity — where business
                rules, payments, user roles, and workflows all need to work
                together. We start with how the business actually works.
              </p>
            </Reveal>
          </div>

          <div className="hidden gap-2 md:flex">
            <ScrollArrow direction="left" onClick={() => scrollBy(-1)} />
            <ScrollArrow direction="right" onClick={() => scrollBy(1)} />
          </div>
        </div>
      </div>

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
      className="panel panel-hover flex h-11 w-11 items-center justify-center rounded-[8px] text-text-secondary hover:text-text-primary"
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
      className="w-[86vw] shrink-0 snap-start sm:w-[78vw] md:w-[460px]"
    >
      <article className="panel panel-hover group relative flex h-full flex-col overflow-hidden rounded-[8px]">
        {/* blade accent (brightens on hover) */}
        <span className="pointer-events-none absolute right-0 top-0 z-10 h-0 w-0 border-l-[22px] border-t-[22px] border-l-transparent border-t-accent opacity-30 transition-opacity duration-300 group-hover:opacity-100" />

        {/* larger, bolder preview */}
        <div className="relative h-60 overflow-hidden border-b border-glass-border bg-bg-deep">
          <div className="dot-pattern absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
            <ProjectDiagram type={project.diagram} />
          </div>
          <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-bg-deep/90 via-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-text-primary">
              View Project
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-text-primary">
            {project.name}
          </h3>
          <p className="mt-2 font-display text-[15px] font-medium leading-snug text-text-primary">
            {project.headline}
          </p>
          {project.summary && (
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {project.summary}
            </p>
          )}

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

          {project.quote && (
            <figure className="mt-auto pt-6">
              <blockquote className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-text-secondary/90">
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
