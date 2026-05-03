import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";

export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>({ threshold: 0.06 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const show = reduceMotion || visible;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]",
        show ? "translate-y-0 opacity-100 blur-0" : "translate-y-12 opacity-0 blur-[2px]",
        reduceMotion && "duration-0",
        className,
      )}
      style={{ transitionDelay: show && !reduceMotion ? `${delayMs}ms` : undefined }}
    >
      {children}
    </div>
  );
}
