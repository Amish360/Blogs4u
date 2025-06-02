"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState, useMemo, JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Rating from "./rating";

import { useDispatch, useSelector } from "react-redux";
import { fetchBestAuthors } from "@/src/redux/slices/bestAuthorsSlice";
import { AppDispatch, RootState } from "@/src/redux/store";

type Card = {
  id: string;
  title: string;
  description: string;
  rating: number;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => JSX.Element;
};

export function ExpandableCardDemo() {
  const dispatch = useDispatch<AppDispatch>();
  const { authors, status, error } = useSelector(
    (state: RootState) => state.bestAuthors
  );

  const [active, setActive] = useState<Card | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  // Fetch authors once on mount
  useEffect(() => {
    dispatch(fetchBestAuthors());
  }, [dispatch]);

  // Escape key closes active card
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  // Prepare cards from authors data, memoized for performance
  const cards: Card[] = useMemo(() => {
    return authors.map((author) => ({
      id: String(author.id), // ensure string for consistency
      title: `${author._count.blogs} Blog${
        author._count.blogs !== 1 ? "s" : ""
      }`,
      description: author.name,
      rating: Math.min(author._count.blogs, 5),
      src: author.avatarUrl || "/fallback-image.jpg",
      ctaText: "Visit",
      ctaLink: `/author/${author.id}`,
      content: () => <p>{author.bio ?? "No bio available."}</p>,
    }));
  }, [authors]);

  if (status === "loading") return <p className="text-center">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-500">{error}</p>;

  // Handle image load errors for individual cards
  const handleImageError = (cardId: string) => {
    setImageErrors((prev) => ({ ...prev, [cardId]: true }));
  };

  return (
    <>
      {/* Background overlay when a card is active */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded card modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] px-4">
            <motion.button
              key={`close-btn-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              aria-label="Close card details"
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-white rounded-full h-8 w-8 shadow-md"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-md max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-lg"
            >
              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="relative w-full h-64"
              >
                <Image
                  priority
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  src={
                    imageErrors[active.id] ? "/fallback-image.jpg" : active.src
                  }
                  alt={active.title}
                  className="object-cover object-top rounded-t-3xl"
                  onError={() => handleImageError(active.id)}
                />
              </motion.div>

              <div className="p-4 flex flex-col flex-grow">
                <motion.h3
                  layoutId={`title-${active.id}-${id}`}
                  className="font-semibold text-neutral-800 dark:text-neutral-200 text-lg"
                >
                  {active.title}
                </motion.h3>
                <Rating rating={active.rating} />
                <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 mt-1 mb-4"
                >
                  {active.description}
                </motion.p>

                <motion.div className="flex-grow overflow-auto text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
                  {active.content()}
                </motion.div>

                <motion.a
                  layout
                  href={active.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-2 rounded-full bg-green-600 text-white text-center font-semibold hover:bg-green-700 transition"
                >
                  {active.ctaText}
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cards grid */}
      <ul className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <motion.li
            layoutId={`card-${card.id}-${id}`}
            key={card.id}
            onClick={() => setActive(card)}
            className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-neutral-900 transition"
            aria-label={`Open details for ${card.description}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(card);
              }
            }}
          >
            <div className="relative w-full h-64">
              <Image
                priority
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                src={imageErrors[card.id] ? "/fallback-image.jpg" : card.src}
                alt={card.description}
                className="object-cover object-top"
                onError={() => handleImageError(card.id)}
              />
            </div>
            <div className="p-4 text-center md:text-left">
              <motion.h3
                layoutId={`title-${card.id}-${id}`}
                className="font-semibold text-neutral-900 dark:text-neutral-200 text-lg"
              >
                {card.title}
              </motion.h3>
              <Rating rating={card.rating} />
              <motion.p
                layoutId={`description-${card.id}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 mt-1"
              >
                {card.description}
              </motion.p>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-black dark:text-white"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
