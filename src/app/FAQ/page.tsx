import React from "react";

const faqs = [
  {
    question: "What kind of content can I find on this blog?",
    answer:
      "Our blog covers software, travel, wellness, and food & cooking — written by people who actually did the thing before writing about it.",
  },
  {
    question: "How often is new content posted?",
    answer:
      "We post regularly throughout the week, with new essays and guides added across all four categories.",
  },
  {
    question: "Can I contribute articles to the blog?",
    answer:
      "Yes! We welcome passionate writers. Use the Write page to draft a post, or reach out via the Support page to get started.",
  },
  {
    question: "Do I need an account to read articles?",
    answer:
      "No, you can freely browse all content. There's no login required to read.",
  },
  {
    question: "Are the reviews and opinions biased or sponsored?",
    answer:
      "Our writing is honest and based on personal or team experience. Sponsored content, if any, is clearly marked.",
  },
  {
    question: "How can I stay updated with the latest posts?",
    answer:
      "Check back on the homepage — featured and recent posts are always surfaced there first.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-[var(--paper)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-10 leading-snug text-[var(--ink)]">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--paper-raised)] p-5 sm:p-6 lg:p-8 rounded-md shadow-sm border border-[var(--line)] transition hover:shadow-md"
            >
              <h2 className="text-base sm:text-lg font-semibold text-[var(--ink)]">
                {faq.question}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--ink-soft)]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
