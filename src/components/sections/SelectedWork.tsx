import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../ui/Reveal";
import { SectionIndex } from "../ui/SectionIndex";
import { ProjectDiagram } from "../visuals/ProjectDiagram";
import { PROJECTS, type Project } from "@/lib/content";

const DIAGRAM_CAPTION: Record<Project["diagram"], string> = {
  transformation: "Platform transformation",
  commerce: "Commerce operations hub",
  procurement: "Procurement pipeline",
};

export function SelectedWork() {
  // Prospect Engine lives in the testimonial above — Work features the two
  // distinct platforms.
  const projects = PROJECTS.filter((p) => p.id !== "prospect-engine");

  return (
    <section
      id="work"
      className="relative scroll-mt-24 overflow-hidden bg-bg-alt py-24 sm:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-5 flex items-center justify-between">
          <Reveal>
            <Eyebrow>{"// PROOF OF EXECUTION"}</Eyebrow>
          </Reveal>
          <SectionIndex n={5} />
        </div>
        <Reveal delay={0.05}>
          <h2
            id="work-heading"
            className="max-w-3xl font-display text-[clamp(2.1rem,4.6vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.01em] text-text-primary text-balance"
          >
            Selected systems &amp; digital products.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
            Platforms built around operational complexity — where business
            rules, payments, user roles, and workflows all need to work
            together.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 flex flex-col">
        {projects.map((project, i) => (
          <FeatureRow
            key={project.id}
            project={project}
            index={i + 1}
            flip={i % 2 === 1}
            showDivider={i > 0}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({
  project,
  index,
  flip,
  showDivider,
}: {
  project: Project;
  index: number;
  flip: boolean;
  showDivider: boolean;
}) {
  return (
    <div className="relative">
      {showDivider && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* thin diagonal blade divider between chapters */}
          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            style={{ transform: "skewY(-0.6deg)" }}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:py-24">
        {/* VISUAL */}
        <Reveal
          as="div"
          direction="up"
          className={`lg:col-span-7 ${flip ? "lg:order-2" : "lg:order-1"}`}
        >
          <a
            href="/work"
            className="group relative block overflow-hidden rounded-[8px]"
            aria-label={`${project.name} — view project`}
          >
            <div className="panel panel-hover blade-br relative flex h-[300px] items-center justify-center overflow-hidden p-8 sm:h-[380px]">
              <div className="dot-pattern absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary/70">
                {`// ${DIAGRAM_CAPTION[project.diagram]}`}
              </div>
              <div className="relative h-full w-full max-w-[520px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                <ProjectDiagram type={project.diagram} />
              </div>
              <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View Project
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        </Reveal>

        {/* STORY */}
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : "lg:order-2"}`}>
          <Reveal direction="up">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {`WORK / 0${index}`}
            </p>
            <h3 className="mt-4 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.01em] text-text-primary">
              {project.name}
            </h3>
            <p className="mt-4 font-display text-lg font-medium leading-snug text-text-primary">
              {project.headline}
            </p>
            {project.summary && (
              <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                {project.summary}
              </p>
            )}

            <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">
              {project.tags.slice(0, 4).map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 bg-accent" aria-hidden="true" />
                  {t}
                </li>
              ))}
              {project.rtl && (
                <li className="rounded-full border border-glass-border px-2.5 py-0.5 normal-case tracking-[0.12em] text-text-secondary">
                  Arabic-first · RTL
                </li>
              )}
            </ul>

            {project.quote && (
              <figure className="mt-8 border-t border-line pt-6">
                <blockquote className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-text-primary/90">
                  {project.quote}
                </blockquote>
                {project.quoteAttribution && (
                  <figcaption className="mt-3 pl-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                    {project.quoteAttribution}
                  </figcaption>
                )}
              </figure>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
