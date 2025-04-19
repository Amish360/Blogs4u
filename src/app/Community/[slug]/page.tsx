"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid"; // Update the import path if needed
import { useRouter } from "next/navigation";

// Simulated dummy blogs for communities
const dummyBlogs = {
  tech: [
    {
      id: 1,
      title: "React vs Vue",
      excerpt: "Which one to choose...",
      image: "/images/react-vs-vue.jpg",
    },
    {
      id: 2,
      title: "AI and the Future",
      excerpt: "Discussing AI trends...",
      image: "/images/ai-future.jpg",
    },
  ],
  gaming: [
    {
      id: 1,
      title: "Best RPGs 2025",
      excerpt: "Top role-playing games...",
      image: "/images/rpg-2025.jpg",
    },
    {
      id: 2,
      title: "Esports Rising",
      excerpt: "The growth of competitive gaming...",
      image: "/images/esports.jpg",
    },
  ],
};

const CommunityPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug as string);
      setLoading(false);
    }
  }, [params]);

  if (loading || !slug) {
    return (
      <div className="p-8 text-center text-xl font-medium text-gray-600">
        Loading community...
      </div>
    );
  }

  const blogs = dummyBlogs[slug as keyof typeof dummyBlogs] || [];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold capitalize mb-6">{slug} Community</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No blogs available in this community yet.
        </p>
      ) : (
        <BlogsGrid>
          {blogs.map((blog, index) => (
            <BentoGridItem
              key={index}
              title={blog.title}
              description={blog.excerpt}
              image={blog.image} // 👈 pass image prop
              onClick={() => router.push(`/blogDetail/${blog.id}`)}
            />
          ))}
        </BlogsGrid>
      )}
    </div>
  );
};

export default CommunityPage;
