"use client";

import { useEffect, useRef } from "react";

const accent = "var(--color-accent)";
const accentBright = "var(--color-accent-bright)";
const txt = "var(--color-text-secondary)";
const lineSoft = "var(--color-line)";

type Node = { x: number; y: number; label: string; reach: number; seed: number };

const HUB = { x: 432, y: 180, reach: 5, seed: 0 };
const FUNCS: Node[] = [
  { x: 352, y: 118, label: "INTAKE", reach: 11, seed: 1.7 },
  { x: 516, y: 118, label: "AUTOMATE", reach: 11, seed: 3.1 },
  { x: 352, y: 244, label: "REPORT", reach: 11, seed: 4.6 },
  { x: 516, y: 244, label: "SCALE", reach: 11, seed: 6.0 },
];

// Left side: a tangled set of manual tools (static).
const TOOLS = [
  { x: 30, y: 64, label: "SHEETS" },
  { x: 122, y: 92, label: "EMAIL" },
  { x: 34, y: 168, label: "CHAT" },
  { x: 128, y: 198, label: "FILES" },
];
const TANGLE: [number, number][] = [
  [0, 3],
  [1, 2],
  [0, 1],
  [2, 3],
];

/**
 * Workflow clarity: the left shows a scattered set of manual tools wired
 * together by hand (tangled, static); the right shows the same work rebuilt as
 * one structured system — a central hub feeding four clear functions. The
 * structured side assembles on scroll-in, then field-follows the cursor.
 */
