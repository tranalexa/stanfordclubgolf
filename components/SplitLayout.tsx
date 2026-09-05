import type { ReactNode } from "react";

type Props = {
  /** The image hero card (left on desktop, top on tablet/phone). */
  hero: ReactNode;
  /** The content column. */
  children: ReactNode;
};

/**
 * Page shell matching the mockup: on desktop a two-column layout with the hero
 * card pinned on the left and content scrolling on the right; on tablet and
 * phone the hero stacks on top of the content.
 */
export default function SplitLayout({ hero, children }: Props) {
  return (
    <main className="mx-auto w-full max-w-[1500px] flex-1 p-3 tablet:p-4 desktop:p-5">
      <div className="grid gap-3 tablet:gap-4 desktop:grid-cols-[minmax(0,10fr)_minmax(0,11fr)] desktop:gap-5">
        <div className="desktop:sticky desktop:top-5 desktop:h-[calc(100vh-2.5rem)] desktop:self-start">
          {hero}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
