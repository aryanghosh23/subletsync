import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { TutorialModal } from "@/components/tutorial-modal";

export function SiteNav() {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/60">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-semibold">
            s.
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            SubletSync
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <Link to="/smart-matching" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Matching
          </Link>
          <Link to="/verified" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Verified
          </Link>
          <Link to="/filters" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Filters
          </Link>
          <Link to="/messaging" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Messaging
          </Link>
          <Link to="/fraud" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition-colors">
            Trust
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <button
            type="button"
            onClick={() => setShowTutorial(true)}
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 h-9 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get started
          </button>
        </div>
      </nav>
      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
    </header>
  );
}
