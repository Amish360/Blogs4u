"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/lib/content";
import { getDraft, type Draft } from "@/lib/localDrafts";
import BlogPostView from "@/components/blogPostView";

function DraftPreview({ categories }: { categories: Category[] }) {
  const slug = useSearchParams().get("slug") ?? "";
  const [draft, setDraft] = useState<Draft | null | undefined>(undefined);

  useEffect(() => {
    setDraft(slug ? getDraft(slug) : null);
  }, [slug]);

  if (draft === undefined) {
    return null;
  }

  if (!draft) {
    return (
      <div className="max-w-xl mx-auto mt-24 mb-24 text-center px-4">
        <h1 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-3">
          No draft found
        </h1>
        <p className="text-[var(--ink-soft)] mb-6">
          This preview only works in the browser that saved the draft, and
          only until local storage is cleared.
        </p>
        <Link
          href="/createBlog"
          className="text-[var(--accent-teal)] underline underline-offset-2"
        >
          Back to the editor
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === draft.category);

  return (
    <BlogPostView
      title={draft.title}
      coverImage={draft.coverImage}
      publishedAt={draft.publishedAt}
      category={
        category
          ? { name: category.name, href: `/Community/${category.slug}` }
          : null
      }
      banner={
        <div className="mb-8 rounded-md border border-[var(--accent-mustard)] bg-[var(--paper-raised)] px-4 py-3 text-sm text-[var(--ink)] flex flex-wrap items-center justify-between gap-3">
          <span>
            This is a local preview — it&rsquo;s saved only in this browser
            and isn&rsquo;t published anywhere yet.
          </span>
          <Link
            href="/createBlog"
            className="text-[var(--accent-teal)] underline underline-offset-2 whitespace-nowrap"
          >
            Back to editor
          </Link>
        </div>
      }
    >
      {draft.excerpt && (
        <p className="text-lg text-[var(--ink-soft)] italic mb-6">
          {draft.excerpt}
        </p>
      )}
      {draft.content
        .split(/\n{2,}/)
        .filter((block) => block.trim().length > 0)
        .map((block, i) => (
          <p key={i}>{block}</p>
        ))}
    </BlogPostView>
  );
}

export default function DraftPreviewClient({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Suspense fallback={null}>
      <DraftPreview categories={categories} />
    </Suspense>
  );
}
