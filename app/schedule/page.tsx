import type { Metadata } from "next";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, RuleHeading, SubCard } from "@/components/ContentCard";
import { EmptyEvents, EventList } from "@/components/EventList";
import { splitEvents } from "@/lib/content";

/** Re-render hourly so events move from Upcoming to Past without a redeploy. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming practices, tournaments, tryouts, and socials for Stanford Club Golf.",
};

export default function SchedulePage() {
  const { upcoming, past } = splitEvents();

  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-schedule.jpg"
          alt="Golf course fairway at sunrise"
          title="Schedule"
        />
      }
    >
      <ContentCard>
        <RuleHeading sub="2026–27 competitive calendar: Pacific regionals, Pinehurst Open, national qualifier, and nationals if we qualify. Men's section, Santa Clara, and Cal matches TBA.">
          Upcoming Events
        </RuleHeading>

        <SubCard>
          {upcoming.length ? <EventList events={upcoming} /> : <EmptyEvents />}
        </SubCard>

        {past.length > 0 && (
          <SubCard title="Past Events" className="mt-4">
            <EventList events={past} showCalendar={false} compact />
          </SubCard>
        )}
      </ContentCard>
    </SplitLayout>
  );
}
