import React from "react";
import Link from "next/link";

const Support = () => {
  return (
    <div className="bg-[var(--paper)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-[var(--paper-raised)] p-6 sm:p-10 rounded-md shadow-md border border-[var(--line)]">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-center mb-6 text-[var(--ink)]">
          Support &amp; Help Center
        </h1>
        <p className="text-base sm:text-lg text-[var(--ink-soft)] text-center mb-10">
          Got a question or need help? We&rsquo;re here for all things
          software, travel, wellness, and food.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg text-[var(--ink)] mb-1">
              Email Support
            </h2>
            <p className="text-[var(--ink-soft)]">
              Reach out to us at{" "}
              <a
                href="mailto:support@blogs4u.com"
                className="text-[var(--accent-teal)] underline"
              >
                support@blogs4u.com
              </a>{" "}
              for content inquiries or anything else.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[var(--ink)] mb-1">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--ink-soft)]">
              Check our{" "}
              <Link
                href="/FAQ"
                className="text-[var(--accent-teal)] underline"
              >
                FAQ page
              </Link>{" "}
              for answers to common questions about reading and writing on
              Blogs4U.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-[var(--ink)] mb-1">
              Feedback &amp; Suggestions
            </h2>
            <p className="text-[var(--ink-soft)]">
              Want to request a feature or suggest a blog topic? We would love
              to hear from you at{" "}
              <a
                href="mailto:feedback@blogs4u.com"
                className="text-[var(--accent-teal)] underline"
              >
                feedback@blogs4u.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-[var(--ink-faint)]">
          &copy; {new Date().getFullYear()} Blogs4U. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Support;
