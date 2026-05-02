import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { TutorialModal } from "@/components/tutorial-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SiteNav() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/60 supports-[backdrop-filter]:bg-background/70">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-semibold shadow-sm ring-1 ring-primary/20">
            s.
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">
            SubletSync
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link
            to="/marketplace"
            activeProps={{ className: "text-foreground font-medium" }}
            className="hover:text-foreground transition-colors"
          >
            Marketplace
          </Link>
          <Link
            to="/smart-matching"
            activeProps={{ className: "text-foreground font-medium" }}
            className="hover:text-foreground transition-colors"
          >
            Matching
          </Link>
          <Link
            to="/verified"
            activeProps={{ className: "text-foreground font-medium" }}
            className="hover:text-foreground transition-colors"
          >
            Verified
          </Link>
          <Link
            to="/filters"
            activeProps={{ className: "text-foreground font-medium" }}
            className="hover:text-foreground transition-colors"
          >
            Filters
          </Link>
          <Link
            to="/messaging"
            activeProps={{ className: "text-foreground font-medium" }}
            className="hover:text-foreground transition-colors"
          >
            Messaging
          </Link>
          <Link
            to="/fraud"
            activeProps={{ className: "text-foreground font-medium" }}
            className="hover:text-foreground transition-colors"
          >
            Trust
          </Link>
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
            <PopoverContent align="end" className="w-80 p-0 overflow-hidden">
              <div className="border-b border-border px-4 py-3 bg-cream/50">
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
                    className="border-b border-border/60 px-4 py-3 hover:bg-muted/40 cursor-pointer"
                    onClick={() => toast.message(String(t), { description: String(d) })}
                  >
                    <p className="font-medium text-foreground">{t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{w}</p>
                  </li>
                ))}
              </ul>
              <div className="p-3 border-t border-border bg-background">
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
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
          >
            Sign in
          </Link>

          <Button
            onClick={() => setShowTutorial(true)}
            className="rounded-full px-4 h-9 text-sm font-medium shadow-sm hidden sm:inline-flex"
          >
            Get started
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 rounded-full"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-2 text-sm">
          {[
            ["/marketplace", "Marketplace"],
            ["/smart-matching", "Matching"],
            ["/verified", "Verified"],
            ["/filters", "Filters"],
            ["/messaging", "Messaging"],
            ["/fraud", "Trust"],
            ["/signin", "Sign in"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-foreground font-medium border-b border-border/50 last:border-0"
            >
              {label}
            </Link>
          ))}
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
      )}

      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
    </header>
  );
}
