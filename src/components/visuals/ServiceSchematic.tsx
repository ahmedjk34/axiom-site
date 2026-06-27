import type { Service } from "@/lib/content";

/**
 * Per-service abstract schematic that traces itself on card hover. Each path
 * uses normalized pathLength + a stroke-dashoffset transition so the line
 * "draws" without JS. Stagger is applied via per-path transition-delay.
 */

type Props = { type: Service["schematic"]; className?: string };

function Line({
  d,
  i = 0,
  width = 1.5,
  accent = true,
}: {
  d: string;
  i?: number;
  width?: number;
  accent?: boolean;
}) {
  // The faint substrate (accent=false) stays visible; accent lines trace in.
  if (!accent) {
    return (
      <path
        d={d}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }
  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke="var(--color-accent-bright)"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="schematic-line"
      style={{ transitionDelay: `${i * 90}ms` }}
    />
  );
}

function Dot({ cx, cy, i = 0 }: { cx: number; cy: number; i?: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={3}
      fill="var(--color-accent)"
      className="schematic-dot"
      style={{ transitionDelay: `${i * 90 + 200}ms` }}
    />
  );
}

export function ServiceSchematic({ type, className = "" }: Props) {
  const common = "h-full w-full";
  return (
    <svg
      viewBox="0 0 200 120"
      className={`${common} ${className}`}
      aria-hidden="true"
      fill="none"
    >
      {type === "framework" && (
        <>
          {/* static substrate */}
          <Line d="M20 100 H180" accent={false} />
          {/* structural framework being built up */}
          <Line d="M40 100 V40 H100 V100" i={0} />
          <Line d="M100 100 V60 H160 V100" i={1} />
          <Line d="M40 40 H100" i={2} />
          <Line d="M70 100 V40" i={3} width={1} />
          <Line d="M130 100 V60" i={3} width={1} />
          <Dot cx={40} cy={40} i={0} />
          <Dot cx={100} cy={60} i={1} />
          <Dot cx={160} cy={60} i={2} />
        </>
      )}

      {type === "flow" && (
        <>
          <Line d="M20 60 H180" accent={false} />
          {/* pipeline with stages */}
          <Line d="M30 60 H70" i={0} width={2} />
          <Line d="M70 60 L90 40 H130" i={1} width={2} />
          <Line d="M130 40 L150 60 H180" i={2} width={2} />
          <Line d="M90 40 L90 80 H140" i={3} width={1} />
          <Dot cx={30} cy={60} i={0} />
          <Dot cx={90} cy={40} i={1} />
          <Dot cx={140} cy={80} i={2} />
          <Dot cx={180} cy={60} i={3} />
        </>
      )}

      {type === "neural" && (
        <>
          {/* three-layer node pattern */}
          <Line d="M50 30 L100 25 M50 30 L100 60 M50 90 L100 60 M50 90 L100 95" i={0} width={1} />
          <Line d="M100 25 L150 45 M100 60 L150 45 M100 60 L150 80 M100 95 L150 80" i={1} width={1} />
          <Dot cx={50} cy={30} i={0} />
          <Dot cx={50} cy={90} i={0} />
          <Dot cx={100} cy={25} i={1} />
          <Dot cx={100} cy={60} i={1} />
          <Dot cx={100} cy={95} i={1} />
          <Dot cx={150} cy={45} i={2} />
          <Dot cx={150} cy={80} i={2} />
        </>
      )}

      {type === "grid" && (
        <>
          {/* expanding grid */}
          <Line d="M40 80 H70 V50" i={0} />
          <Line d="M70 50 H110 V90" i={1} />
          <Line d="M110 50 H150 V90 M150 50 V30 H180" i={2} />
          <Line d="M40 80 V40 H80" i={3} width={1} />
          <Dot cx={70} cy={50} i={0} />
          <Dot cx={110} cy={50} i={1} />
          <Dot cx={150} cy={30} i={2} />
          <Dot cx={180} cy={30} i={3} />
        </>
      )}
    </svg>
  );
}
