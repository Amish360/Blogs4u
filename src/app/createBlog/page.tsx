"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { createBlog } from "@/src/redux/slices/blogSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateBlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.blog);

  const [form, setForm] = useState({
    title: "",
    content: "",
    categoryId: 1,
    coverImage: "",
    published: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Or get from context/cookie

    if (!token) {
      alert("You must be logged in to create a blog.");
      return;
    }

    dispatch(
      createBlog({
        ...form,
        categoryId: Number(form.categoryId),
        token,
      })
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          rows={8}
          value={form.content}
          onChange={handleChange}
        />
        <Input
          name="coverImage"
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={handleChange}
        />
        <Input
          name="categoryId"
          type="number"
          placeholder="Category ID"
          value={form.categoryId}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <label htmlFor="published">Published</label>
          <input
            id="published"
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Blog"}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CreateBlogPage;
