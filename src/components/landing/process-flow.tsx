import { motion, useReducedMotion } from "framer-motion";
import { Handshake, MessageCircle, ShieldCheck, Target } from "lucide-react";
import { ScrollFadeIn } from "@/components/landing/motion-primitives";

const steps = [
  {
    icon: ShieldCheck,
    title: "Verify",
    body: ".edu + student ID unlock listing and messaging.",
  },
  {
    icon: Target,
    title: "Match",
    body: "Preferences in → ranked Top 5 units — no infinite scroll.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    body: "Accountable threads + optional Messenger with audit trail.",
  },
  {
    icon: Handshake,
    title: "Close",
    body: "Shared checklist through tour, lease, deposit, move-in.",
  },
];

export function ProcessFlowMap() {
  const reduce = useReducedMotion();

  return (
    <ScrollFadeIn className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-card/95 via-card to-primary-soft/25 p-8 shadow-[var(--shadow-lift)] backdrop-blur-md md:p-12">
        <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />

        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-primary">
          Visualized logic
        </p>
        <h2 className="mt-3 text-center font-sans text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          How SubletSync wires demand to a signed sublease
        </h2>

        <div className="relative mt-14 hidden md:block">
          <svg
            className="absolute left-[8%] right-[8%] top-[2.25rem] h-6 w-[84%]"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="ss-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="oklch(0.55 0.12 168)" stopOpacity="0.25" />
                <stop offset="50%" stopColor="oklch(0.52 0.14 168)" stopOpacity="1" />
                <stop offset="100%" stopColor="oklch(0.55 0.12 168)" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 6 L 1000 6"
              fill="none"
              stroke="url(#ss-flow-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="14 18"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0, opacity: 0.35 }}
              whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                pathLength: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4 },
              }}
            />
          </svg>

          <div className="relative grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-[1] flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/25 bg-card/95 text-primary shadow-lg shadow-primary/15 backdrop-blur-md">
                  <s.icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-sans text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 space-y-0 md:hidden">
          <div className="absolute bottom-3 left-[1.85rem] top-3 w-px bg-gradient-to-b from-primary/15 via-primary/45 to-primary/15" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-5 pb-10 pl-1 last:pb-0"
            >
              <div className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-card text-primary shadow-md">
                <s.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="pt-1">
                <h3 className="font-sans text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          One loop: verification → ranked discovery → accountable messaging → structured close.
        </p>
      </div>
    </ScrollFadeIn>
  );
}
