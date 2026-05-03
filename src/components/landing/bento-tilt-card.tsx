import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Stat = { label: string; value: string };

export function BentoTiltCard({
  children,
  className,
  glowClassName,
  stats,
  depthClassName = "shadow-[0_24px_48px_-16px_oklch(0.2_0.06_168/0.14)]",
}: {
  children: ReactNode;
  className?: string;
  /** Extra gradient blob behind card */
  glowClassName?: string;
  stats?: Stat[];
  depthClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  return (
    <div className="perspective-[1400px] h-full" style={{ perspective: 1400 }}>
      <motion.div
        ref={ref}
        className={cn(
          "relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card/90 backdrop-blur-md transition-shadow duration-500",
          depthClassName,
          hovered &&
            "shadow-[0_32px_64px_-20px_oklch(0.42_0.12_168/0.2),0_0_0_1px_oklch(0.55_0.12_168/0.12)]",
          className,
        )}
        style={
          reduce
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }
        }
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        whileHover={reduce ? undefined : { z: 0 }}
      >
        {glowClassName ? (
          <div
            className={cn(
              "pointer-events-none absolute -inset-px rounded-[inherit] opacity-80 transition-opacity duration-700",
              hovered ? "opacity-100" : "opacity-70",
              glowClassName,
            )}
          />
        ) : null}
        <div className="relative z-[1] h-full">{children}</div>
        <AnimatePresence>
          {hovered && stats?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 z-[2] border-t border-white/25 bg-gradient-to-t from-card via-card/95 to-transparent px-6 py-4 backdrop-blur-md"
            >
              <dl className="grid grid-cols-3 gap-2 text-center">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="mt-0.5 font-mono text-sm font-bold tabular-nums text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
