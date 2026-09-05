import { formatEventDate, type ClubEvent } from "@/lib/content";
import AddToCalendar from "./AddToCalendar";
import { CalendarIcon, PinIcon } from "./Icons";

const typeLabel: Record<ClubEvent["type"], string> = {
  tournament: "Tournament",
  practice: "Practice",
  social: "Social",
  tryout: "Tryout",
};

const typeTone: Record<ClubEvent["type"], string> = {
  tournament: "bg-cardinal text-white",
  practice: "bg-fairway text-white",
  social: "bg-ink text-white",
  tryout: "bg-cardinal-light text-white",
};

export function EventList({
  events,
  showCalendar = true,
  compact = false,
}: {
  events: ClubEvent[];
  showCalendar?: boolean;
  compact?: boolean;
}) {
  return (
    <ol className="flex flex-col gap-3">
      {events.map((e) => {
        const d = new Date(e.date);
        const month = d.toLocaleDateString("en-US", {
          month: "short",
          timeZone: "America/Los_Angeles",
        });
        const day = d.toLocaleDateString("en-US", {
          day: "numeric",
          timeZone: "America/Los_Angeles",
        });
        return (
          <li
            key={e.id}
            className={`flex gap-4 rounded-card border border-cardinal/15 bg-cream p-4 ${
              compact ? "opacity-80" : ""
            }`}
          >
            <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-cream-3 py-2 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wide text-cardinal">
                {month}
              </span>
              <span className="font-heading text-2xl font-bold leading-none text-ink">
                {day}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-lg font-semibold leading-tight text-ink">
                  {e.title}
                </h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${typeTone[e.type]}`}
                >
                  {typeLabel[e.type]}
                </span>
              </div>
              <dl className="mt-1.5 flex flex-col gap-1 text-sm text-ink-muted">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon width={14} height={14} className="shrink-0" />
                  <dd>{formatEventDate(e)}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <PinIcon width={14} height={14} className="shrink-0" />
                  <dd>{e.location}</dd>
                </div>
              </dl>
              {e.description && !compact && (
                <p className="mt-2 text-sm leading-relaxed text-ink/80">
                  {e.description}
                </p>
              )}
              {showCalendar && !compact && (
                <div className="mt-3">
                  <AddToCalendar event={e} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Mirrors the mockup's "No Upcoming Events" empty state. */
export function EmptyEvents() {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-cardinal/30 px-6 py-16 text-center">
      <div className="relative mb-4 grid h-16 w-16 place-items-center rounded-xl bg-cream-3 text-ink-muted">
        <CalendarIcon width={30} height={30} />
        <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-cream text-xs font-bold text-ink-muted ring-1 ring-cardinal/20">
          0
        </span>
      </div>
      <p className="font-heading text-lg font-semibold text-ink">
        No Upcoming Events
      </p>
      <p className="mt-1 text-sm text-ink-muted">Check back later for new events.</p>
    </div>
  );
}
