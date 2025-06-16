import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllBlogs,
  getAuthorBySlug,
  getBlogBySlug,
  getCategoryBySlug,
} from "@/lib/content";
import BlogPostView from "@/components/blogPostView";

export async function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ id: blog.slug }));
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = getBlogBySlug(id);

  if (!blog) {
    notFound();
  }

  const author = getAuthorBySlug(blog.author);
  const category = getCategoryBySlug(blog.category);

  return (
    <BlogPostView
      title={blog.title}
      coverImage={blog.coverImage}
      publishedAt={blog.publishedAt}
      category={
        category
          ? { name: category.name, href: `/Community/${category.slug}` }
          : null
      }
      author={
        author
          ? {
              name: author.name,
              avatarUrl: author.avatarUrl,
              href: `/author/${author.slug}`,
            }
          : null
      }
    >
      <MDXRemote source={blog.content} />
    </BlogPostView>
  );
}
