/**
 * A perspective grid floor receding toward a center horizon — gives the dark
 * canvas depth and a sense of forward direction. Pure CSS, GPU-friendly.
 */
export function PerspectiveGrid({
  className = "",
  variant = "floor",
}: {
  className?: string;
  variant?: "floor" | "runway";
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{
        height: variant === "runway" ? "70%" : "55%",
        perspective: "320px",
        perspectiveOrigin: "50% 0%",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, transparent 90%)",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, transparent 90%)",
      }}
    >
      <div
        className="absolute left-1/2 top-0 h-[300%] w-[300%] -translate-x-1/2 origin-top"
        style={{
          transform: "rotateX(74deg)",
          backgroundImage:
            "linear-gradient(rgba(59,110,245,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(59,110,245,0.16) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
