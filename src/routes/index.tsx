import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import heroImg from "@/assets/building-northside.jpg";
import listing1 from "@/assets/building-northside.jpg";
import listing2 from "@/assets/building-waterview.jpg";
import listing3 from "@/assets/building-university-village.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SubletSync — Trusted student subleases" },
      { name: "description", content: "Verified student subleases with smart matching. Find or post a sublease in days, not weeks." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[var(--gradient-warm)] opacity-70" />
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-soft blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-accent/40 blur-3xl opacity-60" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur border border-border px-3 py-1.5 text-xs font-medium text-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now verifying students at UT Dallas
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] text-foreground">
              Subleases,
              <br />
              <span className="italic text-primary">solved.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              A trusted marketplace for student subleases. Verified peers,
              smart matches, and a checklist that actually closes the deal —
              in 10 days or less.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/smart-matching"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 h-12 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Find a sublease
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/verified"
                className="inline-flex items-center rounded-full border border-border bg-background/60 backdrop-blur px-6 h-12 text-sm font-medium text-foreground hover:bg-background transition-colors"
              >
                List your place
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "≤10d", v: "to match" },
                { k: "85%+", v: "verified" },
                { k: "<1%", v: "fraud rate" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl text-foreground font-semibold">{s.k}</dt>
                  <dd className="text-xs text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-lift)] aspect-[4/5] md:aspect-[5/6]">
              <img
                src={heroImg}
                alt="Modern student apartment building at dusk, near UT Dallas in Richardson, Texas"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating verified card */}
            <div className="absolute -left-4 md:-left-10 bottom-8 bg-card rounded-2xl shadow-[var(--shadow-lift)] border border-border/60 p-4 w-64">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center text-primary font-display font-semibold">
                  AK
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Aisha K.</p>
                  <p className="text-xs text-muted-foreground">UT Dallas · Junior</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary-soft/60 px-2.5 py-1.5">
                <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-primary">Verified student · Lease on file</span>
              </div>
            </div>
            {/* Floating match card */}
            <div className="absolute -right-2 md:-right-6 top-10 bg-card rounded-2xl shadow-[var(--shadow-lift)] border border-border/60 p-4 w-52">
              <p className="text-xs text-muted-foreground">Top match</p>
              <p className="font-display text-3xl font-semibold text-primary mt-1">94%</p>
              <p className="text-xs text-foreground mt-1">Furnished · 4 mo · $780</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">How it works</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            From <span className="italic">scrolling forever</span> to keys in hand.
          </h2>
        </div>
        <ol className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", t: "Verify with .edu", d: "One-time student ID + email check. Earns you a badge that unlocks listing or browsing." },
            { n: "02", t: "Tell us what you need", d: "Budget, dates, neighborhood, roommate vibe. Our engine ranks the top 5 matches." },
            { n: "03", t: "Close it in days", d: "Built-in chat with a shared checklist — tour, lease, move-in. No ghosting, no chaos." },
          ].map((s) => (
            <li key={s.n} className="relative">
              <span className="font-display text-7xl text-primary/15 font-semibold leading-none">{s.n}</span>
              <h3 className="font-display text-2xl font-semibold text-foreground mt-4">{s.t}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">This week</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Verified subleases near campus
            </h2>
          </div>
          <Link to="/smart-matching" className="hidden md:inline-flex text-sm font-medium text-foreground hover:text-primary transition-colors">
            See all matches →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <ListingCard
            image={listing1}
            title="Sunny 1BR at Northside"
            location="Northside · 0.3 mi from UTD"
            price="$780"
            dates="May 15 – Aug 10 · Furnished"
            badges={["Verified student", "Lease on file"]}
            matchScore={94}
          />
          <ListingCard
            image={listing2}
            title="Quiet studio at The Element"
            location="Waterview Pkwy · 0.8 mi"
            price="$650"
            dates="Jun 1 – Aug 20 · Flexible"
            badges={["Verified student"]}
            matchScore={88}
          />
          <ListingCard
            image={listing3}
            title="Cozy room at University Village"
            location="University Village · 0.2 mi"
            price="$540"
            dates="May 20 – Aug 5 · Roommate"
            badges={["Verified student", "Lease on file"]}
            matchScore={82}
          />
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-medium text-primary-soft uppercase tracking-wider mb-3">Built different</p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                We don't trust strangers.
                <br />
                <span className="italic text-primary-soft">We verify them.</span>
              </h2>
              <p className="mt-6 text-background/70 leading-relaxed max-w-md">
                Facebook Marketplace and Zillow weren't built for the way
                students actually move. SubletSync starts with verification,
                ends with a closed deal — and removes the in-between.
              </p>
            </div>
            <ul className="space-y-5">
              {[
                ["Verified students only", ".edu email + student ID required to post or browse."],
                ["AI fraud detection", "Every listing scanned. Documents required. Suspicious posts removed in hours."],
                ["A checklist, not a chat", "Tour scheduled → lease shared → move-in confirmed. Real progress, not endless DMs."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium text-background">{t}</p>
                    <p className="text-sm text-background/65 mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
