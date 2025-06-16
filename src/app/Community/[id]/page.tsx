import { notFound } from "next/navigation";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid";
import {
  getAllAuthors,
  getBlogsByCategory,
  getCategories,
  getCategoryBySlug,
} from "@/lib/content";

export async function generateStaticParams() {
  return getCategories().map((category) => ({ id: category.slug }));
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryBySlug(id);

  if (!category) {
    notFound();
  }

  const blogs = getBlogsByCategory(id);
  const authors = getAllAuthors();

  return (
    <div className="p-8 bg-[var(--paper)]">
      <h1 className="font-serif text-4xl font-semibold capitalize mb-6 text-[var(--ink)]">
        {category.name}
      </h1>
      {blogs.length === 0 ? (
        <p className="text-[var(--ink-soft)]">No blogs found in this community</p>
      ) : (
        <BlogsGrid>
          {blogs.map((blog) => {
            const author = authors.find((a) => a.slug === blog.author);
            return (
              <BentoGridItem
                key={blog.slug}
                title={blog.title}
                description={blog.excerpt}
                image={blog.coverImage}
                href={`/blogPage/${blog.slug}`}
                author={
                  author
                    ? {
                        id: author.slug,
                        name: author.name,
                        avatarUrl: author.avatarUrl,
                        href: `/author/${author.slug}`,
                      }
                    : undefined
                }
              />
            );
          })}
        </BlogsGrid>
      )}
    </div>
  );
}
