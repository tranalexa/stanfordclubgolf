import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import HeroCard from "@/components/HeroCard";
import SplitLayout from "@/components/SplitLayout";
import { ContentCard } from "@/components/ContentCard";
import { ArrowRightIcon } from "@/components/Icons";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/news/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.image ? { images: [{ url: post.image }] } : undefined,
  };
}

export default async function PostPage(props: PageProps<"/news/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked.parse(post.content);

  return (
    <SplitLayout
      hero={
        <HeroCard
          image={post.image ?? "/images/hero-news.jpg"}
          alt=""
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
        <article className="mx-auto max-w-2xl px-1 py-4 tablet:px-4">
          <Link
            href="/news"
            transitionTypes={["nav-back"]}
            className="inline-flex items-center gap-1 text-xs font-semibold text-cardinal hover:underline"
          >
            <ArrowRightIcon width={14} height={14} className="rotate-180" />
            All news
          </Link>
          <p className="mt-5 text-sm text-ink-muted">{formatDate(post.date)}</p>
          <h1 className="section-title mt-1 text-3xl leading-tight tablet:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">{post.excerpt}</p>
          <hr className="my-6 border-cardinal/20" />
          <div className="prose-club" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </ContentCard>
    </SplitLayout>
  );
}
