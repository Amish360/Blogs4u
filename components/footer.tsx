"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-white text-[#111827] border-t border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 mt-10">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        {/* Logo */}
        <div>
          <Image
            src="/Blogs4u.png"
            alt="Blog4U Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Nav Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <li>
            <button
              onClick={() => router.push("/about")}
              className="hover:text-[#1f2937] transition-colors"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/privacy-policy")}
              className="hover:text-[#1f2937] transition-colors"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/licensing")}
              className="hover:text-[#1f2937] transition-colors"
            >
              Licensing
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push("/contact")}
              className="hover:text-[#1f2937] transition-colors"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Divider */}
        <hr className="w-full border-gray-200 dark:border-gray-700" />

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()}{" "}
          <button
            onClick={() => router.push("/")}
            className="hover:underline font-medium"
          >
            Blog4U™
          </button>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