export function OrderDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const hubRef = useRef<SVGGElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);
  const traceRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const pts = [HUB, ...FUNCS];
    const off = pts.map(() => ({ ox: 0, oy: 0 }));
    const pointer = { x: 0, y: 0, active: false };

    let start = 0;
    let raf = 0;
    let visible = false;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const render = (now: number) => {
      if (!start) start = now;
      const p = reduce ? 1 : easeOut(Math.min((now - start) / 750, 1));

      pts.forEach((pt, i) => {
        let tox = 0;
        let toy = 0;
        if (!reduce) {
          if (finePointer && pointer.active) {
            const dx = pointer.x - pt.x;
            const dy = pointer.y - pt.y;
            const dist = Math.hypot(dx, dy) || 1;
            const strength = Math.max(0, 1 - dist / 240);
            const shift = pt.reach * strength;
            tox = (dx / dist) * shift;
            toy = (dy / dist) * shift;
          } else {
            const t = now / 1000;
            tox = Math.sin(t * 0.5 + pt.seed) * 3;
            toy = Math.cos(t * 0.45 + pt.seed) * 3;
          }
        }
        off[i].ox += (tox - off[i].ox) * 0.1;
        off[i].oy += (toy - off[i].oy) * 0.1;

        const el = i === 0 ? hubRef.current : nodeRefs.current[i - 1];
        if (el) {
          const entranceY = (1 - p) * 10;
          el.setAttribute("transform", `translate(${off[i].ox} ${off[i].oy + entranceY})`);
          el.style.opacity = String(p);
        }
      });

      const hx = HUB.x + off[0].ox;
      const hy = HUB.y + off[0].oy;
      FUNCS.forEach((n, i) => {
        const nx = n.x + off[i + 1].ox;
        const ny = n.y + off[i + 1].oy + (1 - p) * 10;
        const ln = lineRefs.current[i];
        if (ln) {
          ln.setAttribute("d", `M${hx} ${hy} L${nx} ${ny}`);
          ln.style.strokeDashoffset = String(1 - p);
        }
        const dot = traceRefs.current[i];
        if (dot) {
          const phase = ((now / 1000) * 0.4 + i * 0.27) % 1;
          dot.setAttribute("cx", String(hx + (nx - hx) * phase));
          dot.setAttribute("cy", String(hy + (ny - hy) * phase));
          dot.style.opacity = String(p * 0.95);
        }
      });

      if (!reduce) raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 560;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 360;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          start = 0;
          if (finePointer) {
            window.addEventListener("pointermove", onMove, { passive: true });
            svg.addEventListener("pointerleave", onLeave);
          }
          raf = requestAnimationFrame(render);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(svg);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const cx = (n: { x: number }) => n.x;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 560 360"
      className="h-auto w-full"
      role="img"
      aria-label="A scattered set of manual tools on the left is rebuilt as one structured automated system on the right"
    >
      {/* ---- LEFT: MANUAL / SCATTERED (static, tangled) ---- */}
      <text x="30" y="36" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={txt}>
        MANUAL
      </text>

      {/* tangled, hand-wired connectors */}
      {TANGLE.map(([a, b], i) => (
        <path
          key={`tg-${i}`}
          d={`M${TOOLS[a].x + 35} ${TOOLS[a].y + 14} L${TOOLS[b].x + 35} ${TOOLS[b].y + 14}`}
          stroke={txt}
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.5"
        />
      ))}
      {TOOLS.map((t) => (
        <g key={t.label}>
          <rect x={t.x} y={t.y} width="70" height="28" rx="4" fill="var(--color-bg-deep)" stroke={lineSoft} strokeWidth="1" />
          <text x={t.x + 35} y={t.y + 18} textAnchor="middle" fontSize="9.5" letterSpacing="1" fontFamily="var(--font-mono)" fill={txt}>
            {t.label}
          </text>
        </g>
      ))}
      <text x="30" y="252" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={txt}>
        SCATTERED
      </text>

      {/* ---- ARROW ---- */}
      <g>
        <path d="M236 176 H300" stroke={txt} strokeWidth="1.5" strokeDasharray="5 5" />
        <path d="M294 169 L302 176 L294 183" stroke={accentBright} strokeWidth="1.8" fill="none" />
        <text x="268" y="160" textAnchor="middle" fontSize="9" letterSpacing="1.5" fontFamily="var(--font-mono)" fill={accent}>
          AXIOM
        </text>
      </g>

      {/* ---- RIGHT: AUTOMATED / STRUCTURED ---- */}
      <text x="530" y="36" textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={accentBright}>
        AUTOMATED
      </text>

      {/* connecting lines (updated each frame) */}
      {FUNCS.map((_, i) => (
        <path
          key={`ln-${i}`}
          ref={(el) => {
            lineRefs.current[i] = el;
          }}
          stroke={accent}
          strokeWidth="1.6"
          fill="none"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      ))}

      {/* flowing traces */}
      {FUNCS.map((_, i) => (
        <circle
          key={`tr-${i}`}
          ref={(el) => {
            traceRefs.current[i] = el;
          }}
          r="3"
          fill={accentBright}
          style={{ opacity: 0 }}
        />
      ))}

      {/* central hub */}
      <g ref={hubRef} style={{ opacity: 0 }}>
        <circle cx={HUB.x} cy={HUB.y} r="15" fill="rgba(59,110,245,0.18)" stroke={accent} strokeWidth="1.8" />
        <circle cx={HUB.x} cy={HUB.y} r="5" fill={accent} />
        <text x={HUB.x} y={HUB.y + 34} textAnchor="middle" fontSize="9" letterSpacing="1.5" fontFamily="var(--font-mono)" fill={accentBright}>
          SYSTEM
        </text>
      </g>

      {/* function nodes */}
      {FUNCS.map((n, i) => (
        <g
          key={n.label}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          style={{ opacity: 0 }}
        >
          <rect x={cx(n) - 40} y={n.y - 14} width="80" height="28" rx="5" fill="var(--color-bg-deep)" stroke={accent} strokeWidth="1.4" />
          <text x={cx(n)} y={n.y + 4} textAnchor="middle" fontSize="9.5" letterSpacing="1" fontFamily="var(--font-mono)" fill={accentBright}>
            {n.label}
          </text>
        </g>
      ))}

      <text x="530" y="312" textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="2" fill={accentBright}>
        STRUCTURED
      </text>
    </svg>
  );
}
