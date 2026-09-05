import type { Metadata } from "next";
import Link from "next/link";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, SubCard } from "@/components/ContentCard";
import RosterCard from "@/components/RosterCard";
import { EventList } from "@/components/EventList";
import { ArrowRightIcon } from "@/components/Icons";
import { getRoster, splitEvents } from "@/lib/content";

/** Re-render hourly so the tournament list stays current. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Competitive Team",
  description:
    "Meet the Stanford Club Golf travel roster and see upcoming NCCGA tournaments.",
};

export default function TeamPage() {
  const roster = getRoster();
  const tournaments = splitEvents()
    .upcoming.filter((e) => e.type === "tournament" || e.type === "tryout")
    .slice(0, 3);

  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-team.jpg"
          alt="Stanford Club Golf competitive team at a tournament"
          title={
            <>
              Competitive
              <br />
              Team
            </>
          }
        />
      }
    >
      <ContentCard>
        <div className="grid gap-4">
          <SubCard title={`${roster.season} Roster`}>
            <p className="mb-4 text-sm leading-relaxed text-ink/85">{roster.blurb}</p>
            <ul className="grid gap-2 tablet:grid-cols-2">
              {roster.players.map((p) => (
                <RosterCard key={p.name} person={p} />
              ))}
            </ul>
          </SubCard>

          <SubCard
            title="Tournaments"
            action={
              <Link
                href="/schedule"
                transitionTypes={["nav-forward"]}
                className="inline-flex items-center gap-1 text-xs font-semibold text-cardinal hover:underline"
              >
                Full schedule <ArrowRightIcon width={14} height={14} />
              </Link>
            }
          >
            {tournaments.length ? (
              <EventList events={tournaments} showCalendar={false} compact />
            ) : (
              <p className="text-sm text-ink-muted">
                No tournaments scheduled yet. Check back soon.
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Want to play? Tryouts run through the first three weeks of the year —{" "}
              <Link
                href="/tryouts"
                transitionTypes={["nav-forward"]}
                className="font-semibold text-cardinal hover:underline"
              >
                read the overview &amp; submit scores
              </Link>
              .
            </p>
          </SubCard>
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
