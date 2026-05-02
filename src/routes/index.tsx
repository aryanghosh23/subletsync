import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import {
  NORTHSIDE_HERO,
  listingThumb,
  northsideGallery,
  NORTHSIDE_PROPERTY_URL,
  NORTHSIDE_IMAGE_CREDIT,
} from "@/lib/northside-images";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SubletSync — Trusted student subleases" },
      {
        name: "description",
        content:
          "Verified student subleases with smart matching. Find or post a sublease in days, not weeks.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      {/* HERO */}
      <section className="relative flex min-h-[min(92vh,880px)] items-center overflow-hidden">
        <div className="hero-backdrop absolute inset-0 -z-10" />
        <div className="animate-ss-pulse-glow absolute top-20 left-[10%] -z-10 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />
        <div className="animate-ss-orbit absolute right-[5%] bottom-10 -z-10 h-96 w-96 rounded-full bg-accent/35 opacity-80 blur-[90px]" />
        <div className="animate-ss-orbit absolute top-1/2 left-1/2 -z-10 h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 opacity-40" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-20 pb-24 md:grid-cols-2 md:pt-28 md:pb-32 lg:gap-16">
          <div>
            <span
              className="animate-ss-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/90 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Verified for UT Dallas · Northside-adjacent inventory
            </span>
            <h1
              className="animate-ss-reveal font-display text-5xl leading-[1.02] font-semibold tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]"
              style={{ animationDelay: "0.12s" }}
            >
              Subleases,
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text italic text-transparent">
                solved.
              </span>
            </h1>
            <p
              className="animate-ss-reveal mt-6 max-w-md text-lg leading-relaxed font-medium text-muted-foreground"
              style={{ animationDelay: "0.2s" }}
            >
              A trusted marketplace for student subleases. Verified peers, smart matches, and a
              checklist that actually closes the deal — in 10 days or less.
            </p>
            <div
              className="animate-ss-reveal mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.28s" }}
            >
              <Link
                to="/marketplace"
                className="btn-shimmer inline-flex h-14 items-center gap-2 rounded-full px-7 text-sm font-semibold text-background shadow-xl shadow-foreground/15 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Browse marketplace
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <Link
                to="/smart-matching"
                className="inline-flex h-14 items-center gap-2 rounded-full border-2 border-primary/30 bg-background/80 px-6 text-sm font-semibold text-foreground shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-card"
              >
                Top 5 matches
              </Link>
              <Link
                to="/verified"
                className="inline-flex h-14 items-center rounded-full px-5 text-sm font-semibold text-primary decoration-2 hover:underline underline-offset-4"
              >
                List your place
              </Link>
            </div>

            <dl
              className="animate-ss-reveal mt-12 grid max-w-md grid-cols-3 gap-6"
              style={{ animationDelay: "0.36s" }}
            >
              {[
                { k: "≤10d", v: "to match" },
                { k: "85%+", v: "verified" },
                { k: "<1%", v: "fraud rate" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-border/60 bg-card/50 px-3 py-3 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <dt className="font-display text-2xl font-bold text-foreground tabular-nums">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative md:pl-4">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-16px_oklch(0.25_0.05_160/0.35)] ring-2 ring-primary/20 ring-offset-4 ring-offset-[var(--background)]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-primary/25 via-transparent to-accent/20" />
              <div className="pointer-events-none absolute inset-0 z-10 opacity-30 mix-blend-overlay [background-image:var(--noise)]" />
              <img
                src={NORTHSIDE_HERO}
                alt="Northside apartments adjacent to UT Dallas — student housing community"
                width={1536}
                height={1024}
                className="animate-ss-kenburns min-h-[420px] w-full object-cover md:min-h-[520px]"
                fetchPriority="high"
              />
            </div>
            <div className="animate-ss-float absolute -left-4 bottom-8 z-20 w-64 rounded-2xl border border-primary/15 bg-card/95 p-4 shadow-2xl backdrop-blur-xl md:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft font-display font-semibold text-primary ring-2 ring-primary/20">
                  AK
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Aisha K.</p>
                  <p className="text-xs text-muted-foreground">UT Dallas · Junior</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary-soft/60 px-2.5 py-1.5">
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs font-medium text-primary">
                  Verified student · Lease on file
                </span>
              </div>
            </div>
            <div className="animate-ss-float-slow absolute -right-2 top-10 z-20 w-52 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-2xl backdrop-blur-xl md:-right-6">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Top match
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-primary tabular-nums">94%</p>
              <p className="mt-1 text-xs font-medium text-foreground">Furnished · 4 mo · $780</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
            From <span className="italic">scrolling forever</span> to keys in hand.
          </h2>
        </div>
        <ol className="grid md:grid-cols-3 gap-8">
          {[
            {
              n: "01",
              t: "Verify with .edu",
              d: "One-time student ID + email check. Earns you a badge that unlocks listing or browsing.",
            },
            {
              n: "02",
              t: "Tell us what you need",
              d: "Budget, dates, neighborhood, roommate vibe. Our engine ranks the top 5 matches.",
            },
            {
              n: "03",
              t: "Close it in days",
              d: "Built-in chat with a shared checklist — tour, lease, move-in. No ghosting, no chaos.",
            },
          ].map((s, i) => (
            <li
              key={s.n}
              className="animate-ss-reveal relative transition-transform duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="font-display text-7xl text-primary/15 font-semibold leading-none">
                {s.n}
              </span>
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
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              This week
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Verified subleases near campus
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="hidden md:inline-flex text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            See all on marketplace →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/marketplace" className="group block">
            <ListingCard
              image={listingThumb.northside1}
              title="Sunny 1BR at Northside"
              location="Northside · 0.3 mi from UTD"
              price="$780"
              dates="May 15 – Aug 10 · Furnished"
              badges={["Verified student", "Lease on file"]}
              matchScore={94}
            />
          </Link>
          <Link to="/marketplace" className="group block">
            <ListingCard
              image={listingThumb.waterview}
              title="Quiet studio at The Element"
              location="Waterview Pkwy · 0.8 mi"
              price="$650"
              dates="Jun 1 – Aug 20 · Flexible"
              badges={["Verified student"]}
              matchScore={88}
            />
          </Link>
          <Link to="/marketplace" className="group block">
            <ListingCard
              image={listingThumb.uv}
              title="Cozy room at University Village"
              location="University Village · 0.2 mi"
              price="$540"
              dates="May 20 – Aug 5 · Roommate"
              badges={["Verified student", "Lease on file"]}
              matchScore={82}
            />
          </Link>
        </div>
      </section>

      {/* NORTHSIDE GALLERY */}
      <section className="mx-auto max-w-6xl px-6 py-20 border-y border-border/60 bg-cream/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
              Northside at UTD
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground max-w-xl leading-tight">
              The walkable district students actually sublease in.
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors shrink-0"
          >
            View all Northside listings →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {northsideGallery.slice(0, 4).map((img) => (
            <figure
              key={img.src}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/85 to-transparent">
                <span className="text-[11px] font-medium text-background leading-tight block">
                  {img.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 text-center text-xs text-muted-foreground md:text-left">
          <p>{NORTHSIDE_IMAGE_CREDIT}</p>
          <a
            href={NORTHSIDE_PROPERTY_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            liveatnorthside.com — schedule a tour
          </a>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-medium text-primary-soft uppercase tracking-wider mb-3">
                Built different
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                We don't trust strangers.
                <br />
                <span className="italic text-primary-soft">We verify them.</span>
              </h2>
              <p className="mt-6 text-background/70 leading-relaxed max-w-md">
                Facebook Marketplace and Zillow weren't built for the way students actually move.
                SubletSync starts with verification, ends with a closed deal — and removes the
                in-between.
              </p>
            </div>
            <ul className="space-y-5">
              {[
                ["Verified students only", ".edu email + student ID required to post or browse."],
                [
                  "AI fraud detection",
                  "Every listing scanned. Documents required. Suspicious posts removed in hours.",
                ],
                [
                  "A checklist, not a chat",
                  "Tour scheduled → lease shared → move-in confirmed. Real progress, not endless DMs.",
                ],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
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
