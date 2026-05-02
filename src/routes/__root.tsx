import type { ReactNode } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { SyncChatbot } from "@/components/sync-chatbot";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SubletSync — Trusted student subleases" },
      {
        name: "description",
        content:
          "Verified student subleases, smart matching, and structured messaging. Built for short-term moves between semesters, study abroad, and internships.",
      },
      { property: "og:title", content: "SubletSync — Trusted student subleases" },
      {
        property: "og:description",
        content:
          "Verified student subleases, smart matching, and structured messaging. Built for short-term moves between semesters, study abroad, and internships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SubletSync — Trusted student subleases" },
      {
        name: "twitter:description",
        content:
          "Verified student subleases, smart matching, and structured messaging. Built for short-term moves between semesters, study abroad, and internships.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/eeddb35c-fc8f-4030-98e3-d0f53f908283/id-preview-dc3a8fd8--f9de88c6-f6c0-4189-806c-ae7c84bdee1f.lovable.app-1776812300364.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/eeddb35c-fc8f-4030-98e3-d0f53f908283/id-preview-dc3a8fd8--f9de88c6-f6c0-4189-806c-ae7c84bdee1f.lovable.app-1776812300364.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,400italic;9..144,600italic&family=Outfit:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors closeButton />
        <SyncChatbot />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
