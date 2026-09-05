/**
 * Competitive team tryouts for the school year.
 * Edit here when dates, rules, or the scorecard form change.
 */
export const tryouts = {
  schoolYear: "2026-2027",
  title: "Stanford Club Golf Tryouts",
  deadlineLabel: "October 11th",
  /** ISO date used for schedule / urgency copy */
  deadlineIso: "2026-10-11",
  overview:
    "Tryouts take place the first 3 weeks of the school year, concluding October 11th. Please read this overview before submitting scores.",
  format:
    "We will assess your best 18-hole differential, whether that be an 18-hole score, two 9-hole scores, a combination of 18-hole and 9-hole scores, etc. Submit as many rounds as you can — there's no penalty for submitting more scores!",
  rules: [
    "There must be at least one other player in your group, and they must sign your scorecard (honor system).",
    "Double bogey pickup.",
    "Must play stroke-and-distance if the ball is lost or out of bounds.",
    "Hazards are a one-stroke penalty.",
  ],
  teeTimes: [
    "We are unable to provide official tryout tee times, but encourage you to use the course sign-up tab and play with others off the back 9 in the early mornings, which does not require an advanced tee time.",
    "To get a tee time at the Stanford course, call the pro shop up to 3 days in advance, starting at 6:30 AM.",
    "You can also play surrounding courses where it may be easier to secure a tee time, such as Baylands Golf Links.",
  ],
  submitting: {
    body: "Upload a photo of your scorecard using the form below. Please indicate which tees you played so we can determine your score differential from the slope and course rating.",
    formula:
      "Differentials use the standard formula: (113 / Slope Rating) × (Gross Score − Course Rating).",
    formUrl: "https://forms.gle/QtKR71pJyS1PtcUk7",
    formLabel: "Scorecard Submission Form",
  },
  meetTheTeam: {
    body: "Open practices at the grass short game area near the end of the driving range.",
    sessions: [
      { date: "2026-09-28", label: "Monday, September 28", time: "6:00 – 7:30 PM" },
      { date: "2026-10-05", label: "Monday, October 5", time: "6:00 – 7:30 PM" },
    ],
  },
  contact: {
    name: "Matthew",
    phone: "503-933-0604",
    phoneHref: "tel:+15039330604",
    email: "chanmatt@stanford.edu",
  },
} as const;
