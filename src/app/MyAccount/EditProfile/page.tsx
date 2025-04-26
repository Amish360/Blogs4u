"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "Amish360",
    email: "amish360@example.com",
    avatarUrl: "https://source.unsplash.com/100x100/?portrait",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(form.avatarUrl);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    image?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; image?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!selectedFile) {
      newErrors.image = "Please upload an image.";
    } else if (
      !["image/jpeg", "image/png", "image/gif"].includes(selectedFile.type)
    ) {
      newErrors.image = "Only JPEG, PNG, and GIF images are allowed.";
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      newErrors.image = "Image size must be less than 5MB.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined })); // clear error on change
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrors((prev) => ({ ...prev, image: undefined })); // clear image error
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("Profile Updated:", form);
    console.log("Selected File:", selectedFile);

    router.push("/MyAccount");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload and Preview */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700">
              <Image
                src={previewUrl}
                alt="Avatar Preview"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full max-w-xs"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          {/* Name Field */}
          <div>
            <label
              className="block text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              className="block text-sm font-medium mb-1 dark:text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
