import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import { TutorialModal } from "@/components/tutorial-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/smart-matching", label: "Matching" },
  { to: "/verified", label: "Verified" },
  { to: "/filters", label: "Filters" },
  { to: "/messaging", label: "Messaging" },
  { to: "/fraud", label: "Trust" },
] as const;

function navActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteNav() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-background/55 shadow-[0_1px_0_oklch(1_0_0/0.06)] backdrop-blur-2xl supports-[backdrop-filter]:bg-background/45">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link to="/" className="group flex shrink-0 items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-sans text-lg font-bold text-primary-foreground shadow-md shadow-primary/25 ring-1 ring-white/20">
            s.
          </span>
          <span className="font-sans text-xl font-bold tracking-tight text-foreground">
            SubletSync
          </span>
        </Link>

        <div className="relative hidden items-center gap-1 rounded-full border border-border/40 bg-card/30 p-1 backdrop-blur-xl md:flex">
          {NAV.map(({ to, label }) => {
            const active = navActive(pathname, to);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="site-nav-pill"
                    className="absolute inset-0 z-0 rounded-full border border-white/20 bg-foreground/[0.07] shadow-[0_4px_20px_-8px_oklch(0.2_0.04_160/0.35)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-80 overflow-hidden border-border/60 bg-card/95 p-0 shadow-xl backdrop-blur-xl"
            >
              <div className="border-b border-border bg-cream/50 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">Alerts</p>
                <p className="text-xs text-muted-foreground">
                  Saved searches · messenger · new listings
                </p>
              </div>
              <ul className="max-h-64 overflow-y-auto text-sm">
                {[
                  ["New Northside listing", "$720 · May–Aug · matches your filters", "2m ago"],
                  ["Message from Aisha", "Lease PDF attached in checklist", "1h ago"],
                  ["Price drop", "Waterview studio now $640/mo", "Yesterday"],
                ].map(([t, d, w]) => (
                  <li
                    key={t}
                    className="cursor-pointer border-b border-border/60 px-4 py-3 hover:bg-muted/40"
                    onClick={() => toast.message(String(t), { description: String(d) })}
                  >
                    <p className="font-medium text-foreground">{t}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{d}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{w}</p>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border bg-background p-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full text-xs"
                  onClick={() => toast.success("Push & email alerts toggled on (demo)")}
                >
                  Turn on all alerts
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Link
            to="/signin"
            className="hidden px-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => setShowTutorial(true)}
              className="hidden h-9 rounded-full px-4 text-sm font-semibold shadow-md sm:inline-flex"
            >
              Get started
            </Button>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {mobileOpen ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 px-6 py-4 text-sm">
            {NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 font-medium",
                  navActive(pathname, to)
                    ? "bg-foreground/10 text-foreground"
                    : "text-foreground/80 hover:bg-muted/50",
                )}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 font-medium text-foreground/80 hover:bg-muted/50"
            >
              Sign in
            </Link>
            <Button
              className="mt-2 rounded-full"
              onClick={() => {
                setShowTutorial(true);
                setMobileOpen(false);
              }}
            >
              Get started
            </Button>
          </div>
        </motion.div>
      ) : null}

      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
    </header>
  );
}
