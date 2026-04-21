import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/messaging")({
  component: Messaging,
  head: () => ({
    meta: [
      { title: "Messaging & Checklist — SubletSync" },
      { name: "description", content: "Built-in chat with a shared progress checklist. Tour scheduled, lease shared, move-in confirmed — no ghosting." },
    ],
  }),
});

const MESSAGES = [
  { from: "marcus", text: "Hey Aisha! Saw your listing — the dates line up perfectly with my internship. Is the parking spot included?" },
  { from: "aisha", text: "Hi Marcus! Yes, one covered spot is included. Want to tour this Saturday?" },
  { from: "marcus", text: "Saturday at 2 works. Should I bring anything?" },
  { from: "aisha", text: "Just yourself! I'll have the lease draft ready to walk through." },
];

const CHECKLIST = [
  { t: "Tour scheduled", done: true, when: "Saturday, May 3 · 2:00 PM" },
  { t: "Lease shared", done: true, when: "Reviewed May 5" },
  { t: "Deposit sent", done: false, when: "Pending" },
  { t: "Move-in confirmed", done: false, when: "—" },
];

function Messaging() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Feature 03 · Messaging</p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          A chat that
          <br />
          <span className="italic">closes deals.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Every conversation comes with a shared checklist. Both sides see
          progress, both sides stay accountable. No more ghosting after "is it
          still available?"
        </p>
      </section>

      {/* Chat + checklist mock */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-[var(--shadow-lift)] grid md:grid-cols-[1fr_320px]">
          {/* Chat */}
          <div className="flex flex-col h-[560px] border-r border-border">
            {/* Header */}
            <div className="flex items-center gap-3 p-5 border-b border-border bg-cream/40">
              <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center text-primary font-display font-semibold">
                AK
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">Aisha Kim</p>
                <p className="text-xs text-muted-foreground">re: Sunny 1BR near Northside</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft text-primary px-2 py-1 text-[11px] font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Verified
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-background">
              {MESSAGES.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "marcus" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === "marcus"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background flex items-center gap-2">
              <input
                placeholder="Write a message…"
                className="flex-1 h-10 rounded-full bg-muted px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
              <button className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center" aria-label="Send">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Checklist */}
          <aside className="p-5 bg-cream/40">
            <p className="text-sm font-semibold text-foreground mb-1">Sublease checklist</p>
            <p className="text-xs text-muted-foreground mb-5">Both of you can update this</p>
            <ul className="space-y-3">
              {CHECKLIST.map((c) => (
                <li key={c.t} className="flex gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      c.done
                        ? "bg-primary text-primary-foreground"
                        : "border-2 border-border bg-background"
                    }`}
                  >
                    {c.done && (
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${c.done ? "text-foreground" : "text-muted-foreground"}`}>
                      {c.t}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{c.when}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-semibold text-foreground">2 / 4</span>
              </div>
              <div className="h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full w-1/2 bg-primary rounded-full" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "≥40%", t: "Message-to-deal rate", d: "Conversations that hit at least one checklist milestone — vs ~12% on open marketplaces." },
            { n: "0", t: "Lost threads", d: "Every chat is tied to a listing and a checklist. Nothing disappears into a feed." },
            { n: "100%", t: "Inside the platform", d: "No 'text me at this number'. Safer for everyone, traceable if anything goes wrong." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-border bg-background p-6">
              <p className="font-display text-4xl font-semibold text-primary">{s.n}</p>
              <p className="font-medium text-foreground mt-3">{s.t}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
