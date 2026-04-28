import { useEffect, useState } from "react";

const STEPS = [
  {
    t: "Verify your UTD email",
    d: "Sign in with your @utdallas.edu email. We send a one-time link — no password to remember, and we never share your address.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
      </svg>
    ),
  },
  {
    t: "Tell us what you need",
    d: "Set your dates, budget, and neighborhood. Our matcher ranks the top 5 verified subleases so you skip the scroll.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    t: "Chat with the checklist",
    d: "Built-in messaging pairs with a shared checklist — Tour → Lease → Deposit → Move-in. Both sides stay accountable.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    t: "Move in with proof, not vibes",
    d: "Every listing has a lease on file, a verified student behind it, and an AI scan log. If anything feels off — one-tap report.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
];

export function TutorialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (open) setI(0);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, STEPS.length - 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const step = STEPS[i];
  const isLast = i === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl bg-card shadow-[var(--shadow-lift)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
        <button
          onClick={onClose}
          aria-label="Close tutorial"
          className="absolute top-4 right-4 h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-4">
            Getting started · {i + 1} of {STEPS.length}
          </p>
          <div className="h-12 w-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-5">
            {step.icon}
          </div>
          <h2 className="font-display text-3xl font-semibold text-foreground leading-tight">{step.t}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">{step.d}</p>

          {/* Progress dots */}
          <div className="mt-8 flex items-center gap-1.5">
            {STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Step ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-5 border-t border-border bg-cream/40">
          <button
            onClick={() => setI((v) => Math.max(v - 1, 0))}
            disabled={i === 0}
            className="text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-0 transition-colors"
          >
            ← Back
          </button>
          {!isLast ? (
            <button
              onClick={() => setI((v) => v + 1)}
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 h-10 text-sm font-medium"
            >
              Next
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 h-10 text-sm font-medium"
            >
              Let's go
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
