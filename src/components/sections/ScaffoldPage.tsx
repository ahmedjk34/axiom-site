import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Eyebrow } from "../ui/Eyebrow";
import { SecondaryLink } from "../ui/CtaButton";
import { NodeNetwork } from "../visuals/NodeNetwork";

/**
 * Minimal branded scaffold for the secondary routes. The homepage is the
 * priority; these establish the structure and stay on-brand until built out.
 */
export function ScaffoldPage({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-[80vh] items-center overflow-hidden bg-bg-primary">
        <div className="absolute inset-0 opacity-50">
          <NodeNetwork density={0.6} intensity={0.6} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 sm:px-8">
          <div className="max-w-2xl">
            <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
            <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-text-primary text-balance">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              {intro}
            </p>
            <div className="mt-10">
              <SecondaryLink href="/">Back to overview</SecondaryLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
