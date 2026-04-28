import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TutorialModal } from "@/components/tutorial-modal";

export const Route = createFileRoute("/signin")({
  component: SignIn,
  head: () => ({
    meta: [
      { title: "Sign in — SubletSync" },
      { name: "description", content: "Sign in with your UT Dallas (@utdallas.edu) email. Student-verified access to every sublease on SubletSync." },
    ],
  }),
});

type Stage = "form" | "sent";

function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("form");
  const [showTutorial, setShowTutorial] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim().toLowerCase();
    if (!v) {
      setError("Enter your UTD email.");
      return;
    }
    if (!/^[^\s@]+@utdallas\.edu$/.test(v)) {
      setError("Please use your @utdallas.edu email address.");
      return;
    }
    setError(null);
    setStage("sent");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="flex-1 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-soft)] p-8 md:p-10">
          {stage === "form" ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display text-lg font-semibold">
                  s.
                </span>
                <span className="font-display text-lg font-semibold">SubletSync</span>
              </div>

              <h1 className="font-display text-4xl font-semibold text-foreground leading-[1.1]">
                Sign in with your
                <br />
                <span className="italic text-primary">UTD email.</span>
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Only verified UT Dallas students can browse or post. We'll send a one-time sign-in link — no password needed.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">UTD email</span>
                  <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 transition">
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="netid"
                      value={email.split("@")[0] ?? ""}
                      onChange={(e) => {
                        setEmail(`${e.target.value}@utdallas.edu`);
                        setError(null);
                      }}
                      className="flex-1 min-w-0 bg-transparent px-4 h-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                    <span className="pr-4 text-sm text-muted-foreground select-none">@utdallas.edu</span>
                  </div>
                </label>

                {error && (
                  <p className="text-sm text-destructive flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1-9a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 10 5Z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Verify
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <div className="flex items-center gap-3 py-2">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <button
                  type="button"
                  className="w-full h-12 rounded-full border border-border bg-background text-sm font-medium hover:bg-muted transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg className="h-4 w-4" viewBox="0 0 23 23"><path fill="#f25022" d="M1 1h10v10H1z"/><path fill="#7fba00" d="M12 1h10v10H12z"/><path fill="#00a4ef" d="M1 12h10v10H1z"/><path fill="#ffb900" d="M12 12h10v10H12z"/></svg>
                  Create account with UTD student email
                </button>

                <p className="text-xs text-muted-foreground text-center pt-2">
                  By continuing you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy</span>.
                </p>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  New here?{" "}
                  <button
                    type="button"
                    onClick={() => setShowTutorial(true)}
                    className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
                  >
                    See how it works
                  </button>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto h-14 w-14 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-5">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h1 className="font-display text-3xl font-semibold text-foreground">Check your UTD inbox</h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
                We sent a secure sign-in link to <span className="font-medium text-foreground">{email}</span>. It expires in 15 minutes.
              </p>
              <div className="mt-8 flex flex-col gap-2">
                <button
                  onClick={() => setShowTutorial(true)}
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-2"
                >
                  See how SubletSync works
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <button
                  onClick={() => setStage("form")}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Use a different email
                </button>
              </div>
            </div>
          )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Not at UTD?{" "}
            <Link to="/" className="underline hover:text-foreground">
              We're rolling out campus by campus
            </Link>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
    </div>
  );
}
