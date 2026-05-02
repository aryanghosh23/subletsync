type Props = {
  image: string;
  title: string;
  location: string;
  price: string;
  dates: string;
  badges?: string[];
  matchScore?: number;
};

export function ListingCard({
  image,
  title,
  location,
  price,
  dates,
  badges = [],
  matchScore,
}: Props) {
  return (
    <article className="group rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] hover:ring-2 hover:ring-primary/25">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
        {matchScore !== undefined && (
          <div className="absolute top-3 left-3 rounded-full bg-background/95 backdrop-blur px-3 py-1 text-xs font-medium text-foreground shadow-[var(--shadow-soft)]">
            <span className="text-primary font-semibold">{matchScore}%</span> match
          </div>
        )}
        <button
          aria-label="Save listing"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/95 backdrop-blur flex items-center justify-center text-foreground shadow-[var(--shadow-soft)] hover:scale-105 transition-transform"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
            {title}
          </h3>
          <span className="font-display text-lg font-semibold text-primary whitespace-nowrap">
            {price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{location}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>
          {dates}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 rounded-full bg-primary-soft text-primary px-2.5 py-1 text-xs font-medium"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                  clipRule="evenodd"
                />
              </svg>
              {b}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
