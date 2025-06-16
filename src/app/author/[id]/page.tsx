import { notFound } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid";
import {
  getAllAuthors,
  getAuthorBySlug,
  getBlogsByAuthor,
} from "@/lib/content";

export async function generateStaticParams() {
  return getAllAuthors().map((author) => ({ id: author.slug }));
}

export default async function AuthorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = getAuthorBySlug(id);

  if (!author) {
    notFound();
  }

  const blogs = getBlogsByAuthor(id);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8 bg-[var(--paper)]">
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={
                author.avatarUrl ??
                `https://api.dicebear.com/7.x/initials/svg?seed=${author.name}`
              }
              alt={author.name}
            />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)]">
              {author.name}
            </h2>
            <p className="text-sm text-[var(--ink-soft)]">
              {blogs.length} Blog{blogs.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {author.bio && (
          <CardContent className="mt-6 text-[var(--ink-soft)] leading-relaxed">
            {author.bio}
          </CardContent>
        )}
      </Card>

      {blogs.length > 0 ? (
        <BlogsGrid>
          {blogs.map((blog) => (
            <BentoGridItem
              key={blog.slug}
              title={blog.title}
              description={blog.excerpt}
              image={blog.coverImage}
              href={`/blogPage/${blog.slug}`}
            />
          ))}
        </BlogsGrid>
      ) : (
        <p className="text-center text-[var(--ink-soft)]">No blogs found.</p>
      )}
    </div>
  );
}
