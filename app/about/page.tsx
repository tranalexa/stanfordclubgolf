import type { Metadata } from "next";
import Image from "next/image";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, SubCard } from "@/components/ContentCard";
import RosterCard from "@/components/RosterCard";
import { about } from "@/content/about";
import { getRoster } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, our story, and the student leadership behind Stanford Club Golf.",
};

export default function AboutPage() {
  const roster = getRoster();

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
        <div className="grid gap-4">
          <div className="grid gap-4 tablet:grid-cols-2">
            <SubCard title="About Us">
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink/85">
                {about.aboutUs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </SubCard>

            <SubCard title="Our Story">
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink/85">
                {about.ourStory.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </SubCard>
          </div>

          <div className="relative min-h-56 overflow-hidden rounded-card bg-cream-2 tablet:min-h-72">
            <Image
              src={about.teamPhoto}
              alt="Stanford Club Golf team photo"
              fill
              sizes="(min-width: 1200px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {roster.officers.length > 0 && (
            <SubCard title="Leadership">
              <p className="mb-4 text-sm leading-relaxed text-ink-muted">
                Student officers who run practices, travel, and club life for the year.
              </p>
              <ul className="grid gap-2 tablet:grid-cols-2">
                {roster.officers.map((p) => (
                  <RosterCard key={p.name} person={p} />
                ))}
              </ul>
            </SubCard>
          )}
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
