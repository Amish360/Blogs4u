"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { fetchMyBlogs } from "@/src/redux/slices/blogSlice";

const MyBlogs = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchMyBlogs(user.id));
    }
  }, [user, dispatch]);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      // setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-8">
      <div className=" ">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          Welcome Back!
        </h1>

        {loading ? (
          <p className="text-gray-600 text-center">Loading your blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-2">
              No Blogs Found
            </h2>
            <p className="text-gray-500 mb-4">
              You haven’t created any blogs yet.
            </p>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Create Your First Blog
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="relative bg-white rounded-xl shadow-md p-6 border border-gray-200 transition hover:shadow-lg flex flex-col justify-between"
                >
                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => handleDelete()}
                    className="absolute top-2 right-2 text-white hover:text-red-700 bg-red-500 p-2 rounded-3xl"
                    title="Delete Blog"
                  >
                    <Trash2Icon size={20} />
                  </button>

                  {/* 🖼️ Image */}
                  <div className="w-full h-48 my-6 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={`https://source.unsplash.com/600x400/?${blog.category}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      height={100}
                      width={100}
                    />
                  </div>

                  {/* 📝 Title & Category */}
                  <div className="mb-3 space-y-3">
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      {blog.title}
                    </h2>
                    <span className="text-sm text-white bg-black rounded-md px-4 py-2 my-2">
                      {blog.category?.name}
                    </span>
                  </div>

                  {/* 📖 Excerpt & Date */}
                  <p className="text-gray-700 mb-2">
                    <p className="text-gray-700 mb-2">
                      {blog.content.slice(0, 100)}...
                    </p>
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Published on {new Date(blog.createdAt).toLocaleDateString()}
                  </p>

                  {/* 🔗 View Details Button */}
                  <button
                    onClick={() => router.push(`/blogDetail/${blog.id}`)}
                    className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
                  >
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
