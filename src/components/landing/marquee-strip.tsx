const DEFAULT_ITEMS: string[] = [
  ".edu verified only",
  "Top 5 smart matches",
  "Northside · UV · Waterview",
  "Messenger + checklist flow",
  "Lease & ID on file",
  "AI fraud screening",
  "Built for UTD Comets",
];

export function MarqueeStrip({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="landing-marquee-mask border-y border-border/50 bg-foreground/[0.03]">
      <div className="landing-marquee-track flex w-max gap-12 py-3.5 pr-12">
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="shrink-0 text-[13px] font-semibold tracking-wide text-muted-foreground uppercase"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
