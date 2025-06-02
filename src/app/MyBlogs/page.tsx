"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2Icon, PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { fetchMyBlogs } from "@/src/redux/slices/blogSlice";
import { deleteBlog } from "@/src/redux/slices/blogDetailSlice"; // Import the delete action
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast"; // For showing notifications

const MyBlogs = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blog
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token); // Make sure you have token in auth state

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchMyBlogs(user.id));
    }
  }, [user, dispatch]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (confirmDelete && token) {
      try {
        await dispatch(deleteBlog({ id, token })).unwrap();
        toast.success("Blog deleted successfully");

        // Ensure user and user.id are valid before dispatching
        if (!user?.id) return;
        dispatch(fetchMyBlogs(user.id));
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete blog";
        toast.error(errorMessage);
      }
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              My Blogs
            </h1>
            <p className="text-gray-600 mt-2">
              {blogs.length} {blogs.length === 1 ? "blog" : "blogs"} published
            </p>
          </div>

          <Button
            onClick={() => router.push("/createBlog")}
            className="flex items-center gap-2"
          >
            <PlusIcon size={18} />
            Create New Blog
          </Button>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center">Loading your blogs...</p>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              No Blogs Found
            </h2>
            <p className="text-gray-500 mb-6 max-w-md">
              You have not created any blogs yet. Start sharing your ideas with
              the world!
            </p>
            <Button
              onClick={() => router.push("/createBlog")}
              className="flex items-center gap-2"
            >
              <PlusIcon size={18} />
              Create Your First Blog
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-red-100 transition-colors"
                  title="Delete Blog"
                >
                  <Trash2Icon size={18} className="text-red-500" />
                </button>

                {/* Image */}
                <div className="w-full h-48 relative overflow-hidden">
                  <Image
                    src={
                      blog.coverImage ||
                      `https://source.unsplash.com/600x400/?${blog.category.name}`
                    }
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="inline-block text-xs font-medium px-3 py-1 bg-black text-white rounded-full mb-2">
                      {blog.category?.name}
                    </span>
                    <h2 className="text-xl font-bold tracking-tight line-clamp-2">
                      {blog.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.content.slice(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/blogPage/${blog.id}`)}
                      className="text-sm"
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
