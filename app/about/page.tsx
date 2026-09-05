import type { Metadata } from "next";
import Image from "next/image";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, SubCard } from "@/components/ContentCard";
import { StarIcon } from "@/components/Icons";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, how the club started, and what members say about Stanford Club Golf.",
};

export default function AboutPage() {
  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-about.jpg"
          alt="Stanford Club Golf members walking a fairway"
          title="About"
        />
      }
    >
      <ContentCard>
        <div className="grid gap-4 tablet:grid-cols-[minmax(0,10fr)_minmax(0,11fr)]">
          <SubCard title="From Members">
            <ul className="flex flex-col gap-3">
              {about.testimonials.map((t) => (
                <li key={t.name} className="rounded-card bg-cream p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-ink">{t.name}</p>
                    <div className="flex gap-0.5 text-cardinal" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.quote}</p>
                </li>
              ))}
            </ul>
          </SubCard>

          <SubCard title="About Us">
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink/85">
              {about.aboutUs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SubCard>

          <div className="relative min-h-56 overflow-hidden rounded-card bg-cream-2">
            <Image
              src={about.teamPhoto}
              alt="Stanford Club Golf team photo"
              fill
              sizes="(min-width: 1200px) 25vw, (min-width: 810px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <SubCard title="Our Story">
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink/85">
              {about.ourStory.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SubCard>
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
