"use client";

export type Draft = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  publishedAt: string;
};

const STORAGE_KEY = "blogs4u:drafts";

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "untitled-post";
}

function readAll(): Draft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Draft[]) : [];
  } catch {
    return [];
  }
}

function writeAll(drafts: Draft[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

export function saveDraft(draft: Omit<Draft, "slug">): Draft {
  const drafts = readAll();
  const base = slugify(draft.title);
  let slug = base;
  let suffix = 2;
  while (drafts.some((d) => d.slug === slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  const saved: Draft = { ...draft, slug };
  writeAll([saved, ...drafts]);
  return saved;
}

export function getDraft(slug: string): Draft | null {
  return readAll().find((d) => d.slug === slug) ?? null;
}

export function getAllDrafts(): Draft[] {
  return readAll();
}
