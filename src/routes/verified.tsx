import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import img1 from "@/assets/building-northside.jpg";
import img2 from "@/assets/building-northside-loft.jpg";
import img3 from "@/assets/building-waterview.jpg";
import img4 from "@/assets/building-university-village.jpg";

export const Route = createFileRoute("/verified")({
  component: Verified,
  head: () => ({
    meta: [
      { title: "Verified Listings — SubletSync" },
      { name: "description", content: "Every SubletSync listing is backed by .edu verification, student ID, and lease documents. Trust, by default." },
    ],
  }),
});

const STEPS = [
  { n: "01", t: "Sign up with .edu", d: "We verify your UT Dallas email — no exceptions." },
  { n: "02", t: "Upload student ID", d: "Manually reviewed within 24 hours. Earns your badge." },
  { n: "03", t: "Add lease documents", d: "Required for every listing. Stored securely." },
  { n: "04", t: "Listing goes live", d: "Verified student + Verified lease badges shown publicly." },
];

const AMENITIES = [
  { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Full kitchen" },
  { icon: "M5 12h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7M9 16h6", label: "In-unit laundry" },
  { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Fast Wi-Fi incl." },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Keyed entry" },
  { icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3", label: "Quiet floor" },
  { icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", label: "Covered parking" },
  { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064", label: "Walk to campus" },
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Friendly roommate" },
];

const REVIEWS = [
  { by: "Jordan M.", role: "Previous sublessee · Fall 2024", stars: 5, text: "Aisha was organized and responsive. Unit was exactly as pictured, 5-minute walk to ECSW. Lease handoff took one afternoon." },
  { by: "Priya S.", role: "Neighbor · Verified resident", stars: 5, text: "Quiet floor, secure entry, and the parking is legit covered. Would recommend anyone from the CS cohort." },
];

function Verified() {
  const [activeImg, setActiveImg] = useState(0);
  const gallery = [img1, img2, img3, img4];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Feature 02 · Verified listings</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          Every listing,
          <br />
          <span className="italic">backed by proof.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          On Facebook Marketplace, you're trusting a stranger. On SubletSync,
          every poster has a verified .edu email, a student ID on file, and a
          real lease document tied to the unit.
        </p>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid md:grid-cols-[1fr_220px] gap-3">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-muted">
            <img
              src={gallery[activeImg]}
              alt="Apartment exterior near UT Dallas"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur text-foreground px-3 py-1.5 text-xs font-semibold">
              <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>
              GPS-matched to address
            </span>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-1 gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative rounded-2xl overflow-hidden aspect-square md:aspect-[4/3] bg-muted transition-all ${
                  i === activeImg ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-80 hover:opacity-100"
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listing detail */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-[var(--shadow-soft)]">
          <div className="grid md:grid-cols-[1fr_320px] gap-10">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1.5 text-xs font-semibold">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>
                  Verified student
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1.5 text-xs font-semibold">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" /></svg>
                  Lease on file
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground px-3 py-1.5 text-xs font-semibold">
                  AI scan passed
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                Sunny 1BR at Northside
              </h2>
              <p className="text-muted-foreground mt-2">Northside Residences · 0.3 mi from UT Dallas</p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
                {[
                  ["Rent", "$780/mo"],
                  ["Dates", "May 15 – Aug 10"],
                  ["Furnished", "Yes"],
                  ["Roommate", "None"],
                ].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{l}</p>
                    <p className="text-sm font-medium text-foreground mt-1">{v}</p>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">What's included</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AMENITIES.map((a) => (
                    <div key={a.label} className="rounded-xl border border-border bg-background px-3 py-3 flex items-center gap-2">
                      <svg className="h-4 w-4 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                      </svg>
                      <span className="text-xs font-medium text-foreground">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mt-10">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">Getting to campus</h3>
                <ul className="space-y-2.5">
                  {[
                    ["Walk to ECSW", "6 min"],
                    ["Comet Cruiser stop", "1 min"],
                    ["Northside retail (CAVA, Starbucks)", "3 min"],
                    ["Richardson DART station", "9 min by car"],
                  ].map(([p, t]) => (
                    <li key={p} className="flex items-center justify-between rounded-lg bg-cream/50 px-4 py-2.5">
                      <span className="text-sm text-foreground">{p}</span>
                      <span className="text-sm font-medium text-primary">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-semibold text-foreground">Reviews from peers</h3>
                  <span className="text-sm text-muted-foreground">
                    <span className="text-foreground font-semibold">4.9</span> · 12 reviews
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {REVIEWS.map((r) => (
                    <div key={r.by} className="rounded-2xl border border-border bg-background p-5">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: r.stars }).map((_, i) => (
                          <svg key={i} className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 0 0-.364 1.118l1.287 3.957c.299.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 0 0-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.287-3.957z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">"{r.text}"</p>
                      <p className="text-xs text-muted-foreground mt-3">{r.by} · <span>{r.role}</span></p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">Posted by</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center text-primary font-display font-semibold text-lg">
                    AK
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Aisha Kim</p>
                    <p className="text-sm text-muted-foreground">UT Dallas · Junior · aisha.k@utdallas.edu ✓</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-full border border-border bg-background px-4 h-10 text-sm font-medium hover:bg-muted">
                      Tour
                    </button>
                    <button className="rounded-full bg-foreground text-background px-4 h-10 text-sm font-medium hover:bg-foreground/90">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification checklist sidebar */}
            <aside className="rounded-2xl bg-cream/60 border border-border p-6 self-start md:sticky md:top-24">
              <p className="text-sm font-semibold text-foreground mb-4">Verification record</p>
              <ul className="space-y-3 text-sm">
                {[
                  ".edu email confirmed",
                  "Student ID uploaded",
                  "Lease document uploaded",
                  "AI fraud scan: clean",
                  "Photos GPS-matched to address",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-foreground">
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 pt-4 border-t border-border text-xs text-muted-foreground">
                Last reviewed by SubletSync Trust Team · 2 days ago
              </p>
              <button className="mt-4 w-full rounded-full bg-primary text-primary-foreground h-10 text-sm font-semibold">
                Request a tour
              </button>
              <button className="mt-2 w-full rounded-full border border-border bg-background h-10 text-sm font-medium hover:bg-muted">
                Save listing
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">
          How a listing earns its badge
        </h2>
        <ol className="grid md:grid-cols-4 gap-6">
          {STEPS.map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-background p-6">
              <span className="font-display text-3xl text-primary font-semibold">{s.n}</span>
              <h3 className="font-display text-xl text-foreground font-semibold mt-3">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </div>
  );
}
