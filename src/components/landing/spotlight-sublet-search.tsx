import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Command, Search, Sparkles, X } from "lucide-react";
import { TOP_MATCH_LISTINGS } from "@/lib/top-match-listings";
import { cn } from "@/lib/utils";

const searchPool = TOP_MATCH_LISTINGS.map((l) => ({
  id: l.id,
  title: l.title,
  subtitle: l.location,
  price: l.price,
  dates: l.dates,
  tags: l.badges,
}));

function EmptySearchIllustration() {
  return (
    <motion.svg
      viewBox="0 0 200 140"
      className="mx-auto h-28 w-40 text-primary/35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
    >
      <rect x="24" y="32" width="152" height="76" rx="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="78" cy="70" r="18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M118 82l28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M52 112h96"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 6"
        opacity="0.45"
      />
    </motion.svg>
  );
}

export function SpotlightSubletSearch({ className }: { className?: string }) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchPool;
    return searchPool.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.price.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && focused) {
        inputRef.current?.blur();
        setFocused(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  const showEmpty = query.trim().length > 0 && filtered.length === 0;

  return (
    <div className={cn("relative z-10", className)}>
      <motion.div
        className={cn(
          "pointer-events-none fixed inset-0 z-[35] bg-foreground/25 transition-[opacity,backdrop-filter]",
          focused ? "pointer-events-auto opacity-100 backdrop-blur-[2px]" : "opacity-0",
        )}
        initial={false}
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.28 }}
        aria-hidden
        onClick={() => {
          setFocused(false);
          inputRef.current?.blur();
        }}
      />

      <div className="relative z-[45] mx-auto w-full max-w-xl px-1">
        <motion.div
          layout
          className={cn(
            "overflow-hidden rounded-2xl border border-border/80 bg-card/85 shadow-[0_24px_80px_-24px_oklch(0.2_0.06_168/0.35)] backdrop-blur-xl",
            focused &&
              "ring-2 ring-primary/30 shadow-[0_32px_100px_-28px_oklch(0.45_0.12_168/0.35)]",
          )}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        >
          <label className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
            <Search className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={(e) => {
                const next = e.relatedTarget as HTMLElement | null;
                if (next?.closest?.("[data-spotlight-hit]")) return;
                setTimeout(() => {
                  setFocused(false);
                }, 120);
              }}
              placeholder="Search sublets, buildings, price…"
              className="min-w-0 flex-1 bg-transparent text-base font-medium text-foreground placeholder:text-muted-foreground/80 outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="hidden shrink-0 items-center gap-0.5 rounded-lg border border-border bg-muted/80 px-2 py-1 font-mono text-[10px] font-semibold text-muted-foreground sm:inline-flex">
              <Command className="h-3 w-3" />K
            </kbd>
          </label>

          <AnimatePresence mode="popLayout">
            {focused ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="max-h-[min(320px,50vh)] overflow-y-auto overscroll-contain"
              >
                {showEmpty ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 px-6 py-10 text-center"
                  >
                    <EmptySearchIllustration />
                    <div>
                      <p className="font-semibold text-foreground">No matches in this universe</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try “Northside”, “studio”, or a price like 700.
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      animate={
                        reduce
                          ? undefined
                          : {
                              scale: [1, 1.03, 1],
                              boxShadow: [
                                "0 8px 24px -8px oklch(0.5 0.12 168/0.4)",
                                "0 12px 32px -8px oklch(0.5 0.12 168/0.55)",
                                "0 8px 24px -8px oklch(0.5 0.12 168/0.4)",
                              ],
                            }
                      }
                      transition={
                        reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                      }
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                    >
                      Clear filters
                    </motion.button>
                  </motion.div>
                ) : (
                  <ul className="py-2">
                    {filtered.map((item, i) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduce ? 0 : i * 0.04, duration: 0.28 }}
                      >
                        <Link
                          data-spotlight-hit
                          to="/marketplace"
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-primary/8"
                          onClick={() => setFocused(false)}
                        >
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground leading-snug">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              <span className="rounded-md bg-primary/12 px-2 py-0.5 text-xs font-semibold text-primary">
                                {item.price}
                              </span>
                              <span className="text-xs text-muted-foreground">{item.dates}</span>
                            </div>
                          </div>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Spotlight-style search · demo inventory ·{" "}
          <button
            type="button"
            className="font-medium text-primary hover:underline"
            onClick={() => {
              setQuery("");
              setFocused(true);
              inputRef.current?.focus();
            }}
          >
            Reset
          </button>
          {focused ? (
            <span className="ml-2 inline-flex items-center gap-1">
              <X className="h-3 w-3" /> esc to close
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
