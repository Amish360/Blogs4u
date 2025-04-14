"use client";
import React from "react";

const faqs = [
  {
    question: "What kind of content can I find on this blog?",
    answer:
      "Our blog covers the latest news, reviews, and opinion pieces across gaming, sports, and movies. Expect game reviews, movie breakdowns, and match recaps all in one place.",
  },
  {
    question: "How often is new content posted?",
    answer:
      "We post regularly throughout the week. Gaming news might drop daily, while sports and movie content is aligned with major events and releases.",
  },
  {
    question: "Can I contribute articles to the blog?",
    answer:
      "Yes! We welcome passionate writers. Head over to the 'Write for Us' section or contact us directly to get started.",
  },
  {
    question: "Do I need an account to read articles?",
    answer:
      "Nope, you can freely browse all content. However, signing up gives you access to features like saving articles, commenting, and more.",
  },
  {
    question: "Are the reviews biased or sponsored?",
    answer:
      "Our reviews are honest and based on personal or team experiences. Sponsored content, if any, is clearly marked.",
  },
  {
    question: "How can I stay updated with the latest posts?",
    answer:
      "You can subscribe to our newsletter, follow us on social media, or turn on browser notifications for instant updates.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 leading-snug">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-200 transition hover:shadow-md"
            >
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
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
