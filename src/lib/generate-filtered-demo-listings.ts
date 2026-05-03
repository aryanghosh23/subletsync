import { format } from "date-fns";
import { listingThumb } from "@/lib/northside-images";

const THUMB_URLS = [
  listingThumb.northside1,
  listingThumb.northside2,
  listingThumb.waterview,
  listingThumb.uv,
  listingThumb.loft,
  listingThumb.matchExtra1,
  listingThumb.matchExtra2,
];

const AREAS = [
  { label: "Northside", prefix: "Northside ·" },
  { label: "Synergy Park", prefix: "Synergy Park ·" },
  { label: "University Village", prefix: "University Village ·" },
  { label: "Waterview", prefix: "Waterview ·" },
] as const;

const TITLE_A = [
  "Sunlit corner unit",
  "Quiet work-from-home ready",
  "Steps from retail strip",
  "Premium finishes · quick move-in",
  "Flexible summer handoff",
  "High-floor sunset views",
  "Walk to campus green",
  "Pool & gym access",
];

const TITLE_B = [
  "studio",
  "1BR sublease",
  "2BR takeover",
  "room in 2BR",
  "loft alcove",
  "smart 1×1",
];

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type FilterDemoSnapshot = {
  budgetMin: number;
  budgetMax: number;
  distanceMaxMi: number;
  moveIn?: Date;
  moveOut?: Date;
  flexible: boolean;
  amenities: string[];
  leaseTypes: string[];
  roommate: string[];
  bedrooms: string[];
  propertyTypes: string[];
  verification: string[];
  /** Increment each time user clicks Apply so batches feel fresh. */
  batch: number;
};

export type GeneratedFilterListing = {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  priceNum: number;
  dates: string;
  badges: string[];
  distance: number;
};

function pickPrice(rnd: () => number, lo: number, hi: number): number {
  const span = Math.max(hi - lo, 25);
  const v = lo + rnd() * span;
  return Math.round(v / 25) * 25;
}

function formatRange(moveIn?: Date, moveOut?: Date, flexible?: boolean): string {
  if (moveIn && moveOut) {
    const a = format(moveIn, "MMM d");
    const b = format(moveOut, "MMM d");
    return flexible ? `${a} – ${b} · ±7d flex` : `${a} – ${b}`;
  }
  if (moveIn) return `${format(moveIn, "MMM d")} – Aug · flex`;
  return "May – Aug · dates negotiable";
}

/**
 * Deterministic demo inventory: same snapshot + batch → same listings; new batch → new set.
 * All rows respect budget and max distance; badges reflect amenity / verification selections.
 */
export function generateFilteredDemoListings(s: FilterDemoSnapshot): GeneratedFilterListing[] {
  let lo = s.budgetMin;
  let hi = s.budgetMax;
  if (lo > hi) [lo, hi] = [hi, lo];

  const seed =
    hashString(
      JSON.stringify({
        budgetMin: lo,
        budgetMax: hi,
        distanceMaxMi: s.distanceMaxMi,
        amenities: [...s.amenities].sort(),
        leaseTypes: [...s.leaseTypes].sort(),
        roommate: [...s.roommate].sort(),
        bedrooms: [...s.bedrooms].sort(),
        propertyTypes: [...s.propertyTypes].sort(),
        verification: [...s.verification].sort(),
        batch: s.batch,
        mi: s.moveIn?.getTime() ?? 0,
        mo: s.moveOut?.getTime() ?? 0,
        flexible: s.flexible,
      }),
    ) ^
    (s.batch * 2654435761);

  const rnd = mulberry32(seed);
  const count = 6 + Math.floor(rnd() * 5);
  const out: GeneratedFilterListing[] = [];

  const wantRoommate = s.roommate.some((x) => x.includes("roommate"));
  const wantSolo = s.roommate.includes("Solo");
  const selectedAmenities =
    s.amenities.length > 0
      ? [...s.amenities]
      : ["Furnished", "Utilities incl."].slice(0, 1 + Math.floor(rnd() * 2));

  for (let i = 0; i < count; i++) {
    const priceNum = pickPrice(rnd, lo, hi);
    const dist = Math.round((0.08 + rnd() * Math.max(s.distanceMaxMi - 0.08, 0.02)) * 100) / 100;
    const area = AREAS[Math.floor(rnd() * AREAS.length)]!;
    const titlePart = TITLE_A[Math.floor(rnd() * TITLE_A.length)]!;
    let kind = TITLE_B[Math.floor(rnd() * TITLE_B.length)]!;
    if (wantRoommate && rnd() > 0.35) kind = "room in 2BR";
    if (wantSolo && kind === "room in 2BR") kind = "1BR sublease";

    const title = `${titlePart} · ${kind}`;

    const badges: string[] = [];
    if (s.verification.includes("Verified student (.edu)")) badges.push("Verified");
    else if (rnd() > 0.15) badges.push("Verified");

    for (const a of selectedAmenities) {
      if (rnd() > 0.25 && !badges.includes(a)) badges.push(a);
    }
    if (badges.length < 2 && rnd() > 0.5) badges.push("Lease on file");
    if (s.leaseTypes.length && rnd() > 0.4)
      badges.push(s.leaseTypes[Math.floor(rnd() * s.leaseTypes.length)]!);

    const verifiedBoost = s.verification.includes("Lease on file");
    if (verifiedBoost && rnd() > 0.2) badges.push("Lease on file");

    const thumb = THUMB_URLS[(i + seed) % THUMB_URLS.length]!;

    out.push({
      id: `demo-${seed}-${i}`,
      image: thumb,
      title,
      location: `${area.prefix} ${dist} mi`,
      price: `$${priceNum}`,
      priceNum,
      dates: formatRange(s.moveIn, s.moveOut, s.flexible),
      badges: [...new Set(badges)].slice(0, 5),
      distance: dist,
    });
  }

  const sortedByFit = [...out].sort((a, b) => {
    const score = (x: GeneratedFilterListing) =>
      (x.priceNum >= lo && x.priceNum <= hi ? 2 : 0) +
      (x.distance <= s.distanceMaxMi ? 2 : 0) -
      x.distance * 0.15;
    return score(b) - score(a);
  });

  return sortedByFit;
}
