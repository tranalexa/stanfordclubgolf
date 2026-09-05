import eventsData from "@/content/events.json";
import rosterData from "@/content/roster.json";

/* ---------------------------------- Events -------------------------------- */

export type EventType = "tournament" | "practice" | "social" | "tryout";

export type ClubEvent = {
  id: string;
  title: string;
  /** ISO 8601 string, with timezone offset. */
  date: string;
  endDate?: string;
  location: string;
  type: EventType;
  description?: string;
  /** Optional Partiful invite URL (https://partiful.com/e/...). Socials use this for RSVP. */
  partifulUrl?: string;
};

const events = eventsData as ClubEvent[];

export function getAllEvents(): ClubEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getEventById(id: string): ClubEvent | undefined {
  return events.find((e) => e.id === id);
}

export function splitEvents(now = new Date()) {
  const all = getAllEvents();
  const cutoff = now.getTime();
  const upcoming = all.filter(
    (e) => new Date(e.endDate ?? e.date).getTime() >= cutoff,
  );
  const past = all
    .filter((e) => new Date(e.endDate ?? e.date).getTime() < cutoff)
    .reverse();
  return { upcoming, past };
}

/* ---------------------------------- Roster -------------------------------- */

export type Person = {
  name: string;
  year: string;
  hometown?: string;
  photo?: string;
  role?: string;
};

export type Roster = {
  season: string;
  blurb: string;
  officers: Person[];
  players: Person[];
};

const YEAR_ORDER: Record<string, number> = {
  Senior: 0,
  "Masters'": 1,
  Masters: 1,
  Junior: 2,
  Sophomore: 3,
  Freshman: 4,
};

export function getRoster(): Roster {
  const roster = rosterData as Roster;
  const players = [...roster.players].sort((a, b) => {
    const ya = YEAR_ORDER[a.year] ?? 50;
    const yb = YEAR_ORDER[b.year] ?? 50;
    if (ya !== yb) return ya - yb;
    return a.name.localeCompare(b.name);
  });
  return { ...roster, players };
}

/* -------------------------------- Formatting ------------------------------ */

export function formatEventDate(e: ClubEvent) {
  const start = new Date(e.date);
  const end = e.endDate ? new Date(e.endDate) : undefined;
  const tz = "America/Los_Angeles";
  const day = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: tz,
    });
  const time = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    });

  if (end && day(start) !== day(end)) {
    return `${day(start)} - ${day(end)}`;
  }
  if (end) return `${day(start)}, ${time(start)} - ${time(end)}`;
  return `${day(start)}, ${time(start)}`;
}
