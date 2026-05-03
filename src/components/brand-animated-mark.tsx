import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Compact animated mark (map-pin + sync arc) placed beside the SubletSync wordmark. */
export function BrandAnimatedMark({ className }: { className?: string }) {
  const gradId = useId().replace(/:/g, "");

  return (
    <span
      className={cn("relative inline-flex shrink-0", className)}
      aria-hidden
    >
      <motion.span
        className="pointer-events-none absolute -inset-0.5 rounded-xl bg-primary/25"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.svg
        viewBox="0 0 32 32"
        className="relative h-full w-full text-primary drop-shadow-[0_2px_8px_oklch(0.55_0.14_160/0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient
            id={`brandPinGrad-${gradId}`}
            x1="6"
            y1="4"
            x2="26"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="16"
          cy="11"
          r="3.2"
          stroke={`url(#brandPinGrad-${gradId})`}
          strokeWidth="1.6"
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M16 14.2c-4.2 0-7.4 3.1-7.4 6.4 0 2.8 2.4 5.2 7.4 9.8 5-4.6 7.4-7 7.4-9.8 0-3.3-3.2-6.4-7.4-6.4z"
          stroke={`url(#brandPinGrad-${gradId})`}
          strokeWidth="1.65"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <motion.path
          d="M24.5 22.5a6.2 6.2 0 0 0-8.6-8.6"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          opacity="0.55"
          animate={{ opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </span>
  );
}
