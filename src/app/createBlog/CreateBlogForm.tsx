"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Category } from "@/lib/content";
import { saveDraft } from "@/lib/localDrafts";

type CreateBlogFormProps = {
  categories: Category[];
};

const CreateBlogForm = ({ categories }: CreateBlogFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: categories[0]?.slug ?? "",
  });
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // No backend exists yet — this payload shape is what a future API would receive.
    const saved = saveDraft({
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      category: form.category,
      coverImage: coverPreview,
      publishedAt: new Date().toISOString(),
    });

    toast.success("Saved — here's how your post will look.");
    router.push(`/createBlog/preview?slug=${saved.slug}`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 mb-16 p-6 sm:p-8 bg-[var(--paper-raised)] shadow-md rounded-md border border-[var(--line)]">
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] mb-2">
        Write a New Post
      </h1>
      <p className="text-sm text-[var(--ink-soft)] mb-6">
        This form isn&rsquo;t wired to a backend yet — submitting saves your
        draft to this browser and takes you to a preview of how it will look.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            id="excerpt"
            name="excerpt"
            placeholder="A short summary of the post"
            value={form.excerpt}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post in Markdown/MDX..."
            rows={10}
            value={form.content}
            onChange={handleChange}
            className="border-input bg-card w-full rounded-sm border px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image</Label>
          <Input
            id="cover"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {coverPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverPreview}
              alt="Cover preview"
              className="mt-3 w-full h-56 object-cover rounded-md border border-[var(--line)]"
            />
          )}
        </div>

        <div className="space-y-3">
          <Label>Category</Label>
          <RadioGroup
            value={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {categories.map((category) => (
              <label
                key={category.slug}
                htmlFor={`category-${category.slug}`}
                className="flex items-center gap-2 text-sm text-[var(--ink)] cursor-pointer"
              >
                <RadioGroupItem
                  id={`category-${category.slug}`}
                  value={category.slug}
                />
                {category.name}
              </label>
            ))}
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Save Draft
        </Button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
