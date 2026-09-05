import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import SocialLinks from "./SocialLinks";

type Props = {
  image: string;
  alt: string;
  title: ReactNode;
  /** Larger multi-line home title vs. single-word page title */
  titleSize?: "lg" | "md";
  showJoin?: boolean;
  showSocials?: boolean;
  /** Make the image focal point sit higher/lower. */
  objectPosition?: string;
  priority?: boolean;
};

export default function HeroCard({
  image,
  alt,
  title,
  titleSize = "md",
  showJoin = true,
  showSocials = false,
  objectPosition = "center",
  priority = true,
}: Props) {
  return (
    <section className="relative h-full w-full overflow-hidden rounded-panel bg-ink shadow-md shadow-black/10 aspect-[4/5] tablet:aspect-[16/11] desktop:aspect-auto">
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1200px) 48vw, 100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      {/* Bottom gradient so the title reads over any photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {showJoin && (
        <Link
          href="/membership"
          transitionTypes={["nav-forward"]}
          className="absolute right-4 top-4 rounded-md border border-cardinal bg-cream px-4 py-2 font-heading text-sm font-semibold text-cardinal shadow-md shadow-black/20 transition hover:bg-cardinal hover:text-white tablet:right-5 tablet:top-5"
        >
          join us
        </Link>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 tablet:p-6">
        <h1
          className={`hero-title ${
            titleSize === "lg"
              ? "text-[3.2rem] tablet:text-[4rem] desktop:text-[clamp(3rem,4.8vw,5rem)]"
              : "text-[2.8rem] tablet:text-[3.6rem] desktop:text-[clamp(2.8rem,4.4vw,4.6rem)]"
          }`}
        >
          {title}
        </h1>
        {showSocials && (
          <SocialLinks tone="light" size="sm" className="mb-1 shrink-0" />
        )}
      </div>
    </section>
  );
}
