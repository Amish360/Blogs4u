"use client";
import React, { useEffect } from "react";
import CommunityCard from "@/components/communityCard";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/src/redux/slices/categoriesSlice";
import { RootState, AppDispatch } from "@/src/redux/store";

export default function CommunitySection() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    list: categories,
    loading,
    error,
  } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  if (loading) {
    return <p className="text-center p-4">Loading communities...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center p-4">{error}</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
      {categories.map((category) => (
        <CommunityCard
          key={category.id}
          name={category.name}
          image={`https://source.unsplash.com/600x400/?${category.name.toLowerCase()}`} // 👈 dynamic image
          onClick={() => router.push(`/Community/${category.id}`)} // 👈 push by ID
        />
      ))}
    </div>
  );
}
