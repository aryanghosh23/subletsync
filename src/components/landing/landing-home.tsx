import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { ListingCard } from "@/components/listing-card";
import { BentoTiltCard } from "@/components/landing/bento-tilt-card";
import { MagneticWrap, ScrollFadeIn, TapScale } from "@/components/landing/motion-primitives";
import { landingStaggerChild, landingStaggerParent } from "@/components/landing/motion-variants";
import { MarqueeStrip } from "@/components/landing/marquee-strip";
import { ProcessFlowMap } from "@/components/landing/process-flow";
import { SpotlightSubletSearch } from "@/components/landing/spotlight-sublet-search";
import {
  NORTHSIDE_HERO,
  listingThumb,
  northsideGallery,
  NORTHSIDE_PROPERTY_URL,
  NORTHSIDE_IMAGE_CREDIT,
} from "@/lib/northside-images";

function HeroBackdrop() {
  const reduce = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="landing-hero-mesh absolute inset-0 opacity-90" />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.55_0.12_168/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.55_0.12_168/0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent_75%)]"
        aria-hidden
      />
      {!reduce ? (
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,oklch(0.55_0.14_168/0.05)_50%,transparent_65%)] bg-[length:240%_100%]"
          animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 [background-image:var(--noise)] opacity-[0.18]" />
      {!reduce
        ? Array.from({ length: 36 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/40 shadow-[0_0_12px_oklch(0.55_0.14_168/0.5)]"
              style={{
                left: `${((i * 73) % 94) + 3}%`,
                top: `${((i * 41) % 88) + 6}%`,
              }}
              animate={{
                opacity: [0.12, 0.55, 0.12],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2.8 + (i % 4) * 0.35,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut",
              }}
              aria-hidden
            />
          ))
        : null}
      <div className="absolute -left-[20%] top-[15%] h-[min(50vw,420px)] w-[min(50vw,420px)] rounded-full bg-primary/25 blur-[100px]" />
      <div className="absolute -right-[18%] bottom-[5%] h-[min(55vw,480px)] w-[min(55vw,480px)] rounded-full bg-accent/35 blur-[90px]" />
    </div>
  );
}

