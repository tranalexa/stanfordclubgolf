import type { ClubEvent } from "@/lib/content";
import { googleCalendarUrl } from "@/lib/calendar";
import { CalendarIcon, DownloadIcon } from "./Icons";

export default function AddToCalendar({ event }: { event: ClubEvent }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={googleCalendarUrl(event)}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cardinal"
      >
        <CalendarIcon width={14} height={14} />
        Google Calendar
      </a>
      <a
        href={`/api/ics/${event.id}`}
        download={`${event.id}.ics`}
        className="inline-flex items-center gap-1.5 rounded-md border border-ink/30 px-3 py-1.5 text-xs font-semibold text-ink transition hover:border-cardinal hover:text-cardinal"
      >
        <DownloadIcon width={14} height={14} />
        Apple / Outlook (.ics)
      </a>
    </div>
  );
}
