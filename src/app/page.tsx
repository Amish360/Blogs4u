"use client";

import { Button } from "@/components/ui/button";
import ShuffleHero from "@/components/herosection";
import { Carousel } from "@/components/carousel";
import { ExpandableCardDemo } from "@/components/authors";

const slides = [
  {
    title: "Mastering React in 7 Days",
    button: "Read Blog",
    src: "https://source.unsplash.com/800x400/?reactjs,code",
  },
  {
    title: "Understanding Next.js Routing",
    button: "Read Blog",
    src: "https://source.unsplash.com/800x400/?nextjs,webdev",
  },
  {
    title: "Styling with Tailwind CSS",
    button: "Read Blog",
    src: "https://source.unsplash.com/800x400/?tailwind,design",
  },
  {
    title: "The Future of Web Development",
    button: "Read Blog",
    src: "https://source.unsplash.com/800x400/?technology,web",
  },
];

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center text-gray-800 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-24 sm:py-32">
        <ShuffleHero />
      </section>

      {/* Featured Blogs Section */}
      <section className="px-6 py-24 sm:py-28 bg-white dark:bg-gray-900 w-full">
        <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-12">
          Featured Blogs
        </h2>
        <Carousel slides={slides} />
      </section>

      {/* Best Authors Section */}
      <section className="px-6 py-24 sm:py-28 bg-gray-50 dark:bg-gray-800 w-full">
        <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-12">
          Best Authors
        </h2>
        <ExpandableCardDemo />
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center space-y-6 px-6 py-24 bg-white dark:bg-gray-900">
        <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          Become a Blogger Now
        </h2>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Share your voice with the world. Create, inspire, and grow with
          Blogs4U.
        </p>
        <Button className="text-lg px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform">
          Sign Up
        </Button>
      </section>
    </main>
  );
}
