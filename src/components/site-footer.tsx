export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-cream/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary font-display text-sm text-primary-foreground">
            s.
          </span>
          <span className="font-display text-base text-foreground">SubletSync</span>
        </div>
        <p className="max-w-md text-center md:text-left">
          For students, by students. Built at UT Dallas.
        </p>
        <div className="text-center md:text-right">
          <p>© 2026 SubletSync — A product mock-up.</p>
          <p className="mt-2 text-xs">
            Campus photography from{" "}
            <a
              href="https://www.liveatnorthside.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Northside
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
