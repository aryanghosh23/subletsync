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
  return { has: (k: string) => set.has(k), toggle };
}

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
  const [gender, setGender] = useState("Any");

  const reset = () => {
    setMoveIn(undefined);
    setMoveOut(undefined);
    setFlexible(false);
    setBudget([400, 1200]);
    setDistance(3);
    setGender("Any");
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

              <Button className="w-full rounded-full h-11 text-sm font-semibold">
                Apply · 12 results
              </Button>
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
