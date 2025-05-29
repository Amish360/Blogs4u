"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <h1 className="text-[80px] font-extrabold text-[#111827] mb-2">404</h1>
      <p className="text-xl text-[#374151] mb-4">Oops! Page Not Found.</p>
      <p className="text-center text-[#6B7280] max-w-md mb-8">
        The page you are looking for doesn’t exist or has been moved. You’ll be
        redirected shortly.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-[#111827] text-white rounded-md hover:bg-[#1f2937] transition-colors duration-200"
        onClick={() => router.push("/")}
      >
        Go to Home
      </motion.button>
    </div>
  );
}
