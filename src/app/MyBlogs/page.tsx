"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
}

const MyBlogs = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  useEffect(() => {
    const fetchBlogs = async () => {
      setTimeout(() => {
        const dummyBlogs: Blog[] = [
          {
            id: 1,
            title: "Top 10 Underrated Sports Moments",
            excerpt:
              "A look at the most underrated moments in sports history...",
            category: "Sports",
            createdAt: "2025-04-01",
          },
          {
            id: 2,
            title: "Why RPG Games Are Still King",
            excerpt: "Exploring the legacy of RPGs in the gaming world...",
            category: "Gaming",
            createdAt: "2025-03-28",
          },
          {
            id: 3,
            title: "The Future of E-Sports",
            excerpt: "What does the future hold for competitive gaming?",
            category: "Gaming",
            createdAt: "2025-04-10",
          },
          {
            id: 4,
            title: "How Sports Shape Our Lives",
            excerpt:
              "Sports and their impact on society and character building.",
            category: "Sports",
            createdAt: "2025-03-15",
          },
          {
            id: 5,
            title: "Hidden Indie Gems",
            excerpt: "Underrated indie games you should be playing right now.",
            category: "Gaming",
            createdAt: "2025-02-20",
          },
        ];

        setBlogs(dummyBlogs); // Replace with fetch later
        setLoading(false);
      }, 1500);
    };

    fetchBlogs();
  }, []);

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      console.log("Deleted blog with id:", id);
    }
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const goToNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const goToPrevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

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
              {currentBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="relative bg-white rounded-xl shadow-md p-6 border border-gray-200 transition hover:shadow-lg flex flex-col justify-between"
                >
                  {/* 🗑️ Delete Button */}
                  <button
                    onClick={() => handleDelete(blog.id)}
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
                      {blog.category}
                    </span>
                  </div>

                  {/* 📖 Excerpt & Date */}
                  <p className="text-gray-700 mb-2">{blog.excerpt}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Published on {blog.createdAt}
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

            {/* Pagination controls */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
