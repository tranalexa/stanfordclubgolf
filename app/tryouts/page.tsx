import type { Metadata } from "next";
import Link from "next/link";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, RuleHeading, SubCard } from "@/components/ContentCard";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "@/components/Icons";
import { tryouts } from "@/content/tryouts";

export const metadata: Metadata = {
  title: "Tryouts",
  description: `${tryouts.title}: ${tryouts.schoolYear}. Submit scorecards through October 11.`,
};

export default function TryoutsPage() {
  const { contact, submitting, meetTheTeam } = tryouts;

  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-team.jpg"
          alt="Competitive team tryouts at Stanford Golf Course"
          title={
            <>
              Tryouts
              <br />
              {tryouts.schoolYear}
            </>
          }
        />
      }
    >
      <ContentCard>
        <div className="mx-auto max-w-2xl px-1 py-4 tablet:px-4">
          <RuleHeading sub={tryouts.overview}>
            {tryouts.title}
          </RuleHeading>

          <div className="mb-6 rounded-card border border-cardinal/25 bg-cardinal/5 p-4 text-center">
            <p className="font-heading text-sm font-semibold text-cardinal">
              Last day to submit scores: {tryouts.deadlineLabel}
            </p>
            <a
              href={submitting.formUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-cardinal px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-cardinal-dark"
            >
              {submitting.formLabel}
              <ArrowRightIcon width={14} height={14} />
            </a>
            <p className="mt-2 text-xs text-ink-muted">
              Read this page first, then submit each round via Google Forms.
            </p>
          </div>

          <div className="grid gap-4">
            <SubCard title="Format">
              <p className="text-sm leading-relaxed text-ink/85">{tryouts.format}</p>
            </SubCard>

            <SubCard title="Rules">
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/85">
                {tryouts.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </SubCard>

            <SubCard title="Tee Times">
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink/85">
                {tryouts.teeTimes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </SubCard>

            <SubCard title="Submitting Tryout Scores">
              <p className="text-sm leading-relaxed text-ink/85">{submitting.body}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {submitting.formula}
              </p>
              <a
                href={submitting.formUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-cardinal"
              >
                Open {submitting.formLabel}
                <ArrowRightIcon width={14} height={14} />
              </a>
            </SubCard>

            <SubCard title="Meet the Team">
              <p className="mb-3 text-sm leading-relaxed text-ink/85">
                {meetTheTeam.body}
              </p>
              <ul className="flex flex-col gap-2">
                {meetTheTeam.sessions.map((s) => (
                  <li
                    key={s.date}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-card bg-cream px-3 py-2.5 text-sm"
                  >
                    <span className="inline-flex items-center gap-1.5 font-semibold text-cardinal">
                      <CalendarIcon width={14} height={14} />
                      {s.label}
                    </span>
                    <span className="text-ink-muted">{s.time}</span>
                    <span className="inline-flex items-center gap-1.5 text-ink-muted">
                      <PinIcon width={14} height={14} />
                      Short game area · driving range
                    </span>
                  </li>
                ))}
              </ul>
            </SubCard>

            <SubCard title="Questions">
              <p className="text-sm leading-relaxed text-ink/85">
                Reach out to {contact.name} at{" "}
                <a
                  href={contact.phoneHref}
                  className="font-semibold text-cardinal hover:underline"
                >
                  {contact.phone}
                </a>{" "}
                or{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="font-semibold text-cardinal hover:underline"
                >
                  {contact.email}
                </a>
                .
              </p>
              <p className="mt-3 text-xs text-ink-muted">
                Looking for social membership (no tryout)?{" "}
                <Link
                  href="/membership"
                  transitionTypes={["nav-forward"]}
                  className="font-semibold text-cardinal hover:underline"
                >
                  Join the club here
                </Link>
                .
              </p>
            </SubCard>
          </div>
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
