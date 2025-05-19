"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid"; // Update the import path if needed
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { fetchCommunityBlogs } from "@/src/redux/slices/communityBlogsSlice";

const categoryMap: Record<string, number> = {
  tech: 1,
  gaming: 2,
  sports: 3,
};

const CommunityPage = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const slug = params?.slug as string;
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.communityBlogs
  );

  useEffect(() => {
    const categoryId = categoryMap[slug];
    if (categoryId) {
      dispatch(fetchCommunityBlogs({ categoryID: categoryId }));
    }
  }, [slug, dispatch]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold capitalize mb-6">{slug} Community</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found in this community</p>
      ) : (
        <BlogsGrid>
          {blogs.map((blog) => (
            <BentoGridItem
              key={blog.id}
              title={blog.title}
              description={blog.content.slice(0, 100) + "..."}
              image={blog.coverImage || "/default.jpg"}
              onClick={() => router.push(`/blogDetail/${blog.id}`)}
            />
          ))}
        </BlogsGrid>
      )}
    </div>
  );
};

export default CommunityPage;
