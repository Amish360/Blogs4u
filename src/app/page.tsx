import { Button } from "@/components/ui/button";
import ShuffleHero from "@/components/herosection";
import BlogPostCarousel from "@/components/blogPostCarousel";
import { ExpandableCardDemo } from "@/components/authors";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid";
import Link from "next/link";
import {
  getAllAuthors,
  getAllBlogs,
  getAuthorBlogCount,
  getFeaturedBlogs,
} from "@/lib/content";

export default function Home() {
  const featuredBlogs = getFeaturedBlogs(4);
  const allBlogs = getAllBlogs();
  const authors = getAllAuthors().map((author) => ({
    slug: author.slug,
    name: author.name,
    avatarUrl: author.avatarUrl,
    bio: author.bio,
    blogCount: getAuthorBlogCount(author.slug),
  }));

  const heroImages = allBlogs.map((blog) => blog.coverImage);

  return (
    <main className="bg-[var(--paper)] text-center text-[var(--ink)] overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 sm:py-32">
        <ShuffleHero images={heroImages} />
      </section>

      {/* Featured Blogs Section */}
      <section className="w-full">
        <BlogPostCarousel
          heading="Featured Stories"
          posts={featuredBlogs.map((blog) => ({
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.excerpt,
            coverImage: blog.coverImage,
          }))}
        />
      </section>

      {/* Best Authors Section */}
      <section className="px-6 py-24 sm:py-28 bg-[var(--paper)] w-full">
        <h2 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight mb-12">
          Meet the Writers
        </h2>
        <ExpandableCardDemo authors={authors} />
      </section>

      {/* All posts */}
      <section className="px-6 py-24 sm:py-28 bg-[var(--paper-raised)] w-full">
        <h2 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight mb-12">
          Recent Posts
        </h2>
        <BlogsGrid>
          {allBlogs.map((blog) => (
            <BentoGridItem
              key={blog.slug}
              title={blog.title}
              description={blog.excerpt}
              image={blog.coverImage}
              href={`/blogPage/${blog.slug}`}
              author={{
                id: blog.author,
                name:
                  authors.find((a) => a.slug === blog.author)?.name ??
                  blog.author,
                avatarUrl: authors.find((a) => a.slug === blog.author)
                  ?.avatarUrl,
                href: `/author/${blog.author}`,
              }}
            />
          ))}
        </BlogsGrid>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center space-y-6 px-6 py-24 bg-[var(--paper)]">
        <h2 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight">
          Become a Blogger Now
        </h2>
        <p className="max-w-2xl text-lg text-[var(--ink-soft)]">
          Share your voice with the world. Create, inspire, and grow with
          Blogs4U.
        </p>
        <Button asChild className="text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform">
          <Link href="/createBlog">Start Writing</Link>
        </Button>
      </section>
    </main>
  );
}
