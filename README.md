# Stanford Club Golf

Website for Stanford University's club golf team. Built with Next.js (App Router), TypeScript, and Tailwind CSS. All content lives in files in this repo; there is no database or CMS.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero photo plus tiles linking to About, Membership, Competitive Team, Schedule |
| `/about` | Testimonials, About Us, team photo, Our Story |
| `/membership` | Join Us form (submits to Formspree) |
| `/tryouts` | Competitive tryouts overview + scorecard Google Form |
| `/team` | Competitive roster and upcoming NCCGA tournaments |
| `/schedule` | Upcoming and past events with Add-to-Calendar |
| `/news`, `/news/[slug]` | News posts written in Markdown |
| `/contact` | Practice times, contact info, socials, map |

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in NEXT_PUBLIC_FORMSPREE_ID
npm run dev
```

Open http://localhost:3000.

## Editing content

Everything below is a plain file edit followed by a commit. Vercel redeploys automatically on push.

### Site info, socials, practice times, nav

`content/site.ts`. Contains club email, address, social links, practice times, the Google Maps embed URL, and the nav order.

### Events (Schedule page)

`content/events.json`. Each event:

```json
{
  "id": "unique-slug",
  "title": "NCCGA Regional #1",
  "date": "2026-10-03T08:00:00-07:00",
  "endDate": "2026-10-04T17:00:00-07:00",
  "location": "Poppy Hills Golf Course, Pebble Beach, CA",
  "type": "tournament",
  "description": "Optional text shown under the event."
}
```

- `date` / `endDate` are ISO 8601 with a timezone offset (`-07:00` PDT, `-08:00` PST).
- `type` is one of `tournament`, `practice`, `social`, `tryout`.
- Events automatically move from Upcoming to Past once `endDate` (or `date`) has passed.
- `id` is used for the `.ics` download URL (`/api/ics/<id>`), so keep it stable.

### Roster and officers (Competitive Team page)

`content/roster.json`. Update `season`, `blurb`, and `players`. Officers go in `officers` and appear on the About page when the array is non-empty. Add a `photo` field pointing at a file in `public/images/` to show a headshot instead of initials. Players are sorted Senior → Masters' → Junior → Sophomore, then A–Z.

### About page copy

`content/about.ts`. Paragraphs for About Us and Our Story. Officers / leadership are edited in `content/roster.json` (`officers` array) and shown on the About page.

### News posts

Add a Markdown file to `content/posts/`. The filename becomes the URL slug.

```md
---
title: "Post title"
date: "2026-09-01"
excerpt: "One or two sentences shown in the list."
image: "/images/some-photo.jpg"
---

Post body in Markdown.
```

### Photos

Drop images into `public/images/` and reference them as `/images/filename.jpg`. The current files there are placeholders; replace them with real photos using the same filenames and nothing else needs to change:

- `hero-home.jpg` (square-ish, the home page hero)
- `hero-about.jpg`, `hero-membership.jpg`, `hero-team.jpg`, `hero-schedule.jpg`, `hero-news.jpg`, `hero-contact.jpg` (portrait, roughly 7:8)
- `tile-about.jpg`, `tile-membership.jpg`, `tile-team.jpg`, `tile-schedule.jpg` (landscape, roughly 16:11)
- `about-team.jpg` (team photo on the About page)

## Join form (Formspree)

1. Create a free form at https://formspree.io and copy the form ID from the endpoint URL (`https://formspree.io/f/<ID>`).
2. Put it in `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID=<ID>` for local dev.
3. In Vercel, add the same variable under Project Settings -> Environment Variables and redeploy.

Submissions arrive in the Formspree dashboard and by email. The form includes a honeypot field for spam.

## Deploying

Import the GitHub repo into Vercel. No build settings need to change. Set `NEXT_PUBLIC_FORMSPREE_ID` in the Vercel environment and update `url` in `content/site.ts` to the final domain so Open Graph tags resolve correctly.

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run lint` - ESLint
