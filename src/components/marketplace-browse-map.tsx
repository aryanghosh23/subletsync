import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { APIProvider, InfoWindow, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";
import type { MarketplaceListing } from "@/lib/marketplace-listings";
import { cn } from "@/lib/utils";

const UTD_CAMPUS = { lat: 32.9858, lng: -96.7501 };

/** Zoomed out at or below this level, show supplemental pins from `explorePool`. */
const ZOOM_SHOW_EXTRA_PINS = 13;

function expandBounds(points: { lat: number; lng: number }[]) {
  if (points.length === 0) return null;
  let n = points[0]!.lat;
  let s = points[0]!.lat;
  let e = points[0]!.lng;
  let w = points[0]!.lng;
  for (const p of points) {
    n = Math.max(n, p.lat);
    s = Math.min(s, p.lat);
    e = Math.max(e, p.lng);
    w = Math.min(w, p.lng);
  }
  const pad = 0.007;
  if (n - s < 0.002) {
    n += pad / 2;
    s -= pad / 2;
  }
  if (e - w < 0.002) {
    e += pad / 2;
    w -= pad / 2;
  }
  return { north: n + pad, south: s - pad, east: e + pad, west: w - pad };
}

function PanToSelection({ position }: { position: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !position) return;
    map.panTo(position);
    const z = map.getZoom();
    if (z !== undefined && z < 15) map.setZoom(15);
  }, [map, position]);
  return null;
}

function TrackZoom({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const update = () => {
      const z = map.getZoom();
      if (z !== undefined) onZoom(z);
    };
    update();
    const a = map.addListener("zoom_changed", update);
    const b = map.addListener("idle", update);
    return () => {
      a.remove();
      b.remove();
    };
  }, [map, onZoom]);
  return null;
}

function BrowseMapInner({
  listings,
  explorePool,
  selectedId,
  onSelect,
}: {
  listings: MarketplaceListing[];
  explorePool: MarketplaceListing[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}) {
  const [zoom, setZoom] = useState(14);
  const onZoom = useCallback((z: number) => setZoom(z), []);

  const primaryIds = useMemo(() => new Set(listings.map((l) => l.id)), [listings]);

  const extraExplore = useMemo(
    () => explorePool.filter((l) => !primaryIds.has(l.id)),
    [explorePool, primaryIds],
  );

  const showExplorePins = zoom <= ZOOM_SHOW_EXTRA_PINS && extraExplore.length > 0;

  const displayListings = useMemo(() => {
    if (!showExplorePins) return listings;
    return [...listings, ...extraExplore];
  }, [listings, extraExplore, showExplorePins]);

  const bounds = useMemo(() => {
    const pts =
      listings.length > 0 ? [...listings.map((l) => l.position), UTD_CAMPUS] : [UTD_CAMPUS];
    return expandBounds(pts);
  }, [listings]);

  const selected = displayListings.find((l) => l.id === selectedId) ?? null;
  const selectedIsPrimary = selected ? primaryIds.has(selected.id) : false;

  const mapProps =
    bounds && listings.length > 0
      ? {
          defaultBounds: { ...bounds, padding: 52 },
        }
      : {
          defaultCenter: UTD_CAMPUS,
          defaultZoom: 14,
        };

  return (
    <Map
      className="size-full min-h-[280px] md:min-h-[320px]"
      gestureHandling="cooperative"
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl
      colorScheme="LIGHT"
      {...mapProps}
    >
      <TrackZoom onZoom={onZoom} />
      <PanToSelection position={selected?.position ?? null} />
      <Marker
        position={UTD_CAMPUS}
        title="The University of Texas at Dallas"
        label={{
          text: "UTD",
          color: "#ffffff",
          fontSize: "10px",
          fontWeight: "700",
        }}
        zIndex={30}
      />
      {displayListings.map((l, i) => {
        const isSupplemental = showExplorePins && !primaryIds.has(l.id);
        return (
          <Marker
            key={l.id}
            position={l.position}
            title={isSupplemental ? `${l.title} (wider map search)` : l.title}
            label={{
              text: String(i + 1),
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: "600",
            }}
            opacity={isSupplemental ? 0.88 : 1}
            zIndex={selectedId === l.id ? 80 : 20 + i}
            onClick={() => onSelect(l.id)}
          />
        );
      })}
      {selected ? (
        <InfoWindow position={selected.position} onCloseClick={() => onSelect(null)}>
          <div className="max-w-[220px] py-1 pr-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              #{displayListings.findIndex((x) => x.id === selected.id) + 1} · {selected.price}/mo
              {!selectedIsPrimary ? " · wider area" : ""}
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
              {selected.title}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{selected.location}</p>
            <Link
              to="/verified"
              className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
            >
              View verified details →
            </Link>
          </div>
        </InfoWindow>
      ) : null}
    </Map>
  );
}

export function MarketplaceBrowseMap({
  listings,
  explorePool,
  className,
}: {
  listings: MarketplaceListing[];
  /** Listings that match search/price/category within a wider radius — shown when the user zooms out. */
  explorePool: MarketplaceListing[];
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ?? "";

  const primaryIds = useMemo(() => new Set(listings.map((l) => l.id)), [listings]);
  const exploreExtraCount = useMemo(
    () => explorePool.filter((l) => !primaryIds.has(l.id)).length,
    [explorePool, primaryIds],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedId(null);
  }, [listings]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border/70 bg-muted/30 shadow-[inset_0_1px_0_oklch(1_0_0/0.6)] ring-1 ring-black/5",
        className,
      )}
    >
      <div className="relative aspect-[4/3] min-h-[260px] w-full bg-muted sm:aspect-[16/10] md:min-h-[300px] lg:aspect-[16/9]">
        {!mounted ? (
          <div
            className="flex size-full animate-pulse items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent/20"
            aria-hidden
          />
       ) : !apiKey ? (
          <div className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center">
            <MapPin className="h-8 w-8 text-primary/60" aria-hidden />
            <p className="text-sm font-medium text-foreground">Map needs an API key</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Add{" "}
              <code className="rounded bg-background px-1 py-0.5">VITE_GOOGLE_MAPS_API_KEY</code> to{" "}
              <code className="rounded bg-background px-1 py-0.5">.env</code> and restart the dev
              server. Enable Maps JavaScript API on the key.
            </p>
          </div>
        ) : (
          <APIProvider apiKey={apiKey} language="en" region="US">
            <BrowseMapInner
              listings={listings}
              explorePool={explorePool}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </APIProvider>
        )}
      </div>
      <div className="border-t border-border/60 bg-card/90 px-3 py-2.5 backdrop-blur-sm">
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">
            {listings.length} pin{listings.length === 1 ? "" : "s"}
          </span>
          {listings.length > 0
            ? " match your filters · tap a numbered pin. "
            : " — widen price or distance to plot listings. "}
          {exploreExtraCount > 0 ? (
            <span className="text-foreground/85">
              Zoom out (maps zoom ≤ {ZOOM_SHOW_EXTRA_PINS}) to reveal up to{" "}
              <span className="font-semibold">{exploreExtraCount}</span> more nearby match
              {exploreExtraCount === 1 ? "" : "es"} within your keywords & rent.{" "}
            </span>
          ) : null}
          <span className="text-foreground/80">&quot;UTD&quot; marks campus.</span>{" "}
          <span className="text-foreground/80">Cooperative scroll: two fingers or Ctrl+scroll.</span>
        </p>
      </div>
    </div>
  );
}
