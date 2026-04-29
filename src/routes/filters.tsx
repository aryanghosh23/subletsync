import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
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

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
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

function DateField({ label, value, onChange }: { label: string; value: Date | undefined; onChange: (d: Date | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="rounded-lg border border-border bg-background px-3 py-2 text-left hover:border-foreground transition-colors w-full"
        >
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="text-sm font-medium text-foreground flex items-center justify-between gap-2">
            {value ? format(value, "MMM d") : <span className="text-muted-foreground">Pick date</span>}
            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
          </p>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          className={cn("p-3 pointer-events-auto")}
        />
      </PopoverContent>
    </Popover>
  );
}

function useToggleSet(initial: string[]) {
  const [set, setSet] = useState<Set<string>>(new Set(initial));
  const toggle = (key: string) => {
    setSet((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };
  const clear = () => setSet(new Set());
  return {
    has: (k: string) => set.has(k),
    toggle,
    clear,
    size: () => set.size,
    values: () => Array.from(set),
  };
}

const ALL_LISTINGS = [
  { id: 1, image: "listing1", title: "Sunny 1BR near Northside", location: "Synergy Park · 0.4 mi", price: "$720", priceNum: 720, dates: "May 15 – Aug 10", badges: ["Furnished", "Parking"], distance: 0.4, lease: "Summer only", amenities: ["Furnished", "Parking"], roommate: "Solo", verified: true },
  { id: 2, image: "listing2", title: "Quiet studio, kitchenette", location: "Waterview · 0.8 mi", price: "$680", priceNum: 680, dates: "May 18 – Aug 15", badges: ["Furnished", "Verified"], distance: 0.8, lease: "Summer only", amenities: ["Furnished"], roommate: "Solo", verified: true },
  { id: 3, image: "listing3", title: "Room in friendly 2BR", location: "University Village · 0.2 mi", price: "$640", priceNum: 640, dates: "May 20 – Aug 5", badges: ["Roommate", "Verified"], distance: 0.2, lease: "Short-term", amenities: ["Furnished"], roommate: "With roommate", verified: true },
  { id: 4, image: "listing4", title: "Bright loft, walk to UTD", location: "Northside · 0.5 mi", price: "$735", priceNum: 735, dates: "Jun 1 – Aug 20", badges: ["Furnished"], distance: 0.5, lease: "Partial semester", amenities: ["Furnished", "In-unit laundry"], roommate: "Solo", verified: false },
];

function Filters() {
  const [moveIn, setMoveIn] = useState<Date | undefined>(new Date(2026, 4, 15));
  const [moveOut, setMoveOut] = useState<Date | undefined>(new Date(2026, 7, 10));
  const [flexible, setFlexible] = useState(true);
  const [budget, setBudget] = useState<[number, number]>([600, 750]);
  const [distance, setDistance] = useState(1);

  const lease = useToggleSet(["Short-term", "Summer only"]);
  const amenities = useToggleSet(["Furnished", "Parking"]);
  const roommate = useToggleSet(["With roommate", "Quiet hours"]);
  const transit = useToggleSet(["Walk ≤ 10 min", "Comet Cruiser"]);
  const verification = useToggleSet(["Verified student (.edu)", "Lease on file", "ID manually reviewed"]);
  const propertyType = useToggleSet(["Apartment"]);
  const bedrooms = useToggleSet(["1 BR"]);
  const bathrooms = useToggleSet(["1 BA"]);
  const vibe = useToggleSet([]);
  const [gender, setGender] = useState("Any");
  const [sort, setSort] = useState("Best fit");
  const [sortOpen, setSortOpen] = useState(false);

  const imageMap: Record<string, string> = { listing1, listing2, listing3, listing4 };

  // Live filtering
  const filtered = ALL_LISTINGS.filter((l) => {
    if (l.priceNum < budget[0] || l.priceNum > budget[1]) return false;
    if (l.distance > distance) return false;
    if (amenities.size() > 0 && !amenities.values().some((a) => l.amenities.includes(a))) {
      // require at least one selected amenity to match
      return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Price: low to high") return a.priceNum - b.priceNum;
    if (sort === "Price: high to low") return b.priceNum - a.priceNum;
    if (sort === "Closest to UTD") return a.distance - b.distance;
    return 0;
  });

  const [applied, setApplied] = useState(false);
  const resultsCount = sorted.length;

  const reset = () => {
    setMoveIn(undefined);
    setMoveOut(undefined);
    setFlexible(false);
    setBudget([400, 1200]);
    setDistance(3);
    setGender("Any");
    setApplied(false);
    lease.clear();
    amenities.clear();
    roommate.clear();
    transit.clear();
    verification.clear();
    propertyType.clear();
    bedrooms.clear();
    bathrooms.clear();
    vibe.clear();
  };

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
              <button onClick={reset} className="text-xs text-primary font-medium hover:underline">Reset</button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Dates</p>
                <div className="grid grid-cols-2 gap-2">
                  <DateField label="Move-in" value={moveIn} onChange={setMoveIn} />
                  <DateField label="Move-out" value={moveOut} onChange={setMoveOut} />
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flexible}
                    onChange={(e) => setFlexible(e.target.checked)}
                    className="accent-primary h-4 w-4"
                  />
                  ± 7 days flexible
                </label>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Lease length</p>
                <div className="flex flex-wrap gap-2">
                  {["Short-term", "Partial semester", "Summer only", "Full year"].map((l) => (
                    <Toggle key={l} label={l} active={lease.has(l)} onClick={() => lease.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Budget</p>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input
                      type="number"
                      value={budget[0]}
                      min={0}
                      onChange={(e) => setBudget([Number(e.target.value), budget[1]])}
                      className="pl-5"
                    />
                  </div>
                  <span className="text-muted-foreground text-sm">–</span>
                  <div className="relative flex-1">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input
                      type="number"
                      value={budget[1]}
                      min={0}
                      onChange={(e) => setBudget([budget[0], Number(e.target.value)])}
                      className="pl-5"
                    />
                  </div>
                </div>
                <Slider
                  className="mt-4"
                  min={300}
                  max={2000}
                  step={25}
                  value={budget}
                  onValueChange={(v) => setBudget([v[0], v[1]] as [number, number])}
                />
                <p className="mt-2 text-xs text-muted-foreground">${budget[0]} – ${budget[1]} / mo</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {["Furnished", "Parking", "In-unit laundry", "Pet-friendly", "Utilities incl."].map((l) => (
                    <Toggle key={l} label={l} active={amenities.has(l)} onClick={() => amenities.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Roommate</p>
                <div className="flex flex-wrap gap-2">
                  {["Solo", "With roommate", "Quiet hours"].map((l) => (
                    <Toggle key={l} label={l} active={roommate.has(l)} onClick={() => roommate.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Distance from UTD</p>
                <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground flex items-center justify-between">
                  <span>Within {distance} mile{distance === 1 ? "" : "s"}</span>
                  <span className="text-xs text-muted-foreground">walk/bike</span>
                </div>
                <Slider
                  className="mt-3"
                  min={0.25}
                  max={5}
                  step={0.25}
                  value={[distance]}
                  onValueChange={(v) => setDistance(v[0])}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Walk ≤ 10 min", "Bike ≤ 5 min", "Comet Cruiser"].map((l) => (
                    <Toggle key={l} label={l} active={transit.has(l)} onClick={() => transit.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Property type</p>
                <div className="flex flex-wrap gap-2">
                  {["Apartment", "House", "Studio", "Loft", "Townhome"].map((l) => (
                    <Toggle key={l} label={l} active={propertyType.has(l)} onClick={() => propertyType.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Bedrooms</p>
                <div className="flex flex-wrap gap-2">
                  {["Studio", "1 BR", "2 BR", "3 BR", "4+ BR"].map((l) => (
                    <Toggle key={l} label={l} active={bedrooms.has(l)} onClick={() => bedrooms.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Bathrooms</p>
                <div className="flex flex-wrap gap-2">
                  {["1 BA", "1.5 BA", "2 BA", "2+ BA"].map((l) => (
                    <Toggle key={l} label={l} active={bathrooms.has(l)} onClick={() => bathrooms.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Vibe</p>
                <div className="flex flex-wrap gap-2">
                  {["Quiet & studious", "Social", "Early bird", "Night owl", "Pet household", "Smoke-free"].map((l) => (
                    <Toggle key={l} label={l} active={vibe.has(l)} onClick={() => vibe.toggle(l)} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Verification level</p>
                <div className="space-y-2">
                  {[
                    "Verified student (.edu)",
                    "Lease on file",
                    "ID manually reviewed",
                    "Previous peer reviews",
                  ].map((t) => (
                    <label key={t} className="flex items-center gap-2.5 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={verification.has(t)}
                        onChange={() => verification.toggle(t)}
                        className="accent-primary h-4 w-4"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Gender preference</p>
                <div className="flex flex-wrap gap-2">
                  {["Any", "Women only", "Men only"].map((g) => (
                    <Toggle key={g} label={g} active={gender === g} onClick={() => setGender(g)} />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">Posters can opt in to a same-gender roommate preference.</p>
              </div>

              <Button
                onClick={() => setApplied(true)}
                className="w-full rounded-full h-11 text-sm font-semibold"
              >
                Apply · {resultsCount} result{resultsCount === 1 ? "" : "s"}
              </Button>
              {applied && (
                <p className="text-center text-xs text-primary font-medium -mt-2">
                  ✓ Filters applied
                </p>
              )}
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{resultsCount} listing{resultsCount === 1 ? "" : "s"}</span> match your filters
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort
                <Popover open={sortOpen} onOpenChange={setSortOpen}>
                  <PopoverTrigger asChild>
                    <button className="rounded-lg border border-border bg-background px-3 h-9 text-foreground font-medium hover:border-foreground transition-colors">
                      {sort}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-52 p-1">
                    {["Best fit", "Price: low to high", "Price: high to low", "Closest to UTD"].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSort(s); setSortOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-accent ${sort === s ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {sorted.map((l) => (
                <ListingCard
                  key={l.id}
                  image={imageMap[l.image]}
                  title={l.title}
                  location={l.location}
                  price={l.price}
                  dates={l.dates}
                  badges={l.badges}
                />
              ))}
              {sorted.length === 0 && (
                <div className="sm:col-span-2 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">No matches</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try widening budget or distance, or hit Reset.</p>
                  <Button onClick={reset} variant="outline" className="mt-4 rounded-full">Reset filters</Button>
                </div>
              )}
            </div>

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
