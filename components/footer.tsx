"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex">
            <Image src="/Blogs4u.png" alt="Logo" width={100} height={100} />
          </div>

          <ul className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <button
                onClick={() => router.push("/about")}
                className="hover:underline"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/privacy-policy")}
                className="hover:underline"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/licensing")}
                className="hover:underline"
              >
                Licensing
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push("/contact")}
                className="hover:underline"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <button
            onClick={() => router.push("/")}
            className="hover:underline font-medium"
          >
            Blogs4U™
          </button>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
