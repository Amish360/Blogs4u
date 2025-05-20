"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/src/redux/slices/categoriesSlice";
import { fetchCommunityBlogs } from "@/src/redux/slices/communityBlogsSlice";
import { RootState, AppDispatch } from "@/src/redux/store";
import { BlogsGrid, BentoGridItem } from "@/components/blogsGrid";

const CommunityPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();

  const categoryID = parseInt(params.id as string); // 👈 get id from URL

  const { list: categories } = useSelector(
    (state: RootState) => state.categories
  );
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.communityBlogs
  );

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (categoryID) {
      dispatch(fetchCommunityBlogs({ categoryID }));
    }
  }, [categoryID, dispatch]);

  const category = categories.find((cat) => cat.id === categoryID);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold capitalize mb-6">
        {category?.name || "Community"}
      </h1>
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
