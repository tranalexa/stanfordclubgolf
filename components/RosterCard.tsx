import Image from "next/image";
import type { Person } from "@/lib/content";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function yearLabel(year: string) {
  return /^\d{4}$/.test(year) ? `Class of ${year}` : year;
}

export default function RosterCard({ person }: { person: Person }) {
  return (
    <li className="flex items-center gap-3 rounded-card bg-cream p-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-cardinal text-white">
        {person.photo ? (
          <Image src={person.photo} alt={person.name} fill sizes="48px" className="object-cover" />
        ) : (
          <span className="grid h-full w-full place-items-center font-heading text-sm font-bold">
            {initials(person.name)}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold leading-tight text-ink">{person.name}</p>
        <p className="text-xs text-ink-muted">
          {person.role ? `${person.role} · ` : ""}
          {yearLabel(person.year)}
          {person.hometown ? ` · ${person.hometown}` : ""}
        </p>
      </div>
    </li>
  );
}