export function LandingHome() {
  const reduce = useReducedMotion();

  return (
    <>
      <section className="landing-hero relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-8">
        <HeroBackdrop />

        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] gap-12 px-6 pb-6 pt-6 md:grid-cols-2 md:gap-12 md:pt-4">
          <motion.div
            className="flex flex-col justify-center"
            variants={landingStaggerParent}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={landingStaggerChild}>
              <div className="landing-eyebrow mb-7 inline-flex max-w-fit items-center gap-2.5 rounded-full border border-primary/20 bg-card/65 px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground shadow-lg shadow-primary/10 backdrop-blur-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Student housing OS · UT Dallas
              </div>
            </motion.div>

            <motion.h1
              variants={landingStaggerChild}
              className="font-sans text-[2.55rem] font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]"
            >
              <span className="block">
                Housing moves{" "}
                <span className="landing-text-gradient relative inline-block italic">
                  fast.
                  <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-primary/20 blur-sm" />
                </span>
              </span>
              <span className="mt-1 block text-foreground/88">
                Trust moves{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-foreground/75 bg-clip-text italic text-transparent">
                  first.
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={landingStaggerChild}
              className="mt-7 max-w-lg text-lg font-medium leading-relaxed text-muted-foreground"
            >
              SubletSync pairs{" "}
              <strong className="font-semibold text-foreground">campus verification</strong>,{" "}
              <strong className="font-semibold text-foreground">curated matching</strong>, and a{" "}
              <strong className="font-semibold text-foreground">deal checklist</strong>
              —the trust layer students already expect from a Series A product.
            </motion.p>

            <motion.div
              variants={landingStaggerChild}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticWrap strength={0.32}>
                <TapScale>
                  <Link
                    to="/marketplace"
                    className="landing-cta-primary inline-flex h-14 items-center gap-2 rounded-full px-8 text-sm font-bold tracking-wide text-primary-foreground shadow-2xl transition-shadow hover:shadow-primary/40"
                  >
                    Explore marketplace
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </TapScale>
              </MagneticWrap>
              <MagneticWrap strength={0.2}>
                <TapScale>
                  <Link
                    to="/smart-matching"
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-foreground/12 bg-card/75 px-7 text-sm font-bold text-foreground backdrop-blur-2xl transition-colors hover:border-primary/35 hover:bg-card"
                  >
                    <Target className="h-4 w-4 text-primary" strokeWidth={2.25} />
                    Top 5 matches
                  </Link>
                </TapScale>
              </MagneticWrap>
            </motion.div>

            <motion.dl
              variants={landingStaggerChild}
              className="mt-12 grid max-w-md grid-cols-3 gap-3 sm:gap-4"
            >
              {[
                { k: "≤10d", v: "Avg. match" },
                { k: "85%+", v: "Verified" },
                { k: "<1%", v: "Fraud SLA" },
              ].map((s) => (
                <TapScale key={s.v}>
                  <div className="landing-stat-tile rounded-2xl border border-border/70 bg-card/55 px-3 py-4 text-center shadow-md backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg sm:px-4">
                    <dt className="font-sans text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                      {s.k}
                    </dt>
                    <dd className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {s.v}
                    </dd>
                  </div>
                </TapScale>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            className="relative flex items-center md:justify-end"
            initial={reduce ? false : { opacity: 0, x: 36 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="landing-hero-visual relative w-full max-w-lg md:max-w-none">
              <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.55_0.14_168/0.35),transparent_55%),radial-gradient(ellipse_at_80%_80%,oklch(0.88_0.1_85/0.3),transparent_50%)] opacity-90 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-card/30 shadow-[0_40px_100px_-28px_oklch(0.2_0.08_168/0.45)] ring-1 ring-white/40 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-primary/35 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay [background-image:var(--noise)] opacity-25" />
                <img
                  src={NORTHSIDE_HERO}
                  alt="Northside at UT Dallas — resort-style pool and lounge deck"
                  width={1536}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/6] md:min-h-[460px]"
                  fetchPriority="high"
                />
              </div>
              <motion.div
                className="absolute -left-6 bottom-12 z-20 max-w-[240px] rounded-2xl border border-white/25 bg-card/85 p-4 shadow-2xl backdrop-blur-2xl sm:bottom-16 md:-left-10"
                initial={reduce ? false : { y: 16, opacity: 0 }}
                whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.55 }}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <ScanLine className="h-4 w-4" />
                  Live verification
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Lease + .edu matched to listing in 2:14
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="landing-progress-shimmer h-full w-4/5 rounded-full bg-primary" />
                </div>
              </motion.div>
              <motion.div
                className="absolute -right-2 top-8 z-20 rounded-2xl border border-border/50 bg-card/90 px-4 py-3 shadow-2xl backdrop-blur-2xl md:-right-4"
                initial={reduce ? false : { y: -12, opacity: 0 }}
                whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.55 }}
              >
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wide">Match engine</span>
                </div>
                <p className="mt-1 font-sans text-3xl font-bold tabular-nums text-foreground">
                  94%
                </p>
                <p className="text-xs font-medium text-muted-foreground">Budget · dates · vibe</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-20 mx-auto mt-4 w-full max-w-[720px] px-6">
          <ScrollFadeIn y={16}>
            <p className="mb-4 text-center font-sans text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Magic search
            </p>
            <SpotlightSubletSearch />
          </ScrollFadeIn>
        </div>

        <a
          href="#proof"
          className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          Why teams pick us
          <ChevronDown className="h-5 w-5 opacity-70" strokeWidth={2} />
        </a>
      </section>

      <MarqueeStrip />

      <section id="proof" className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <ScrollFadeIn>
          <p className="text-center font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Bento product story
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center font-sans text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Everything a deck promises —{" "}
            <span className="italic text-primary">shipping in the UI.</span>
          </h2>
        </ScrollFadeIn>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:gap-5">
          <ScrollFadeIn className="md:col-span-7 md:row-span-2" delay={0.06}>
            <BentoTiltCard
              className="min-h-[300px] p-8 md:min-h-[340px]"
              glowClassName="bg-[radial-gradient(ellipse_at_70%_0%,oklch(0.55_0.14_168/0.2),transparent_55%)]"
              stats={[
                { label: "Time saved", value: "4.2h" },
                { label: "CTR lift", value: "+38%" },
                { label: "Trust delta", value: "2.1×" },
              ]}
            >
              <Zap className="relative h-10 w-10 text-primary" strokeWidth={1.5} />
              <div className="relative mt-6 max-w-lg pb-16 md:pb-20">
                <h3 className="font-sans text-2xl font-bold text-foreground md:text-3xl">
                  Active discovery
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
                  Preferences in → ranked Top 5 verified units out. Doom-scroll becomes a guided
                  funnel with measurable cohorts.
                </p>
              </div>
              <Link
                to="/smart-matching"
                className="relative mt-auto inline-flex items-center gap-2 pb-2 text-sm font-bold text-primary hover:gap-3"
              >
                Open matching demo <ArrowRight className="h-4 w-4" />
              </Link>
            </BentoTiltCard>
          </ScrollFadeIn>

          <ScrollFadeIn className="md:col-span-5" delay={0.1}>
            <BentoTiltCard
              className="min-h-[200px] p-7"
              glowClassName="bg-[radial-gradient(circle_at_100%_100%,oklch(0.55_0.12_168/0.18),transparent_50%)]"
              stats={[
                { label: "Bad actors", value: "-94%" },
                { label: "ID SLA", value: "<2m" },
                { label: "Lease AI", value: "ON" },
              ]}
            >
              <ShieldCheck className="h-9 w-9 text-primary" strokeWidth={1.5} />
              <h3 className="mt-5 font-sans text-xl font-bold text-foreground">Trust-by-design</h3>
              <p className="mt-2 pb-14 text-sm font-medium leading-relaxed text-muted-foreground">
                .edu gate, ID + lease artifacts, and fraud cues before messages fire.
              </p>
            </BentoTiltCard>
          </ScrollFadeIn>

          <ScrollFadeIn className="md:col-span-5" delay={0.14}>
            <BentoTiltCard
              className="min-h-[200px] bg-gradient-to-br from-card to-primary-soft/35 p-7"
              glowClassName="bg-[radial-gradient(circle_at_0%_0%,oklch(0.88_0.1_85/0.25),transparent_55%)]"
              stats={[
                { label: "Checklists", value: "live" },
                { label: "Handoff", value: "FB OK" },
                { label: "SLA", value: "<1h" },
              ]}
            >
              <MessageCircle className="h-9 w-9 text-primary" strokeWidth={1.5} />
              <h3 className="mt-5 font-sans text-xl font-bold text-foreground">Accountable chat</h3>
              <p className="mt-2 pb-14 text-sm font-medium leading-relaxed text-muted-foreground">
                Messenger optional — SubletSync still owns tour → lease → deposit → keys.
              </p>
              <Link to="/messaging" className="text-sm font-bold text-primary hover:underline">
                Conversation UX →
              </Link>
            </BentoTiltCard>
          </ScrollFadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24 md:pb-28">
        <ProcessFlowMap />
      </section>

      <section className="border-y border-border/50 bg-foreground/[0.02] py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <ScrollFadeIn>
            <h2 className="text-center font-sans text-3xl font-bold text-foreground md:text-4xl">
              Why SubletSync wins the slide next to{" "}
              <span className="font-semibold italic text-muted-foreground">
                Marketplace & Zillow
              </span>
            </h2>
          </ScrollFadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "SubletSync",
                tag: "Student-native",
                highlight: true,
                rows: [
                  [".edu + ID verification", true],
                  ["Top 5 match engine", true],
                  ["Deal checklist in-product", true],
                  ["Short-term / roommate fit", true],
                ],
              },
              {
                name: "Facebook Marketplace",
                tag: "Open market",
                highlight: false,
                rows: [
                  ["Campus verification", false],
                  ["Personalized match rank", false],
                  ["Structured close flow", false],
                  ["Short-term clarity", "partial"],
                ],
              },
              {
                name: "Zillow",
                tag: "Long-term rentals",
                highlight: false,
                rows: [
                  ["Institutional trust", true],
                  ["Student sublease depth", false],
                  ["Semester timing", false],
                  ["Roommate DNA", false],
                ],
              },
            ].map((col, idx) => (
              <ScrollFadeIn key={col.name} delay={0.06 * idx}>
                <TapScale>
                  <div
                    className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                      col.highlight
                        ? "border-primary/50 bg-gradient-to-b from-primary/10 via-card to-card ring-2 ring-primary/20 shadow-[0_28px_56px_-24px_oklch(0.45_0.12_168/0.25)]"
                        : "border-border/80 bg-card/85 backdrop-blur-md"
                    }`}
                  >
                    {col.highlight ? (
                      <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-md">
                        Recommended
                      </span>
                    ) : null}
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {col.tag}
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-bold text-foreground">
                      {col.name}
                    </h3>
                    <ul className="mt-6 flex flex-1 flex-col gap-3">
                      {col.rows.map(([label, ok]) => (
                        <li key={String(label)} className="flex items-start gap-2.5 text-sm">
                          {ok === true ? (
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                              strokeWidth={2.5}
                            />
                          ) : null}
                          {ok === false ? (
                            <X
                              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60"
                              strokeWidth={2.5}
                            />
                          ) : null}
                          {ok === "partial" ? (
                            <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 border-amber-500/80" />
                          ) : null}
                          <span className="font-medium text-foreground/90">{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TapScale>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <ScrollFadeIn>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Live inventory snapshot
            </p>
            <h2 className="mt-2 font-sans text-3xl font-bold text-foreground md:text-4xl">
              Verified near campus
            </h2>
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.08}>
            <TapScale>
              <Link
                to="/marketplace"
                className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-5 py-2.5 text-sm font-bold shadow-md backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-lg"
              >
                Open marketplace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </TapScale>
          </ScrollFadeIn>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              img: listingThumb.northside1,
              title: "Sunny 1BR at Northside",
              loc: "Northside · 0.3 mi",
              price: "$780",
              dates: "May 15 – Aug 10 · Furnished",
              badges: ["Verified", "Lease on file"],
              score: 94,
            },
            {
              img: listingThumb.waterview,
              title: "Quiet studio · Waterview",
              loc: "Waterview · 0.8 mi",
              price: "$650",
              dates: "Jun 1 – Aug 20",
              badges: ["Verified"],
              score: 88,
            },
            {
              img: listingThumb.uv,
              title: "Room in 2BR — UV",
              loc: "University Village · 0.2 mi",
              price: "$540",
              dates: "May 20 – Aug 5",
              badges: ["Verified", "Lease on file"],
              score: 82,
            },
          ].map((l, i) => (
            <ScrollFadeIn key={l.title} delay={0.07 * i}>
              <TapScale>
                <Link to="/marketplace" className="group block">
                  <ListingCard
                    image={l.img}
                    title={l.title}
                    location={l.loc}
                    price={l.price}
                    dates={l.dates}
                    badges={l.badges}
                    matchScore={l.score}
                  />
                </Link>
              </TapScale>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-cream/25 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <ScrollFadeIn>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  <MapPin className="h-4 w-4" /> Northside at UTD
                </p>
                <h2 className="mt-2 max-w-xl font-sans text-3xl font-bold text-foreground md:text-4xl">
                  Real amenity photography—deck meets walkthrough.
                </h2>
              </div>
              <a
                href={NORTHSIDE_PROPERTY_URL}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm font-bold text-primary hover:underline"
              >
                Source: liveatnorthside.com →
              </a>
            </div>
          </ScrollFadeIn>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {northsideGallery.slice(0, 4).map((img, i) => (
              <ScrollFadeIn
                key={img.src}
                delay={0.06 * i}
                className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <TapScale>
                  <figure
                    className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-md ${
                      i === 0 ? "aspect-[4/3] md:aspect-auto md:min-h-[340px]" : "aspect-[4/5]"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/95 via-foreground/40 to-transparent p-4 pt-16">
                      <span className="text-xs font-semibold text-background">{img.caption}</span>
                    </figcaption>
                  </figure>
                </TapScale>
              </ScrollFadeIn>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground md:text-left">
            {NORTHSIDE_IMAGE_CREDIT}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-24 md:py-28">
        <ScrollFadeIn>
          <div className="landing-closer relative overflow-hidden rounded-[2rem] px-8 py-14 text-center md:px-16 md:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.55_0.14_168/0.45),transparent)]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-primary-soft">
                Investor-ready narrative
              </p>
              <h2 className="mt-4 font-sans text-3xl font-bold leading-tight text-background md:text-4xl">
                Show them the trust layer students are{" "}
                <span className="italic text-primary-soft">already scrolling for.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-background/75 md:text-base">
                Pair this UI with your TAM slide — every pixel reinforces verification,
                speed-to-match, and retention hooks.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <MagneticWrap strength={0.18}>
                  <TapScale>
                    <Link
                      to="/signin"
                      className="inline-flex h-14 items-center rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-xl"
                    >
                      Try the .edu flow
                    </Link>
                  </TapScale>
                </MagneticWrap>
                <TapScale>
                  <Link
                    to="/fraud"
                    className="inline-flex h-14 items-center rounded-full border-2 border-background/25 bg-transparent px-8 text-sm font-bold text-background backdrop-blur-sm transition-colors hover:bg-background/10"
                  >
                    Trust & safety deck
                  </Link>
                </TapScale>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>
    </>
  );
}
