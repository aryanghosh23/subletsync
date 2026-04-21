import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

export const Route = createFileRoute("/smart-matching")({
  component: SmartMatching,
  head: () => ({
    meta: [
      { title: "Smart Matching — SubletSync" },
      { name: "description", content: "Tell us your budget, dates, and vibe. Get your top 5 student-verified subleases — no scrolling required." },
    ],
  }),
});

function FilterChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
      <p className="text-sm font-medium text-foreground mt-1">{value}</p>
    </div>
  );
}

function SmartMatching() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Feature 01 · Smart matching</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          Stop scrolling.
          <br />
          <span className="italic">Start matching.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Our rule-based engine reads your preferences and surfaces the five
          subleases that actually fit — ranked by budget, dates, location, and
          roommate compatibility.
        </p>
      </section>

      {/* Preferences mock */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-border bg-cream/50 p-6 md:p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-foreground">Your preferences</h2>
            <button className="text-sm text-primary font-medium">Edit</button>
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

      {/* Top 5 */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">Your top matches</h2>
            <p className="text-muted-foreground mt-2">5 listings · ranked by fit · refreshed today</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ListingCard
            image={listing1}
            title="Sunny 1BR near Northside"
            location="Synergy Park · 0.4 mi"
            price="$720"
            dates="May 15 – Aug 10"
            badges={["Verified", "Furnished"]}
            matchScore={96}
          />
          <ListingCard
            image={listing2}
            title="Quiet studio, kitchenette"
            location="Waterview · 0.8 mi"
            price="$680"
            dates="May 18 – Aug 15"
            badges={["Verified", "Parking"]}
            matchScore={91}
          />
          <ListingCard
            image={listing3}
            title="Room in friendly 2BR"
            location="University Village · 0.2 mi"
            price="$640"
            dates="May 20 – Aug 5"
            badges={["Verified", "Roommate"]}
            matchScore={88}
          />
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-background p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-medium text-foreground">Not seeing the right fit?</p>
            <p className="text-sm text-muted-foreground mt-1">Adjust a filter and we'll re-rank instantly.</p>
          </div>
          <button className="rounded-full bg-foreground text-background h-11 px-6 text-sm font-medium self-start md:self-auto">
            Adjust preferences
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
