import type { Project } from "@/lib/content";

/**
 * Abstract, platform-specific system diagrams used as proof-of-execution
 * previews (never generic placeholders). Each domain gets a distinct shape
 * language: commerce reads as a convergent operations hub, procurement reads
 * as a directed left→right settlement pipeline.
 */

const node = "var(--color-accent)";
const nodeBright = "var(--color-accent-bright)";
const lineSoft = "var(--color-line)";
const txt = "var(--color-text-secondary)";

function Cell(props: React.SVGProps<SVGRectElement>) {
  return (
    <rect width="22" height="14" rx="2" fill="none" stroke={lineSoft} strokeWidth="1" {...props} />
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
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 3 }).map((_, c) => (
              <Cell key={`${r}-${c}`} x={28 + c * 28} y={50 + r * 22} />
            ))
          )}
          <path d="M150 110 H210" stroke={txt} strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M204 104 L212 110 L204 116" stroke={txt} strokeWidth="1.5" fill="none" />
          <circle cx="300" cy="110" r="14" fill={node} />
          <circle cx="300" cy="110" r="5" fill="var(--color-text-primary)" />
          {[[250, 60], [350, 60], [250, 160], [350, 160], [368, 110]].map(([x, y], i) => (
            <g key={i}>
              <path d={`M300 110 L${x} ${y}`} stroke={node} strokeWidth="1.8" />
              <circle cx={x} cy={y} r="7" fill={nodeBright} />
            </g>
          ))}
        </>
      )}

      {/* MOTASQ — convergent commerce operations hub */}
      {type === "commerce" && (
        <>
          {/* role portals converging on the hub */}
          {[
            { x: 36, y: 30, label: "TRADERS" },
            { x: 286, y: 30, label: "STAFF" },
            { x: 36, y: 158, label: "CUSTOMERS" },
            { x: 286, y: 158, label: "PAYMENTS" },
          ].map((p, i) => {
            const cx = p.x + 39;
            const cy = p.y + 16;
            return (
              <g key={i}>
                <path d={`M${cx} ${cy} L200 110`} stroke={node} strokeWidth="1.5" opacity="0.55" />
                <circle cx={(cx + 200) / 2} cy={(cy + 110) / 2} r="2.5" fill={nodeBright} />
                <rect x={p.x} y={p.y} width="78" height="32" rx="6" fill="var(--color-bg-deep)" stroke={lineSoft} strokeWidth="1" />
                <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" letterSpacing="1" fontFamily="var(--font-mono)" fill={txt}>
                  {p.label}
                </text>
              </g>
            );
          })}
          {/* central import-cycle hub */}
          <rect x="150" y="88" width="100" height="44" rx="8" fill="rgba(59,110,245,0.12)" stroke={node} strokeWidth="1.8" />
          <circle cx="200" cy="110" r="6" fill={node} />
          <text x="200" y="146" textAnchor="middle" fontSize="9" letterSpacing="1.5" fontFamily="var(--font-mono)" fill={nodeBright}>
            IMPORT CYCLE
          </text>
        </>
      )}

      {/* ADSTATION — directed procurement pipeline */}
      {type === "procurement" && (
        <>
          {[
            { x: 18, label: "RFQ" },
            { x: 96, label: "OFFERS" },
            { x: 174, label: "CONTRACT" },
            { x: 252, label: "FUNDING" },
            { x: 330, label: "SETTLE" },
          ].map((s, i, arr) => {
            const active = i >= 2;
            return (
              <g key={i}>
                <rect
                  x={s.x}
                  y="92"
                  width="52"
                  height="40"
                  rx="6"
                  fill={i === arr.length - 1 ? "rgba(59,110,245,0.14)" : "var(--color-bg-deep)"}
                  stroke={active ? node : lineSoft}
                  strokeWidth={active ? 1.7 : 1}
                />
                <circle cx={s.x + 26} cy="112" r="4" fill={active ? node : txt} />
                <text x={s.x + 26} y="150" textAnchor="middle" fontSize="8.5" letterSpacing="0.5" fontFamily="var(--font-mono)" fill={active ? nodeBright : txt}>
                  {s.label}
                </text>
                {i < arr.length - 1 && (
                  <>
                    <path d={`M${s.x + 52} 112 H${arr[i + 1].x}`} stroke={node} strokeWidth="1.8" />
                    <path d={`M${arr[i + 1].x - 6} 108 L${arr[i + 1].x} 112 L${arr[i + 1].x - 6} 116`} stroke={node} strokeWidth="1.6" fill="none" />
                  </>
                )}
              </g>
            );
          })}
          {/* dispute branch */}
          <path d="M200 92 V62 H300 V92" stroke={txt} strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
          <text x="250" y="56" textAnchor="middle" fontSize="8.5" letterSpacing="0.5" fontFamily="var(--font-mono)" fill={txt}>
            DISPUTES
          </text>
        </>
      )}
    </svg>
  );
}
