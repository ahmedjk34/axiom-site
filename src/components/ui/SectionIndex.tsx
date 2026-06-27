/**
 * Margin marker `[ 0X / 08 ]` — a mono section index that makes each section
 * read as an addressable part of one system.
 */
export function SectionIndex({ n }: { n: number }) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <span
      className="pointer-events-none font-mono text-[11px] tracking-[0.18em] text-text-secondary/60"
      aria-hidden="true"
    >
      [ {pad(n)} / 08 ]
    </span>
  );
}
