import type { ReactNode } from "react";

/**
 * Cream panel with the mockup's thin cardinal border. Wraps the entire right
 * column on each page.
 */
export function ContentCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-panel border border-cardinal/70 bg-cream p-3 tablet:p-4 desktop:min-h-[calc(100vh-2.5rem)] ${className}`}
    >
      {children}
    </section>
  );
}

/** Slightly darker cream sub-card used for groups of content within a panel. */
export function SubCard({
  title,
  children,
  className = "",
  action,
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={`rounded-card bg-cream-2 p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          {title && <h2 className="section-title text-2xl">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

/** Centered heading with the arrow-tipped rule on both sides. */
export function RuleHeading({
  children,
  sub,
}: {
  children: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="mb-6 text-center">
      <div className="rule-arrows">
        <span aria-hidden className="-mr-3 text-xs">
          &#9664;
        </span>
        <h2 className="section-title px-1 text-3xl">{children}</h2>
        <span aria-hidden className="-ml-3 text-xs">
          &#9654;
        </span>
      </div>
      {sub && <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">{sub}</p>}
    </div>
  );
}
