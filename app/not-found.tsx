import Link from "next/link";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard } from "@/components/ContentCard";

export default function NotFound() {
  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-schedule.jpg"
          alt=""
          title={
            <>
              Out of
              <br />
              Bounds
            </>
          }
        />
      }
    >
      <ContentCard className="flex items-center justify-center">
        <div className="text-center">
          <p className="section-title text-6xl">404</p>
          <p className="mt-2 text-ink-muted">That page isn&apos;t on the course.</p>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="mt-6 inline-block rounded-md bg-cardinal px-5 py-2.5 font-heading text-sm font-semibold text-white hover:bg-cardinal-dark"
          >
            Back to the clubhouse
          </Link>
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
