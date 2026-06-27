import type { ReactNode } from "react";

/**
 * The mono technical eyebrow used to open every section, e.g. `// 01 — SERVICES`.
 * Keeps the "engineered" feeling consistent across the page.
 */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-2 ${className}`}
      aria-hidden="true"
    >
      <span className="inline-block h-px w-6 bg-accent/60" />
      {children}
    </p>
  );
}
