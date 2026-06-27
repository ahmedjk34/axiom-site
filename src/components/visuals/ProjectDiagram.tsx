import type { Project } from "@/lib/content";

/**
 * Abstract, platform-specific system diagrams used as proof-of-execution
 * previews (never generic placeholders). Rendered in the Axiom palette.
 */

const node = "var(--color-accent)";
const nodeBright = "var(--color-accent-bright)";
const lineSoft = "var(--color-line)";
const txt = "var(--color-text-secondary)";

function Cell(props: React.SVGProps<SVGRectElement>) {
  return (
    <rect
      width="22"
      height="14"
      rx="2"
      fill="none"
      stroke={lineSoft}
      strokeWidth="1"
      {...props}
    />
  );
}

export function ProjectDiagram({ type }: { type: Project["diagram"] }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {type === "transformation" && (
        <>
          {/* messy spreadsheet grid (left) */}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 3 }).map((_, c) => (
              <Cell key={`${r}-${c}`} x={28 + c * 28} y={50 + r * 22} />
            ))
          )}
          {/* arrow */}
          <path
            d="M150 110 H210"
            stroke={txt}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M204 104 L212 110 L204 116"
            stroke={txt}
            strokeWidth="1.5"
            fill="none"
          />
          {/* structured platform (right) */}
          <circle cx="300" cy="110" r="14" fill={node} />
          <circle cx="300" cy="110" r="5" fill="var(--color-text-primary)" />
          {[
            [250, 60],
            [350, 60],
            [250, 160],
            [350, 160],
            [368, 110],
          ].map(([x, y], i) => (
            <g key={i}>
              <path
                d={`M300 110 L${x} ${y}`}
                stroke={node}
                strokeWidth="1.8"
              />
              <circle cx={x} cy={y} r="7" fill={nodeBright} />
            </g>
          ))}
        </>
      )}

      {type === "commerce" && (
        <>
          {/* central operating hub */}
          <rect
            x="160"
            y="92"
            width="80"
            height="36"
            rx="8"
            fill="none"
            stroke={node}
            strokeWidth="1.5"
          />
          <circle cx="200" cy="110" r="5" fill={node} />
          {/* role portals around hub */}
          {[
            { x: 60, y: 40, label: "Traders" },
            { x: 300, y: 40, label: "Staff" },
            { x: 60, y: 165, label: "Customers" },
            { x: 300, y: 165, label: "Payments" },
          ].map((p, i) => (
            <g key={i}>
              <rect
                x={p.x}
                y={p.y}
                width="74"
                height="30"
                rx="6"
                fill="none"
                stroke={lineSoft}
                strokeWidth="1"
              />
              <text
                x={p.x + 37}
                y={p.y + 19}
                textAnchor="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill={txt}
              >
                {p.label}
              </text>
              <path
                d={`M${p.x + 37} ${p.y < 110 ? p.y + 30 : p.y} L200 110`}
                stroke={node}
                strokeWidth="1.5"
                opacity="0.85"
              />
            </g>
          ))}
          {/* installment ticks */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={172 + i * 20}
              y="150"
              width="14"
              height="6"
              rx="2"
              fill={nodeBright}
              opacity={0.8 - i * 0.2}
            />
          ))}
        </>
      )}

      {type === "procurement" && (
        <>
          {/* RFQ -> settlement pipeline */}
          {[
            { x: 24, label: "RFQ" },
            { x: 104, label: "Offers" },
            { x: 184, label: "Contract" },
            { x: 264, label: "Funding" },
            { x: 344, label: "Settle" },
          ].map((s, i, arr) => (
            <g key={i}>
              <rect
                x={s.x}
                y="88"
                width="48"
                height="44"
                rx="6"
                fill="none"
                stroke={i === arr.length - 1 ? node : lineSoft}
                strokeWidth={i === arr.length - 1 ? 1.6 : 1}
              />
              <circle cx={s.x + 24} cy="110" r="4" fill={i < 2 ? txt : node} />
              <text
                x={s.x + 24}
                y="150"
                textAnchor="middle"
                fontSize="9"
                fontFamily="var(--font-mono)"
                fill={txt}
              >
                {s.label}
              </text>
              {i < arr.length - 1 && (
                <path
                  d={`M${s.x + 48} 110 H${arr[i + 1].x}`}
                  stroke={node}
                  strokeWidth="1.8"
                />
              )}
            </g>
          ))}
          {/* dispute branch */}
          <path
            d="M208 88 V56 H300 V88"
            stroke={txt}
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />
          <text
            x="254"
            y="50"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill={txt}
          >
            Disputes
          </text>
        </>
      )}
    </svg>
  );
}
