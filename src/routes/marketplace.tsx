import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { marketplaceListings, type ListingCategory } from "@/lib/marketplace-listings";
import { MarketplaceBrowseMap } from "@/components/marketplace-browse-map";
import {
  northsideGallery,
  NORTHSIDE_PROPERTY_URL,
  NORTHSIDE_IMAGE_CREDIT,
} from "@/lib/northside-images";
import { FB_MESSENGER_CHAT_URL } from "@/lib/app-config";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/marketplace")({
  component: Marketplace,
  head: () => ({
    meta: [
      { title: "Marketplace — SubletSync" },
      {
        name: "description",
        content:
          "Verified UT Dallas subleases — Northside, UV, Waterview. Filter by price, category, and distance.",
      },
    ],
  }),
});

const CATEGORIES: { id: ListingCategory | "all"; label: string }[] = [
  { id: "all", label: "All listings" },
  { id: "northside", label: "Northside" },
  { id: "studio", label: "Studio" },
  { id: "shared", label: "Shared room" },
  { id: "summer", label: "Summer" },
  { id: "loft", label: "Loft" },
];

function Marketplace() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ListingCategory | "all">("all");
  const [maxPrice, setMaxPrice] = useState(1200);
  const [maxDist, setMaxDist] = useState(1.5);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return marketplaceListings.filter((l) => {
      if (l.priceNum > maxPrice) return false;
      if (l.distanceMi > maxDist) return false;
      if (cat !== "all" && !l.categories.includes(cat)) return false;
      if (needle && !`${l.title} ${l.location} ${l.description}`.toLowerCase().includes(needle))
        return false;
      return true;
    });
  }, [q, cat, maxPrice, maxDist]);

  const mapExplorePool = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const maxDistExplore = 3;
    return marketplaceListings.filter((l) => {
      if (l.priceNum > maxPrice) return false;
      if (l.distanceMi > maxDistExplore) return false;
      if (cat !== "all" && !l.categories.includes(cat)) return false;
      if (needle && !`${l.title} ${l.location} ${l.description}`.toLowerCase().includes(needle))
        return false;
      return true;
    });
  }, [q, cat, maxPrice]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav />

      {/* Hero strip */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="hero-backdrop absolute inset-0 opacity-90" />
        <div className="animate-ss-pulse-glow absolute top-10 right-[15%] -z-0 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
        <div className="absolute inset-0 -z-0 opacity-30 [background-image:var(--noise)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="animate-ss-reveal mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft/60 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Open marketplace · verified .edu layer
              </p>
              <h1 className="animate-ss-reveal font-display text-4xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-6xl">
                Find your next sublease
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text italic text-transparent">
                  {" "}
                  without the noise.
                </span>
              </h1>
              <p
                className="animate-ss-reveal mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
                style={{ animationDelay: "0.12s" }}
              >
                Thousands of student moves flow through the same filters you already know from
                Zillow — plus categories that matter for short-term UTD housing.
              </p>
              <div
                className="animate-ss-reveal mt-6 flex flex-wrap gap-3"
                style={{ animationDelay: "0.2s" }}
              >
                <Link
                  to="/smart-matching"
                  className="btn-shimmer inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold text-background shadow-lg transition-transform hover:scale-[1.02]"
                >
                  Get Top 5 matches
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    toast.success(
                      "We'll ping you when new Northside listings match your saved filters.",
                    )
                  }
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/80 px-5 text-sm font-medium backdrop-blur hover:bg-card transition-colors"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Simulate alert
                </button>
              </div>
            </div>
            {/* Map-style card */}
            <div className="animate-ss-reveal w-full max-w-xl rounded-3xl border border-border/80 bg-card/90 p-5 shadow-[var(--shadow-lift)] backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Live map · Richardson / UTD
              </p>
              <div className="mt-4">
                <MarketplaceBrowseMap listings={filtered} explorePool={mapExplorePool} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Northside gallery */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Northside at UTD
            </h2>
            <p className="text-muted-foreground mt-1 max-w-lg text-sm leading-relaxed">
              Representative photography of the walkable district next to campus — where many summer
              and internship subleases concentrate.
            </p>
          </div>
          <a
            href={FB_MESSENGER_CHAT_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-primary hover:underline shrink-0"
          >
            Chat on Messenger →
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {northsideGallery.slice(0, 6).map((img, i) => (
            <figure
              key={img.src}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm",
                i === 0 &&
                  "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[280px]",
                i !== 0 && "aspect-[4/3]",
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 to-transparent p-4 pt-12">
                <p className="text-xs font-medium text-background">{img.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
          <p>{NORTHSIDE_IMAGE_CREDIT}</p>
          <a
            href={NORTHSIDE_PROPERTY_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Visit liveatnorthside.com
          </a>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24 flex-1 w-full">
        <div className="rounded-3xl border border-border bg-card p-5 md:p-6 shadow-[var(--shadow-soft)] mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search neighborhood, amenity, or keyword…"
                className="h-11 pl-9 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="font-medium text-foreground">{filtered.length}</span> results
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                className={cn(
                  "rounded-full border px-4 h-9 text-sm font-medium transition-colors",
                  cat === c.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Max rent / mo
              </p>
              <Slider
                min={400}
                max={1800}
                step={25}
                value={[maxPrice]}
                onValueChange={(v) => setMaxPrice(v[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">Up to ${maxPrice}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Max distance from UTD
              </p>
              <Slider
                min={0.25}
                max={3}
                step={0.05}
                value={[maxDist]}
                onValueChange={(v) => setMaxDist(v[0])}
              />
              <p className="text-xs text-muted-foreground mt-1">Within {maxDist.toFixed(2)} mi</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((l) => (
            <Link key={l.id} to="/verified" className="block group">
              <ListingCard
                image={l.image}
                title={l.title}
                location={l.location}
                price={l.price}
                dates={l.dates}
                badges={l.badges}
              />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border py-16 text-center">
            <p className="font-display text-xl font-semibold text-foreground">
              No listings in this slice
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Widen price or distance — or clear search.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={() => {
                setQ("");
                setCat("all");
                setMaxPrice(1200);
                setMaxDist(3);
              }}
            >
              Reset
            </Button>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
