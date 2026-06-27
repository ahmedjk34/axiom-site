import { Logo } from "../ui/Logo";
import { NAV_LINKS, ONE_LINE_TRUTH, CONTACT_EMAIL } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-deep">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo pulse={false} />
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">
              {ONE_LINE_TRUTH}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/70">
                Navigate
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary/70">
                Contact
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-4 block text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary/60">
            {"// AXIOM"}
          </span>
          <span className="text-xs text-text-secondary/60">
            © {new Date().getFullYear()} Axiom. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
