import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type BlogPostViewProps = {
  title: string;
  coverImage?: string;
  publishedAt: string;
  category?: { name: string; href: string } | null;
  author?: { name: string; avatarUrl: string; href: string } | null;
  children: ReactNode;
  banner?: ReactNode;
};

const BlogPostView = ({
  title,
  coverImage,
  publishedAt,
  category,
  author,
  children,
  banner,
}: BlogPostViewProps) => {
  return (
    <div className="bg-[var(--paper)] px-4 py-10 sm:px-8">
      <article className="mx-auto max-w-3xl">
        {banner}

        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-mono uppercase tracking-wide text-[var(--accent-teal)]">
          {category && (
            <Link href={category.href} className="hover:underline">
              {category.name}
            </Link>
          )}
          <span className="text-[var(--ink-faint)]">
            {new Date(publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[var(--ink)] mb-6">
          {title}
        </h1>

        {author && (
          <Link
            href={author.href}
            className="flex items-center gap-3 mb-8 w-fit hover:underline"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--line)]">
              <Image
                src={author.avatarUrl || "/fallback-avatar.jpg"}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-[var(--ink)]">
              {author.name}
            </span>
          </Link>
        )}

        {coverImage && (
          <div className="relative w-full h-64 sm:h-96 rounded-md overflow-hidden mb-10 border border-[var(--line)]">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="mx-auto max-w-[68ch] text-[var(--ink)] leading-relaxed
            [&>p]:mb-5 [&>p]:text-base [&>p]:sm:text-lg
            [&>h1]:font-serif [&>h1]:text-3xl [&>h1]:font-semibold [&>h1]:mt-10 [&>h1]:mb-4
            [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4
            [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3
            [&_a]:text-[var(--accent-teal)] [&_a]:underline [&_a]:underline-offset-2
            [&_strong]:text-[var(--ink)] [&_strong]:font-semibold
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5
            [&_li]:mb-2
            [&>blockquote]:border-l-2 [&>blockquote]:border-[var(--accent-teal)] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[var(--ink-soft)] [&>blockquote]:my-6
            [&_code]:font-mono [&_code]:text-sm [&_code]:bg-[var(--muted)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm
            [&>pre]:bg-[var(--ink)] [&>pre]:text-[var(--paper)] [&>pre]:rounded-md [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:mb-5"
        >
          {children}
        </div>
      </article>
    </div>
  );
};

export default BlogPostView;
