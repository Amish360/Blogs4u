"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import {
  deleteBlog,
  fetchBlogDetail,
  updatedBlog,
} from "@/src/redux/slices/blogDetailSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PencilIcon, Trash2Icon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { blog, loading, error } = useSelector(
    (state: RootState) => state.blogDetail
  );

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    coverImage: "",
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

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
        coverImage: blog.coverImage || "",
      });
      setCoverPreview(blog.coverImage || "");
    }
  }, [blog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      try {
        const token = "your-auth-token";

        await dispatch(deleteBlog({ id, token })).unwrap();
        router.push("/MyBlogs");
      } catch {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);

      // For preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!blog) return;

    try {
      let uploadedImage = form.coverImage;

      // Use preview image directly for now
      if (coverFile) {
        uploadedImage = coverPreview;
      }

      // You can replace this with actual auth token from login state
      const token = "your-auth-token"; // Replace this with actual user token from Redux or context

      const updatedData = {
        title: form.title,
        content: form.content,
        category: blog.category, // Note: category is an object; update this only if your API supports it
        coverImage: uploadedImage,
      };

      await dispatch(
        updatedBlog({
          id: blog.id,
          data: updatedData,
          token,
        })
      ).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error("Redux blog update failed:", error);
    }
  };

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
        {/* 🖼️ Image Preview */}
        {coverPreview && (
          <div className="w-full h-64 bg-gray-200 overflow-hidden relative">
            <Image
              src={coverPreview}
              alt="Cover"
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

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="text-white bg-black flex items-center gap-2"
              >
                {isEditing ? <XIcon size={18} /> : <PencilIcon size={18} />}
              </Button>
              <Button
                variant="destructive"
                className="text-white hover:text-red-700 bg-red-500 p-3 rounded-3xl"
                onClick={() => blog?.id && handleDelete(blog.id)}
              >
                <Trash2Icon size={20} />
              </Button>
            </div>
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
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
