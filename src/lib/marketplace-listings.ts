import { listingThumb } from "@/lib/northside-images";

export type ListingCategory = "studio" | "shared" | "summer" | "northside" | "loft";

export type MarketplaceListing = {
  id: number;
  title: string;
  location: string;
  price: string;
  priceNum: number;
  dates: string;
  description: string;
  image: string;
  categories: ListingCategory[];
  badges: string[];
  verified: boolean;
  distanceMi: number;
};

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: 1,
    title: "Sunny 1BR · Northside Residences",
    location: "Northside · 0.3 mi from UTD",
    price: "$780",
    priceNum: 780,
    dates: "May 15 – Aug 10 · Furnished",
    description:
      "Corner unit with full kitchen, in-unit laundry, and one covered parking spot. Steps from Northside retail and Comet Cruiser.",
    image: listingThumb.northside1,
    categories: ["northside", "summer", "studio"],
    badges: ["Verified student", "Lease on file"],
    verified: true,
    distanceMi: 0.3,
  },
  {
    id: 2,
    title: "Loft with skyline light",
    location: "Northside · 0.4 mi",
    price: "$735",
    priceNum: 735,
    dates: "Jun 1 – Aug 20",
    description: "Tall ceilings, walk-in closet, quiet floor. Ideal for internship summers.",
    image: listingThumb.loft,
    categories: ["northside", "loft", "summer"],
    badges: ["Verified student"],
    verified: true,
    distanceMi: 0.4,
  },
  {
    id: 3,
    title: "Private room in 2BR — friendly roommate",
    location: "University Village · 0.2 mi",
    price: "$540",
    priceNum: 540,
    dates: "May 20 – Aug 5",
    description: "Shared bath with one other UTD junior. Study-friendly, utilities split evenly.",
    image: listingThumb.uv,
    categories: ["shared", "summer"],
    badges: ["Verified student", "Lease on file"],
    verified: true,
    distanceMi: 0.2,
  },
  {
    id: 4,
    title: "Quiet studio · Waterview",
    location: "Waterview Pkwy · 0.8 mi",
    price: "$650",
    priceNum: 650,
    dates: "Jun 1 – Aug 15",
    description:
      "Kitchenette, blackout shades, pool access. Perfect if you want less foot traffic than Northside.",
    image: listingThumb.waterview,
    categories: ["studio", "summer"],
    badges: ["Verified student"],
    verified: true,
    distanceMi: 0.8,
  },
  {
    id: 5,
    title: "Northside 2BR — full apartment takeover",
    location: "Northside · 0.35 mi",
    price: "$1,120",
    priceNum: 1120,
    dates: "May 10 – Aug 25",
    description:
      "Both bedrooms available — bring a roommate or we can help pair through SubletSync.",
    image: listingThumb.northside2,
    categories: ["northside", "summer", "shared"],
    badges: ["Verified student", "Lease on file"],
    verified: true,
    distanceMi: 0.35,
  },
  {
    id: 6,
    title: "Summer crash pad — flexible dates",
    location: "Northside · 0.5 mi",
    price: "$695",
    priceNum: 695,
    dates: "±7 days flexible",
    description:
      "Light-filled unit, premium Wi-Fi included. Owner verified with prior successful sublease on platform.",
    image: listingThumb.matchExtra1,
    categories: ["northside", "summer", "studio"],
    badges: ["Verified student"],
    verified: true,
    distanceMi: 0.5,
  },
];
