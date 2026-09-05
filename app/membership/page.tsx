import type { Metadata } from "next";
import Link from "next/link";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, RuleHeading } from "@/components/ContentCard";
import JoinForm from "@/components/JoinForm";
import { ArrowRightIcon } from "@/components/Icons";
import { tryouts } from "@/content/tryouts";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join Stanford Club Golf. Open to all Stanford students, all skill levels.",
};

const perks = [
  { title: "Open to everyone", body: "No tryout needed for social membership. Beginners welcome." },
  { title: "Practice access", body: "Weekly practices at Stanford Golf Course with the team." },
  { title: "Tournaments", body: "Qualify for the travel roster and compete in NCCGA events." },
  { title: "Socials", body: "Topgolf nights, scrambles, and end-of-quarter dinners." },
];

export default function MembershipPage() {
  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-membership.jpg"
          alt="A golfer reading a scorecard on the course"
          title={
            <>
              Join
              <br />
              the Club
            </>
          }
          showJoin={false}
        />
      }
    >
      <ContentCard className="flex flex-col justify-center">
        <div className="mx-auto w-full max-w-xl px-1 py-6 tablet:px-4">
          <RuleHeading sub="Tell us a bit about yourself and we'll get you set up with practices and the mailing list.">
            Membership
          </RuleHeading>

          <div className="mb-6 rounded-card border border-cardinal/20 bg-cream-2 p-4">
            <p className="font-heading font-semibold text-cardinal">
              Trying out for the competitive team?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              Scores are due {tryouts.deadlineLabel}. Read the overview, then submit
              scorecards via Google Form — not this interest form.
            </p>
            <Link
              href="/tryouts"
              transitionTypes={["nav-forward"]}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cardinal hover:underline"
            >
              Go to Tryouts <ArrowRightIcon width={14} height={14} />
            </Link>
          </div>

          <ul className="mb-8 grid grid-cols-2 gap-3 text-sm">
            {perks.map((p) => (
              <li key={p.title} className="rounded-card bg-cream-2 p-3.5">
                <p className="font-heading font-semibold text-cardinal">{p.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{p.body}</p>
              </li>
            ))}
          </ul>

          <JoinForm />
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
