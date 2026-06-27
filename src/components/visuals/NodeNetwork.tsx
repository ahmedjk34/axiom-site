"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
};

type Trace = {
  a: number;
  b: number;
  t: number;
  speed: number;
};

type Props = {
  /** Density multiplier. Lower = sparser. */
  density?: number;
  /** React gently to the cursor (hero only). */
  interactive?: boolean;
  /** Overall opacity of the layer. */
  intensity?: number;
  className?: string;
};

/**
 * The signature node network: a sparse, slow, living mesh of connected nodes
 * with light traces traveling point-to-point. Mirrors the Axiom logomark's
 * central node. Canvas-based, DPR-aware, capped, rAF-throttled, and paused
 * when offscreen. Renders a single static frame under reduced-motion.
 */
export function NodeNetwork({
  density = 1,
  interactive = false,
  intensity = 1,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let traces: Trace[] = [];
    let raf = 0;
    let running = false;
    const linkDist = 185;
    const pointer = { x: -9999, y: -9999, active: false };

    const buildNodes = () => {
      // Cap node count; scale with area. Denser + more alive than before.
      const target = Math.round(
        Math.min(64, Math.max(18, (width * height) / 28000) * density)
      );
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1.3 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));
      traces = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const spawnTrace = () => {
      if (nodes.length < 2 || traces.length > 9) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      // only connect reasonably close nodes so the trace reads as a link
      const dx = nodes[a].x - nodes[b].x;
      const dy = nodes[a].y - nodes[b].y;
      if (Math.hypot(dx, dy) > linkDist * 1.6) return;
      traces.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.016 });
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // emit light traces frequently so the field reads as alive
      if (frame % 18 === 0) spawnTrace();

      // update + draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // cursor field — a clearly felt disturbance (repulsion) near the pointer
        if (interactive && pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 190 && d > 0.01) {
            const f = (1 - d / 190) * 1.4;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }

        // wrap softly at edges
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const f = 1 - dist / linkDist;
            // brighter links that shift toward blue as nodes get closer
            const alpha = f * 0.3 * intensity;
            ctx.strokeStyle = `rgba(${91 + (1 - f) * 47}, ${140 + (1 - f) * 15}, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // light traces traveling along links
      traces = traces.filter((tr) => tr.t <= 1);
      for (const tr of traces) {
        tr.t += tr.speed;
        const a = nodes[tr.a];
        const b = nodes[tr.b];
        if (!a || !b) continue;
        const px = a.x + (b.x - a.x) * tr.t;
        const py = a.y + (b.y - a.y) * tr.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, `rgba(91, 140, 255, ${0.9 * intensity})`);
        g.addColorStop(1, "rgba(91, 140, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes with faint pulse
      for (const n of nodes) {
        n.phase += 0.02;
        const pulse = 0.5 + 0.5 * Math.sin(n.phase);
        ctx.fillStyle = `rgba(91, 140, 255, ${(0.35 + pulse * 0.4) * intensity})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        // soft glow halo
        const halo = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.r * 4
        );
        halo.addColorStop(0, `rgba(59, 110, 245, ${0.1 * pulse * intensity})`);
        halo.addColorStop(1, "rgba(59, 110, 245, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduce) {
      // single static frame — sparse, calm, no animation loop
      draw();
      cancelAnimationFrame(raf);
    } else {
      start();
    }

    // pause when offscreen to save cycles
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    if (interactive && !reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, interactive, intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
