"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  image?: string; // 👈 Optional image field
}

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      const dummyBlogs: Blog[] = [
        {
          id: 1,
          title: "Top 10 Underrated Sports Moments",
          content:
            "Full breakdown of the most underrated moments in sports history...",
          category: "Sports",
          createdAt: "2025-04-01",
          image: "https://source.unsplash.com/800x400/?sports",
        },
        {
          id: 2,
          title: "Why RPG Games Are Still King",
          content:
            "Exploring why RPGs remain unmatched in storytelling and world-building...",
          category: "Gaming",
          createdAt: "2025-03-28",
          image: "https://source.unsplash.com/800x400/?gaming",
        },
        {
          id: 3,
          title: "Top 10 Gaming Moments of 2025",
          content:
            "Here’s a breakdown of the most legendary gaming moments from this year...",
          category: "Gaming",
          createdAt: "2025-04-10",
          image: "https://source.unsplash.com/800x400/?video-games",
        },
      ];

      const foundBlog = dummyBlogs.find((b) => b.id === Number(id));
      if (foundBlog) {
        setBlog(foundBlog);
        setForm({
          title: foundBlog.title,
          content: foundBlog.content,
          category: foundBlog.category,
        });
      }
      setLoading(false);
    };

    if (id) fetchBlog();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setBlog((prev) => (prev ? { ...prev, ...form } : null));
    setIsEditing(false);
    console.log("Saved:", form);
  };

  if (loading || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading blog...</p>
      </div>
    );
  }

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      console.log("Deleted blog with id:", id);

      // ✅ Redirect after deletion
      router.push("/MyBlogs");
    }
  };
  return (
    <div className="bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* 🖼️ Image Section */}
        {blog?.image && (
          <div className="w-full h-48  bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={`https://source.unsplash.com/600x400/?${blog.category}`}
              alt={blog.title}
              className="w-full h-full object-cover"
              height={100}
              width={100}
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              {isEditing ? (
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="text-2xl font-bold mb-2"
                />
              ) : (
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                  {blog?.title}
                </h1>
              )}
              <p className="text-sm text-gray-400 my-2">
                {blog?.createdAt} · {blog?.category}
              </p>
            </div>

            {blog?.id && (
              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="text-white hover:text-red-700 bg-black p-3 rounded-3xl"
                  title="Edit Blog"
                >
                  <PencilIcon size={20} />
                </Button>
                <Button
                  variant="destructive"
                  className=" text-white hover:text-red-700 bg-red-500 p-3 rounded-3xl"
                  onClick={() => handleDelete(blog.id)}
                >
                  <Trash2Icon size={20} />
                </Button>
              </div>
            )}
          </div>

          {isEditing ? (
            <>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={10}
                className="w-full mb-4 border rounded-lg p-2"
              />
              <Input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full mb-4"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 whitespace-pre-wrap">
                {blog?.content}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
