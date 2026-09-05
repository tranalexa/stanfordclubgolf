import type { Metadata } from "next";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard, RuleHeading } from "@/components/ContentCard";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Tournament recaps, announcements, and updates from Stanford Club Golf.",
};

export default function NewsPage() {
  const posts = getAllPosts();

  return (
    <SplitLayout
      hero={
        <HeroCard
          image="/images/hero-news.jpg"
          alt="Golf bag and clubs resting on the course"
          title={
            <>
              Club
              <br />
              News
            </>
          }
        />
      }
    >
      <ContentCard>
        <div className="px-1 py-4 tablet:px-4">
          <RuleHeading>Latest News</RuleHeading>
          {posts.length ? (
            <ul className="flex flex-col gap-7">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </ul>
          ) : (
            <p className="py-10 text-center text-sm text-ink-muted">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </ContentCard>
    </SplitLayout>
  );
}
