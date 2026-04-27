import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/fraud")({
  component: Fraud,
  head: () => ({
    meta: [
      { title: "Fraud Prevention — SubletSync" },
      { name: "description", content: "AI-powered listing review, document verification, and human moderation. Targeting <1% fraud flag rate across the platform." },
    ],
  }),
});

const FLAGGED = [
  {
    id: "L-2841",
    title: "Modern 2BR — incredible deal",
    reason: "Photos appear in 3 unrelated listings",
    confidence: 96,
    status: "Auto-removed",
    statusKind: "removed",
    when: "2 hours ago",
  },
  {
    id: "L-2837",
    title: "Quick rent, no docs needed",
    reason: "Vague description · no lease document uploaded",
    confidence: 88,
    status: "Under review",
    statusKind: "review",
    when: "4 hours ago",
  },
  {
    id: "L-2829",
    title: "Spacious room, semester stay",
    reason: "User-reported: payment requested off-platform",
    confidence: 74,
    status: "Account suspended",
    statusKind: "removed",
    when: "Yesterday",
  },
  {
    id: "L-2812",
    title: "Furnished studio, May–Aug",
    reason: "Price 62% below median for area",
    confidence: 51,
    status: "Cleared",
    statusKind: "cleared",
    when: "Yesterday",
  },
];

function StatusPill({ kind, label }: { kind: string; label: string }) {
  const styles =
    kind === "removed"
      ? "bg-destructive/10 text-destructive"
      : kind === "review"
      ? "bg-accent text-accent-foreground"
      : "bg-primary-soft text-primary";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function Fraud() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Feature 05 · Fraud prevention</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          Scams caught
          <br />
          <span className="italic">before they reach you.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Every listing is scanned by our AI, cross-checked against documents,
          and queued for human review when something feels off. Targeting
          fewer than 1% flagged listings across the platform.
        </p>
      </section>

      {/* KPI tiles */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { k: "0.6%", l: "Flag rate this week", trend: "↓ 0.2 pts", good: true },
            { k: "147", l: "Listings auto-scanned", trend: "+22 vs avg", good: true },
            { k: "9", l: "Removed by AI", trend: "↑ 3 vs avg", good: true },
            { k: "< 4h", l: "Avg review time", trend: "Within SLA", good: true },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{s.l}</p>
              <p className="font-display text-3xl font-semibold text-foreground mt-2">{s.k}</p>
              <p className={`text-xs mt-2 font-medium ${s.good ? "text-primary" : "text-destructive"}`}>{s.trend}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Flagged queue */}
          <div className="rounded-3xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between bg-cream/40">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">Flagged listings</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Live feed · auto-refreshes</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <button className="rounded-full bg-foreground text-background px-3 h-8 font-medium">All</button>
                <button className="rounded-full text-muted-foreground px-3 h-8">AI</button>
                <button className="rounded-full text-muted-foreground px-3 h-8">Reported</button>
              </div>
            </div>

            <ul className="divide-y divide-border">
              {FLAGGED.map((f) => (
                <li key={f.id} className="p-5 hover:bg-cream/30 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-mono text-muted-foreground">{f.id}</span>
                        <StatusPill kind={f.statusKind} label={f.status} />
                      </div>
                      <p className="font-medium text-foreground">{f.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{f.reason}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-border overflow-hidden">
                          <div
                            className={`h-full rounded-full ${f.confidence >= 80 ? "bg-destructive" : f.confidence >= 60 ? "bg-accent-foreground" : "bg-primary"}`}
                            style={{ width: `${f.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums">{f.confidence}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5">{f.when}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Defense-in-depth */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-border bg-foreground text-background p-6 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
              <p className="text-xs font-medium text-primary-soft uppercase tracking-wider relative">Layered defense</p>
              <h3 className="font-display text-2xl font-semibold mt-2 leading-tight relative">
                Five checks before you ever message.
              </h3>
            </div>
            {[
              { n: "01", t: "AI photo dedup", d: "Reverse-image search across the entire listing index." },
              { n: "02", t: "Document review", d: "Lease + ID verified by trust team within 24h." },
              { n: "03", t: "Price anomaly", d: "Flags listings >40% below neighborhood median." },
              { n: "04", t: "User reports", d: "One-tap report from any listing or chat." },
              { n: "05", t: "Off-platform watch", d: "NLP scan for 'pay me on Venmo' patterns." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-4 flex gap-4">
                <span className="font-display text-2xl text-primary font-semibold shrink-0 leading-none">{s.n}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{s.t}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* How reports flow */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="font-display text-3xl font-semibold text-foreground mb-8">What happens after you report</h2>
        <ol className="grid md:grid-cols-4 gap-4">
          {[
            ["< 1 min", "Report logged", "Listing is tagged and quietly hidden from new search results."],
            ["< 1 hr", "AI triage", "We re-run photo dedup, lease checks, and message-pattern scans."],
            ["< 4 hr", "Human review", "Trust team member opens the case and checks all evidence."],
            ["Resolved", "You're notified", "Action taken, explained to reporter. Appeal window opens for poster."],
          ].map(([when, t, d]) => (
            <li key={t} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">{when}</p>
              <p className="font-display text-xl font-semibold text-foreground mt-2">{t}</p>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Report a listing CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-primary-soft p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-md">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight">
              See something off?
            </h3>
            <p className="text-muted-foreground mt-2">
              One tap from any listing. Our team reviews every report — usually within 4 hours.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Fake photos", "Off-platform payment", "Too good to be true", "No lease doc", "Harassment"].map((r) => (
                <span key={r} className="rounded-full bg-background/70 border border-border px-3 py-1 text-xs font-medium text-foreground">
                  {r}
                </span>
              ))}
            </div>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background h-12 px-6 text-sm font-medium self-start md:self-auto">
            Report a listing
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
