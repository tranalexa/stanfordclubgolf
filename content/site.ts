/**
 * Site-wide settings. Edit this file to update contact info, socials,
 * practice times, and the map embed. No code changes needed elsewhere.
 */
export const site = {
  name: "Stanford Club Golf",
  shortName: "Stanford Club Golf",
  tagline:
    "Stanford University's club golf team. Open to all skill levels, competing in the NCCGA.",
  url: "https://stanfordclubgolf.vercel.app",

  email: "stanfordclubgolf@stanford.edu",
  phone: "",
  address: {
    line1: "Stanford Golf Course",
    line2: "91 Links Rd",
    city: "Stanford, CA 94305",
  },

  socials: {
    instagram: "https://instagram.com/stanfordclubgolf",
    x: "https://x.com/stanfordclubgolf",
    facebook: "",
    email: "mailto:stanfordclubgolf@stanford.edu",
  },

  /** Shown on the Contact page under "Practice Times". */
  practiceTimes: [
    { label: "Tuesday", value: "4:00 PM - 6:00 PM" },
    { label: "Thursday", value: "4:00 PM - 6:00 PM" },
    { label: "Saturday", value: "9:00 AM - 12:00 PM" },
  ],

  /** Google Maps embed. Get one from maps.google.com -> Share -> Embed a map. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Stanford+Golf+Course,+91+Links+Rd,+Stanford,+CA+94305&output=embed",

  /** Links surfaced in the navigation drawer, in order. */
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/membership", label: "Membership" },
    { href: "/team", label: "Competitive Team" },
    { href: "/schedule", label: "Schedule" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type NavLink = (typeof site.nav)[number];
