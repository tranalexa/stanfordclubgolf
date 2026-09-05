import type { ClubEvent } from "./content";
import { site } from "@/content/site";

/** Format a Date as an iCalendar UTC timestamp: 20260919T160000Z */
function toIcsUtc(d: Date) {
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function endOf(e: ClubEvent) {
  if (e.endDate) return new Date(e.endDate);
  // Default to a 2-hour block if no end time provided.
  return new Date(new Date(e.date).getTime() + 2 * 60 * 60 * 1000);
}

function escapeIcs(s: string) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

export function googleCalendarUrl(e: ClubEvent) {
  const start = toIcsUtc(new Date(e.date));
  const end = toIcsUtc(endOf(e));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    location: e.location,
    details: e.description ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(e: ClubEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.id}@stanfordclubgolf`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(new Date(e.date))}`,
    `DTEND:${toIcsUtc(endOf(e))}`,
    `SUMMARY:${escapeIcs(e.title)}`,
    `LOCATION:${escapeIcs(e.location)}`,
    e.description ? `DESCRIPTION:${escapeIcs(e.description)}` : null,
    `URL:${site.url}/schedule`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((l): l is string => l !== null);
  return lines.join("\r\n") + "\r\n";
}
