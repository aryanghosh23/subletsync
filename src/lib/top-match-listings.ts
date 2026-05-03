import { listingThumb } from "@/lib/northside-images";

export type LatLng = { lat: number; lng: number };

export type LatLngBounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type TopMatchListing = {
  id: string;
  position: LatLng;
  image: string;
  title: string;
  location: string;
  price: string;
  dates: string;
  badges: string[];
  matchScore: number;
};

/** Demo inventory around UTD / Richardson — coordinates are approximate for map pins. */
export const TOP_MATCH_LISTINGS: TopMatchListing[] = [
  {
    id: "synergy-1br",
    position: { lat: 32.9916, lng: -96.7514 },
    image: listingThumb.northside1,
    title: "Sunny 1BR near Northside",
    location: "Synergy Park · 0.4 mi",
    price: "$720",
    dates: "May 15 – Aug 10",
    badges: ["Verified", "Furnished"],
    matchScore: 96,
  },
  {
    id: "waterview-studio",
    position: { lat: 32.9931, lng: -96.7546 },
    image: listingThumb.waterview,
    title: "Quiet studio, kitchenette",
    location: "Waterview · 0.8 mi",
    price: "$680",
    dates: "May 18 – Aug 15",
    badges: ["Verified", "Parking"],
    matchScore: 91,
  },
  {
    id: "uv-2br",
    position: { lat: 32.9884, lng: -96.7441 },
    image: listingThumb.uv,
    title: "Room in friendly 2BR",
    location: "University Village · 0.2 mi",
    price: "$640",
    dates: "May 20 – Aug 5",
    badges: ["Verified", "Roommate"],
    matchScore: 88,
  },
  {
    id: "northside-loft",
    position: { lat: 33.0015, lng: -96.7809 },
    image: listingThumb.loft,
    title: "Loft corner · Northside retail",
    location: "Northside · 0.35 mi",
    price: "$735",
    dates: "Jun 1 – Aug 20",
    badges: ["Verified", "Loft"],
    matchScore: 86,
  },
  {
    id: "northside-flex",
    position: { lat: 33.0006, lng: -96.7794 },
    image: listingThumb.matchExtra1,
    title: "Summer flex crash pad",
    location: "Northside · 0.5 mi",
    price: "$695",
    dates: "±7 day flex",
    badges: ["Verified", "Summer"],
    matchScore: 84,
  },
];

export function topMatchBounds(listings: Pick<TopMatchListing, "position">[]): LatLngBounds {
  const first = listings[0]?.position;
  if (!first) {
    return {
      north: 32.995,
      south: 32.985,
      east: -96.74,
      west: -96.785,
    };
  }
  let north = first.lat;
  let south = first.lat;
  let east = first.lng;
  let west = first.lng;
  for (const { position: p } of listings) {
    north = Math.max(north, p.lat);
    south = Math.min(south, p.lat);
    east = Math.max(east, p.lng);
    west = Math.min(west, p.lng);
  }
  const pad = 0.002;
  if (north - south < 1e-6) {
    north += pad;
    south -= pad;
  }
  if (east - west < 1e-6) {
    east += pad;
    west -= pad;
  }
  return { north, south, east, west };
}
