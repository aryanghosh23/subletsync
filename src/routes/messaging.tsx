import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FB_MESSENGER_CHAT_URL } from "@/lib/app-config";

export const Route = createFileRoute("/messaging")({
  component: Messaging,
  head: () => ({
    meta: [
      { title: "Messaging & Checklist — SubletSync" },
      {
        name: "description",
        content:
          "Built-in chat with a shared progress checklist. Tour scheduled, lease shared, move-in confirmed — no ghosting.",
      },
    ],
  }),
});

const MESSAGES = [
  {
    from: "marcus",
    text: "Hey Aisha! Saw your listing — the dates line up perfectly with my internship. Is the parking spot included?",
  },
  {
    from: "aisha",
    text: "Hi Marcus! Yes, one covered spot is included. Want to tour this Saturday?",
  },
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
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
          Feature 03 · Messaging
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          A chat that
          <br />
          <span className="italic">closes deals.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Every conversation comes with a shared checklist. Both sides see progress, both sides stay
          accountable. No more ghosting after "is it still available?"
        </p>
      </section>

      {/* Facebook Messenger bridge */}
      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="rounded-3xl border border-[#0084FF]/25 bg-gradient-to-br from-[#0084FF]/8 via-card to-background p-6 md:p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0084FF] text-white shadow-lg shadow-[#0084FF]/30">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.486 2 2 5.962 2 10.541c0 2.644 1.331 4.996 3.425 6.563V22l4.089-2.191c1.133.299 2.345.464 3.486.464 5.514 0 10-3.962 10-8.541S17.514 2 12 2zm.995 11.437-2.715-2.866L6.21 13.834c-.509.46-.745.127-.427-.742l2.032-5.277c.318-.87.838-.907 1.157-.078l2.153 5.902 2.715-2.866c.32-.336.827-.34 1.147-.008l4.582 4.403c.46.441.33 1.008-.29 1.257l-5.302 2.072c-.62.249-1.294.036-1.494-.427z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground">
                Continue in Facebook Messenger
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">
                Meet students where they already are. Connect your Facebook profile for a trusted
                photo and name, then keep SubletSync notifications mirrored in Messenger — without
                losing the structured checklist on our side.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={FB_MESSENGER_CHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center rounded-full bg-[#0084FF] px-5 text-sm font-semibold text-white hover:bg-[#0073e6]"
                >
                  Open Messenger thread
                </a>
                <button
                  type="button"
                  className="inline-flex h-10 items-center rounded-full border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
                  onClick={() =>
                    window.alert(
                      "Meta Login: connect your Page + Webhook in production for handoff.",
                    )
                  }
                >
                  Connect Facebook profile
                </button>
              </div>
            </div>
          </div>
        </div>
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

            {/* Quick actions */}
            <div className="px-4 py-2 border-t border-border bg-cream/30 flex gap-2 overflow-x-auto">
              {["📅 Schedule tour", "📄 Share lease", "💸 Send deposit", "📍 Share address"].map(
                (q) => (
                  <button
                    key={q}
                    className="shrink-0 rounded-full border border-border bg-background px-3 h-8 text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ),
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background flex items-center gap-2">
              <button
                className="h-10 w-10 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"
                aria-label="Attach"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </button>
              <input
                placeholder="Write a message…"
                className="flex-1 h-10 rounded-full bg-muted px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
              <button
                className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center"
                aria-label="Send"
              >
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
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
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
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${c.done ? "text-foreground" : "text-muted-foreground"}`}
                    >
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
            <div className="mt-5 space-y-2">
              <button className="w-full rounded-full bg-foreground text-background h-10 text-xs font-semibold">
                Mark "Deposit sent"
              </button>
              <button className="w-full rounded-full border border-border bg-background h-10 text-xs font-medium hover:bg-muted">
                Export chat & checklist
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Safety tips */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-3xl border border-border bg-cream/40 p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Stay safe inside the platform
          </h3>
          <ul className="mt-4 grid md:grid-cols-3 gap-4 text-sm">
            {[
              [
                "Never pay off-platform",
                "Venmo/Zelle requests are our #1 fraud signal. Keep it in-app.",
              ],
              [
                "Tour before you pay",
                "Use the 'Schedule tour' action — we timestamp it on both sides.",
              ],
              ["Report anything odd", "One tap in any chat alerts our Trust team within 4 hours."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl bg-background border border-border p-4">
                <p className="font-medium text-foreground">{t}</p>
                <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "≥40%",
              t: "Message-to-deal rate",
              d: "Conversations that hit at least one checklist milestone — vs ~12% on open marketplaces.",
            },
            {
              n: "0",
              t: "Lost threads",
              d: "Every chat is tied to a listing and a checklist. Nothing disappears into a feed.",
            },
            {
              n: "100%",
              t: "Inside the platform",
              d: "No 'text me at this number'. Safer for everyone, traceable if anything goes wrong.",
            },
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
