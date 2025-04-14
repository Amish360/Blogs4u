"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Support = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-md border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-900">
          Support & Help Center
        </h1>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-10">
          Got a question or need help? We’re here for all things gaming, sports,
          and movies!
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              📧 Email Support
            </h2>
            <p className="text-gray-600">
              Reach out to us at{" "}
              <a
                href="mailto:support@blogs4u.com"
                className="text-blue-600 underline"
              >
                support@blogs4u.com
              </a>{" "}
              for account issues, content inquiries, or anything else.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              ❓ Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Check our{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => router.push("/FAQ")}
              >
                FAQ page
              </span>{" "}
              for answers to common questions around accounts, blogs, posting,
              and more.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              📝 Feedback & Suggestions
            </h2>
            <p className="text-gray-600">
              Want to request a feature or suggest a blog topic? We would love
              to hear from you at{" "}
              <a
                href="mailto:feedback@blogs4u.com"
                className="text-blue-600 underline"
              >
                feedback@blogs4u.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Blogs4U. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Support;
