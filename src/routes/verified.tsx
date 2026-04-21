import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

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
  { n: "01", t: "Sign up with .edu", d: "We verify your university email — no exceptions." },
  { n: "02", t: "Upload student ID", d: "Manually reviewed within 24 hours. Earns your badge." },
  { n: "03", t: "Add lease documents", d: "Required for every listing. Stored securely." },
  { n: "04", t: "Listing goes live", d: "Verified student + Verified lease badges shown publicly." },
];

function Verified() {
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

      {/* Listing detail mock */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
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
                Sunny 1BR near Northside
              </h2>
              <p className="text-muted-foreground mt-2">Synergy Park · 0.4 mi from UT Dallas</p>

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

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">Posted by</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center text-primary font-display font-semibold text-lg">
                    AK
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Aisha Kim</p>
                    <p className="text-sm text-muted-foreground">UT Dallas · Junior · aisha.k@utdallas.edu ✓</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification checklist sidebar */}
            <aside className="rounded-2xl bg-cream/60 border border-border p-6 self-start">
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
