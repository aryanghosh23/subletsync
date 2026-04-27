import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import listing1 from "@/assets/building-northside.jpg";
import listing2 from "@/assets/building-waterview.jpg";
import listing3 from "@/assets/building-university-village.jpg";
import listing4 from "@/assets/building-northside-loft.jpg";

export const Route = createFileRoute("/filters")({
  component: Filters,
  head: () => ({
    meta: [
      { title: "Flexible Lease Filters — SubletSync" },
      { name: "description", content: "Filter subleases by move-in dates, furnished status, parking, and short-term flexibility — built for the way students actually move." },
    ],
  }),
});

function Toggle({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full border px-4 h-9 text-sm font-medium transition-colors ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-border hover:border-foreground"
      }`}
    >
      {active && (
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      )}
      {label}
    </button>
  );
}

function Filters() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Feature 04 · Flexible filters</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          Filters built for
          <br />
          <span className="italic">how students move.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Move-in dates that don't line up with the calendar year. Furnished
          rooms. Parking. Partial-semester stays. The filters Zillow doesn't have.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          {/* Filter panel */}
          <aside className="rounded-3xl border border-border bg-card p-6 self-start lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold text-foreground">Filters</h2>
              <button className="text-xs text-primary font-medium">Reset</button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Dates</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-border bg-background px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Move-in</p>
                    <p className="text-sm font-medium text-foreground">May 15</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Move-out</p>
                    <p className="text-sm font-medium text-foreground">Aug 10</p>
                  </div>
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" defaultChecked className="accent-primary h-4 w-4" />
                  ± 7 days flexible
                </label>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Lease length</p>
                <div className="flex flex-wrap gap-2">
                  <Toggle label="Short-term" active />
                  <Toggle label="Partial semester" />
                  <Toggle label="Summer only" active />
                  <Toggle label="Full year" />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Budget</p>
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground">
                  $600 – $750 / mo
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-border relative">
                  <div className="absolute left-[20%] right-[35%] top-0 bottom-0 rounded-full bg-primary" />
                  <div className="absolute left-[20%] -top-1 h-3.5 w-3.5 rounded-full bg-background border-2 border-primary -translate-x-1/2" />
                  <div className="absolute right-[35%] -top-1 h-3.5 w-3.5 rounded-full bg-background border-2 border-primary translate-x-1/2" />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  <Toggle label="Furnished" active />
                  <Toggle label="Parking" active />
                  <Toggle label="In-unit laundry" />
                  <Toggle label="Pet-friendly" />
                  <Toggle label="Utilities incl." />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Roommate</p>
                <div className="flex flex-wrap gap-2">
                  <Toggle label="Solo" />
                  <Toggle label="With roommate" active />
                  <Toggle label="Quiet hours" active />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Distance from UTD</p>
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground flex items-center justify-between">
                  <span>Within 1 mile</span>
                  <span className="text-xs text-muted-foreground">walk/bike</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Toggle label="Walk ≤ 10 min" active />
                  <Toggle label="Bike ≤ 5 min" />
                  <Toggle label="Comet Cruiser" active />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Verification level</p>
                <div className="space-y-2">
                  {[
                    { t: "Verified student (.edu)", on: true },
                    { t: "Lease on file", on: true },
                    { t: "ID manually reviewed", on: true },
                    { t: "Previous peer reviews", on: false },
                  ].map((v) => (
                    <label key={v.t} className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
                      <input type="checkbox" defaultChecked={v.on} className="accent-primary h-4 w-4" />
                      {v.t}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Gender preference</p>
                <div className="flex flex-wrap gap-2">
                  <Toggle label="Any" active />
                  <Toggle label="Women only" />
                  <Toggle label="Men only" />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">Posters can opt in to a same-gender roommate preference.</p>
              </div>

              <button className="w-full rounded-full bg-primary text-primary-foreground h-11 text-sm font-semibold hover:bg-primary/90 transition-colors">
                Apply · 12 results
              </button>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">12 listings</span> match your filters
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort
                <button className="rounded-lg border border-border bg-background px-3 h-9 text-foreground font-medium">
                  Best fit
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <ListingCard
                image={listing1}
                title="Sunny 1BR near Northside"
                location="Synergy Park · 0.4 mi"
                price="$720"
                dates="May 15 – Aug 10"
                badges={["Furnished", "Parking"]}
              />
              <ListingCard
                image={listing2}
                title="Quiet studio, kitchenette"
                location="Waterview · 0.8 mi"
                price="$680"
                dates="May 18 – Aug 15"
                badges={["Furnished", "Verified"]}
              />
              <ListingCard
                image={listing3}
                title="Room in friendly 2BR"
                location="University Village · 0.2 mi"
                price="$640"
                dates="May 20 – Aug 5"
                badges={["Roommate", "Verified"]}
              />
              <ListingCard
                image={listing4}
                title="Bright loft, walk to UTD"
                location="Northside · 0.5 mi"
                price="$735"
                dates="Jun 1 – Aug 20"
                badges={["Furnished"]}
              />
            </div>

            {/* Empty-state hint */}
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-cream/40 p-5 flex items-start gap-3">
              <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              <div className="text-sm">
                <p className="text-foreground font-medium">Too few results?</p>
                <p className="text-muted-foreground mt-0.5">
                  Try widening your move-in window or removing one amenity. Most students unlock 2-3× more matches with a 7-day flex.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
