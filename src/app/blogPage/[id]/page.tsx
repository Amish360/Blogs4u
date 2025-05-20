"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import { PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { fetchBlogDetail } from "@/src/redux/slices/blogDetailSlice";

const BlogDetail = () => {
  const { id } = useParams();
  // const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { blog, loading, error } = useSelector(
    (state: RootState) => state.blogDetail
  );

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogDetail(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setForm({
        title: blog.title,
        content: blog.content,
        category: blog.category.name,
      });
    }
  }, [blog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Dispatch an update API if needed
    console.log("Saving blog changes:", form);
    setIsEditing(false);
  };

  // const handleDelete = (id: number) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this blog?"
  //   );
  //   if (confirmDelete) {
  //     console.log("Deleting blog with id:", id);
  //     // TODO: Dispatch a deleteBlog API
  //     router.push("/MyBlogs");
  //   }
  // };

  if (loading || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden max-w-4xl">
        {/* 🖼️ Image */}
        {blog?.coverImage && (
          <div className="w-full h-64 bg-gray-200 overflow-hidden relative">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
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
                {blog?.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : "Unknown Date"}{" "}
                · {blog?.category?.name || "Unknown Category"}
              </p>
            </div>

            {/* {blog?.authorId === currentUser.id && (
              <div className="flex gap-2">
                <Button
                  size="icon"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="text-white hover:text-yellow-600 bg-black p-3 rounded-3xl"
                  title="Edit Blog"
                >
                  <PencilIcon size={20} />
                </Button>
                <Button
                  variant="destructive"
                  className="text-white hover:text-red-700 bg-red-500 p-3 rounded-3xl"
                  onClick={() => handleDelete(blog.id)}
                >
                  <Trash2Icon size={20} />
                </Button>
              </div>
            )} */}
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
            <p className="text-gray-700 whitespace-pre-wrap">{blog?.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
