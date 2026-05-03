import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import { TOP_MATCH_LISTINGS } from "@/lib/top-match-listings";

export const Route = createFileRoute("/smart-matching")({
  component: SmartMatching,
  head: () => ({
    meta: [
      { title: "Smart Matching — SubletSync" },
      {
        name: "description",
        content:
          "Tell us your budget, dates, and vibe. Get your top 5 student-verified subleases — no scrolling required.",
      },
    ],
  }),
});

function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground mt-1">{value}</p>
    </div>
  );
}

function SmartMatching() {
  const topFive = TOP_MATCH_LISTINGS;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
          Feature 01 · Smart matching
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          Stop scrolling.
          <br />
          <span className="italic text-primary">Start matching.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Our rule-based engine reads your preferences and surfaces the five subleases that actually
          fit — ranked by budget, dates, location, and roommate compatibility. Like Zillow’s
          structure, with Marketplace speed — but student-only.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-cream/80 via-card to-primary-soft/30 p-6 md:p-10 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Your preferences
            </h2>
            <button type="button" className="text-sm text-primary font-medium hover:underline">
              Edit
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FilterChip label="Budget" value="$600 – $750/mo" />
            <FilterChip label="Move-in" value="May 15, 2026" />
            <FilterChip label="Move-out" value="Aug 10, 2026" />
            <FilterChip label="Distance" value="≤ 1 mi from UTD" />
            <FilterChip label="Furnished" value="Yes" />
            <FilterChip label="Parking" value="1 spot" />
            <FilterChip label="Roommate" value="Open · quiet" />
            <FilterChip label="Lease type" value="Short-term sublease" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Your top matches
            </h2>
            <p className="text-muted-foreground mt-2">
              5 listings · ranked by fit · refreshed today
            </p>
          </div>
          <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
            Open full marketplace
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFive.slice(0, 3).map((l) => (
            <Link key={l.id} to="/verified" className="group block">
              <ListingCard
                image={l.image}
                title={l.title}
                location={l.location}
                price={l.price}
                dates={l.dates}
                badges={[...l.badges]}
                matchScore={l.matchScore}
              />
            </Link>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {topFive.slice(3).map((l) => (
            <Link key={l.id} to="/verified" className="group block">
              <ListingCard
                image={l.image}
                title={l.title}
                location={l.location}
                price={l.price}
                dates={l.dates}
                badges={[...l.badges]}
                matchScore={l.matchScore}
              />
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-background p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-medium text-foreground">Not seeing the right fit?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Adjust a filter and we'll re-rank instantly — passive browsing becomes active
              discovery.
            </p>
          </div>
          <Link
            to="/filters"
            className="rounded-full bg-foreground text-background h-11 px-6 text-sm font-medium self-start md:self-auto inline-flex items-center justify-center hover:bg-foreground/90"
          >
            Adjust filters
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
