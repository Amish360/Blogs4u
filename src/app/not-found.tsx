// app/not-found.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Optionally, redirect to home after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/home");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-2xl mb-6">Oops! Page Not Found.</p>
      <p className="mb-6 text-center max-w-md text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => router.push("/home")}
      >
        Go to Home
      </button>
    </div>
  );
}
