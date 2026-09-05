import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
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

/* ---------------------------------- Posts --------------------------------- */

export type Post = {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  excerpt: string;
  image?: string;
  content: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => readPost(file.replace(/\.md$/, "")))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  return readPost(slug);
}

function readPost(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    image: data.image ? String(data.image) : undefined,
    content,
  };
}

/* -------------------------------- Formatting ------------------------------ */

export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions) {
  // Dates like "2026-09-01" (no time) are parsed as UTC; render them as such
  // so the calendar day doesn't shift.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(iso);
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(dateOnly ? { timeZone: "UTC" } : {}),
    ...opts,
  });
}

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
