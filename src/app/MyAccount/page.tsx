"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Account = () => {
  const router = useRouter();

  const user = {
    name: "Amish360",
    email: "amish360@example.com",
    avatarUrl: "https://source.unsplash.com/100x100/?portrait",
    blogCount: 5, // Replace this with a real API call later
  };

  // Logout handler function
  const handleLogout = () => {
    // Clear user session or authentication tokens (adjust based on your auth strategy)
    localStorage.removeItem("authToken"); // Example: Removing an auth token
    sessionStorage.removeItem("authToken"); // If you use session storage
    // Redirect to the login page or home page after logout
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-10 flex flex-col items-center text-center dark:bg-gray-900 transition duration-300">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold mb-1 dark:text-white">{user.name}</h1>
        <p className="text-gray-500 mb-2 dark:text-gray-400">{user.email}</p>

        <p className="text-sm text-muted-foreground mb-6">
          Blogs posted: <span className="font-medium">{user.blogCount}</span>
        </p>

        <div className="flex flex-row gap-4 mt-4">
          <Button onClick={() => router.push("/MyAccount/EditProfile")}>
            Edit Profile
          </Button>
          {/* Logout button triggers the logout handler */}
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Button onClick={() => router.push("/MyBlogs")} className="mt-6 ">
          View My Blogs
        </Button>
      </div>
    </div>
  );
};

export default Account;
