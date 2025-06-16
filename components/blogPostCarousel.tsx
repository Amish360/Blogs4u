"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

export type CarouselPost = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
};

type BlogPostCarouselProps = {
  posts: CarouselPost[];
  heading?: string;
};

const BlogPostCarousel = ({ posts, heading = "Featured Stories" }: BlogPostCarouselProps) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (posts.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  return (
    <section className="bg-[var(--muted)] py-8" ref={ref}>
      <div className="relative overflow-hidden p-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 font-serif text-4xl text-[var(--ink)]">{heading}</h2>

            <div className="flex items-center gap-2">
              <button
                className={`rounded-sm border border-[var(--line)] bg-[var(--paper-raised)] p-1.5 text-2xl transition-opacity text-[var(--ink)] ${
                  CAN_SHIFT_LEFT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_LEFT}
                onClick={shiftLeft}
              >
                <FiArrowLeft />
              </button>
              <button
                className={`rounded-sm border border-[var(--line)] bg-[var(--paper-raised)] p-1.5 text-2xl transition-opacity text-[var(--ink)] ${
                  CAN_SHIFT_RIGHT ? "" : "opacity-30"
                }`}
                disabled={!CAN_SHIFT_RIGHT}
                onClick={shiftRight}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="flex"
          >
            {posts.map((post) => {
              return <Post key={post.slug} {...post} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Post = ({ slug, coverImage, title, excerpt }: CarouselPost) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Link
      href={`/blogPage/${slug}`}
      className="relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1 block"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
      }}
    >
      <Image
        src={imageError ? "/fallback-image.jpg" : coverImage}
        className="mb-3 h-[200px] w-full rounded-md object-cover"
        alt={title}
        height={200}
        width={350}
        onError={() => setImageError(true)}
      />
      <p className="mt-1.5 font-serif text-lg font-medium text-[var(--ink)]">{title}</p>
      <p className="text-sm text-[var(--ink-soft)]">{excerpt}</p>
    </Link>
  );
};

export default BlogPostCarousel;
