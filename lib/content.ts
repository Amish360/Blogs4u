import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // raw MDX body (not yet compiled)
  coverImage: string;
  author: string; // author slug
  category: string; // category slug
  publishedAt: string;
  featured: boolean;
};

export type Author = {
  slug: string;
  name: string;
  avatarUrl: string;
  bio: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOGS_DIR = path.join(CONTENT_DIR, "blogs");
const AUTHORS_DIR = path.join(CONTENT_DIR, "authors");
const CATEGORIES_FILE = path.join(
  CONTENT_DIR,
  "categories",
  "categories.json"
);

function readMdxSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

let blogsCache: Blog[] | null = null;
let authorsCache: Author[] | null = null;
let categoriesCache: Category[] | null = null;

function loadAllBlogs(): Blog[] {
  if (blogsCache) return blogsCache;

  const slugs = readMdxSlugs(BLOGS_DIR);
  const blogs = slugs.map((slug) => {
    const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      excerpt: data.excerpt as string,
      content,
      coverImage: data.coverImage as string,
      author: data.author as string,
      category: data.category as string,
      publishedAt: data.publishedAt as string,
      featured: Boolean(data.featured),
    } satisfies Blog;
  });

  blogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  blogsCache = blogs;
  return blogs;
}

function loadAllAuthors(): Author[] {
  if (authorsCache) return authorsCache;

  const slugs = readMdxSlugs(AUTHORS_DIR);
  const authors = slugs.map((slug) => {
    const filePath = path.join(AUTHORS_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    return {
      slug,
      name: data.name as string,
      avatarUrl: data.avatarUrl as string,
      bio: data.bio as string,
    } satisfies Author;
  });

  authorsCache = authors;
  return authors;
}

function loadCategories(): Category[] {
  if (categoriesCache) return categoriesCache;

  if (!fs.existsSync(CATEGORIES_FILE)) {
    categoriesCache = [];
    return categoriesCache;
  }

  const raw = fs.readFileSync(CATEGORIES_FILE, "utf8");
  categoriesCache = JSON.parse(raw) as Category[];
  return categoriesCache;
}

export function getAllBlogs(): Blog[] {
  return loadAllBlogs();
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return loadAllBlogs().find((blog) => blog.slug === slug);
}

export function getFeaturedBlogs(limit = 3): Blog[] {
  const blogs = loadAllBlogs();
  const featured = blogs.filter((blog) => blog.featured);

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const remaining = blogs.filter((blog) => !blog.featured);
  return [...featured, ...remaining].slice(0, limit);
}

export function getAllAuthors(): Author[] {
  return loadAllAuthors();
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return loadAllAuthors().find((author) => author.slug === slug);
}

export function getBlogsByAuthor(authorSlug: string): Blog[] {
  return loadAllBlogs().filter((blog) => blog.author === authorSlug);
}

export function getAuthorBlogCount(authorSlug: string): number {
  return getBlogsByAuthor(authorSlug).length;
}

export function getCategories(): Category[] {
  return loadCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return loadCategories().find((category) => category.slug === slug);
}

export function getBlogsByCategory(categorySlug: string): Blog[] {
  return loadAllBlogs().filter((blog) => blog.category === categorySlug);
}
