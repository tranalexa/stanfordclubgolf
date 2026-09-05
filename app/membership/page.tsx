import type { Metadata } from "next";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, RuleHeading } from "@/components/ContentCard";
import JoinForm from "@/components/JoinForm";

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
          <RuleHeading sub="Tell us a bit about yourself and we'll get you set up with practices, the mailing list, and tryout info.">
            Membership
          </RuleHeading>

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
