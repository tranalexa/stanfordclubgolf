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
        <RuleHeading sub="Practices, NCCGA tournaments, tryouts, and socials. Add anything to your calendar with one click.">
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
