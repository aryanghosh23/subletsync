export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-cream/40 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-display text-sm">
            s.
          </span>
          <span className="font-display text-base text-foreground">SubletSync</span>
        </div>
        <p>For students, by students. Built at UT Dallas.</p>
        <p>© 2026 SubletSync — A product mock-up.</p>
      </div>
    </footer>
  );
}
