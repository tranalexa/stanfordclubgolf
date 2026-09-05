import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MenuIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Golf flag on a green, matching the mockup's pill icon. */
export function GolfFlagIcon(p: P) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...p}>
      <ellipse cx="12" cy="19" rx="9" ry="3.2" fill="#1f7a3a" />
      <ellipse cx="12" cy="18.6" rx="4.5" ry="1.4" fill="#0f5a28" />
      <path d="M12 18.5V4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 4l7 2.6-7 2.6z" fill="#e53935" />
    </svg>
  );
}

export function ArrowUpRightIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowRightIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function InstagramIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export function FacebookIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M14 8.5V7c0-.8.5-1 1-1h2V3h-3c-2.5 0-4 1.6-4 4v1.5H8V12h2v9h4v-9h2.6l.4-3.5H14z" />
    </svg>
  );
}

export function MailIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

export function CalendarIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function PinIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function StarIcon(p: P) {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.5l2.9 6.2 6.7.8-5 4.6 1.3 6.7L12 17.5l-5.9 3.3 1.3-6.7-5-4.6 6.7-.8z" />
    </svg>
  );
}

export function DownloadIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M12 4v11M7 10l5 5 5-5M4 19h16" />
    </svg>
  );
}
