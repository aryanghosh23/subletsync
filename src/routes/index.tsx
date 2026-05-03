import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { LandingHome } from "@/components/landing/landing-home";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SubletSync — Student subleases, verified & match-ready" },
      {
        name: "description",
        content:
          "Pitch-ready marketplace for verified UT Dallas subleases: smart matching, trust layer, and accountable messaging.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <LandingHome />
      <SiteFooter />
    </div>
  );
}
