/**
 * Axiom logomark rebuilt as crisp inline SVG so the central node can pulse
 * (the brand is alive). Mirrors AXIOM_LOGO_SOLO: a triangular "A" with one
 * accent-blue edge and a central node on a tripod stem.
 */
export function AxiomMark({
  className = "",
  pulse = true,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 44"
      className={className}
      role="img"
      aria-label="Axiom"
      fill="none"
    >
      {/* left edge of the A — light */}
      <path
        d="M24 4 L6 39"
        stroke="var(--color-text-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* right edge — the accent diagonal */}
      <path
        d="M24 4 L42 39"
        stroke="var(--color-accent)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* tripod legs from the node to the base */}
      <path
        d="M24 27 L10 39 M24 27 L38 39 M24 27 L24 41"
        stroke="var(--color-text-primary)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* stem up to the apex */}
      <path
        d="M24 27 L24 14"
        stroke="var(--color-text-primary)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* the central node */}
      <circle
        cx="24"
        cy="25.5"
        r="4.4"
        fill="var(--color-accent)"
        className={pulse ? "node-pulse origin-center" : ""}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
      <circle cx="24" cy="25.5" r="1.7" fill="var(--color-text-primary)" />
    </svg>
  );
}

/** Mark + wordmark lockup used in the nav and footer. */
export function Logo({
  className = "",
  pulse = true,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AxiomMark className="h-7 w-7" pulse={pulse} />
      <span
        className="font-display text-lg font-bold tracking-[0.22em] text-text-primary"
        style={{ fontFamily: "var(--font-display)" }}
      >
        AXIOM
      </span>
    </span>
  );
}
