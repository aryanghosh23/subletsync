import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { TutorialModal } from "@/components/tutorial-modal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { FB_OAUTH_CONNECT_URL, FB_MESSENGER_CHAT_URL } from "@/lib/app-config";
import { toast } from "sonner";

export const Route = createFileRoute("/signin")({
  component: SignIn,
  head: () => ({
    meta: [
      { title: "Sign in — SubletSync" },
      {
        name: "description",
        content:
          "Sign in with your UT Dallas (@utdallas.edu) email. Student-verified access to every sublease on SubletSync.",
      },
    ],
  }),
});

type Stage = "form" | "otp" | "done";

const DEMO_OTP_HINT = "424242";

function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>("form");
  const [otp, setOtp] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const startOtpStage = () => {
    setStage("otp");
    setOtp("");
    setResendIn(45);
    toast.message("Verification code sent", {
      description: `Check ${email} — demo code ${DEMO_OTP_HINT} works instantly.`,
    });
  };

  const onSubmitEmail = (e: FormEvent) => {
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
    startOtpStage();
  };

  const onSubmitOtp = (e: FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter the 6-digit code from your inbox.");
      return;
    }
    setError(null);
    setStage("done");
    toast.success("UTD email verified", { description: "Student-only browsing unlocked." });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      <section className="flex-1 flex items-center justify-center px-6 py-12 md:py-16">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-card border border-border shadow-[var(--shadow-soft)] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="relative">
              {stage === "form" && (
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
                    Two-step verification: magic link + one-time campus code. Only @utdallas.edu
                    addresses can proceed — same trust bar as a .edu SSO gate.
                  </p>

                  <form onSubmit={onSubmitEmail} className="mt-8 space-y-4" noValidate>
                    <label className="block">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                        UTD email
                      </span>
                      <div className="mt-1.5 flex items-center rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 transition">
                        <input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="netid"
                          value={email.split("@")[0] ?? ""}
                          onChange={(e) => {
                            setEmail(`${e.target.value.replace(/@.*$/, "")}@utdallas.edu`);
                            setError(null);
                          }}
                          className="flex-1 min-w-0 bg-transparent px-4 h-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                        />
                        <span className="pr-4 text-sm text-muted-foreground select-none">
                          @utdallas.edu
                        </span>
                      </div>
                    </label>

                    {error && (
                      <p className="text-sm text-destructive flex items-center gap-1.5">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1-9a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-4.5A.75.75 0 0 0 10 5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full h-12 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      Send secure code
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
                    </button>

                    <div className="rounded-2xl border border-border bg-cream/40 p-4">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Facebook profile
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        Connect Messenger so hosts see your real campus profile photo and you can
                        continue threads where you already spend time.
                      </p>
                      <a
                        href={`${FB_OAUTH_CONNECT_URL}?client_id=&redirect_uri=&scope=public_profile,email&response_type=token`}
                        onClick={(e) => {
                          e.preventDefault();
                          toast.message("Facebook OAuth", {
                            description: "Wire your App ID in production — UI is ready.",
                          });
                        }}
                        className="flex items-center justify-center gap-2 w-full h-11 rounded-full border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Continue with Facebook
                      </a>
                    </div>

                    <div className="flex items-center gap-3 py-1">
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-xs text-muted-foreground">or Messenger-only</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>

                    <a
                      href={FB_MESSENGER_CHAT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full h-12 rounded-full border-2 border-[#0084FF]/40 bg-[#0084FF]/5 text-sm font-medium items-center justify-center gap-2 text-[#0084FF] hover:bg-[#0084FF]/10 transition-colors"
                    >
                      Open SubletSync on Messenger
                    </a>

                    <p className="text-xs text-muted-foreground text-center pt-2">
                      By continuing you agree to our <span className="underline">Terms</span> and{" "}
                      <span className="underline">Privacy</span>.
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
              )}

              {stage === "otp" && (
                <form onSubmit={onSubmitOtp} className="space-y-6">
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-2">
                    <svg
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h1 className="font-display text-3xl font-semibold text-foreground">
                      Enter campus code
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Sent to <span className="font-medium text-foreground">{email}</span>
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(v) => {
                        setOtp(v);
                        setError(null);
                      }}
                      containerClassName="gap-2"
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="h-12 w-10 rounded-lg text-base font-semibold border-primary/20"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    Demo quick path:{" "}
                    <button
                      type="button"
                      className="font-mono font-semibold text-primary"
                      onClick={() => setOtp(DEMO_OTP_HINT)}
                    >
                      {DEMO_OTP_HINT}
                    </button>
                  </p>

                  {error && <p className="text-sm text-destructive text-center">{error}</p>}

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
                  >
                    Verify & continue
                  </button>

                  <div className="flex flex-col items-center gap-2 text-sm">
                    <button
                      type="button"
                      disabled={resendIn > 0}
                      onClick={() => {
                        if (resendIn > 0) return;
                        startOtpStage();
                        toast.message("Code resent");
                      }}
                      className="text-primary font-medium disabled:text-muted-foreground disabled:no-underline underline underline-offset-2"
                    >
                      {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStage("form");
                        setError(null);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Use a different email
                    </button>
                  </div>
                </form>
              )}

              {stage === "done" && (
                <div className="text-center py-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-5 shadow-lg shadow-primary/25">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h1 className="font-display text-3xl font-semibold text-foreground">
                    You're verified
                  </h1>
                  <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    Your @utdallas.edu email is confirmed. Enable Messenger and Facebook profile
                    sync anytime from settings — for now, head to the marketplace.
                  </p>
                  <div className="mt-8 flex flex-col gap-2">
                    <Link
                      to="/marketplace"
                      className="w-full h-12 rounded-full bg-foreground text-background text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-foreground/90"
                    >
                      Browse marketplace
                    </Link>
                    <Link
                      to="/smart-matching"
                      className="w-full h-12 rounded-full border border-border bg-background text-sm font-medium inline-flex items-center justify-center hover:bg-muted"
                    >
                      See Top 5 matches
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
