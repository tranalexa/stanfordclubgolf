import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "@/lib/content";

export default function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link href={`/news/${post.slug}`} className="group flex gap-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-card bg-cream-2 tablet:h-32 tablet:w-32">
          {post.image && (
            <Image
              src={post.image}
              alt=""
              fill
              sizes="128px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-ink-muted">{formatDate(post.date)}</p>
          <h3 className="section-title mt-0.5 text-xl leading-tight group-hover:underline decoration-2 underline-offset-4 tablet:text-2xl">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </li>
  );
}
