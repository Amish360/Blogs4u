"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type ShuffleHeroProps = {
  images: string[];
  eyebrow?: string;
  heading?: string;
  paragraph?: string;
};

const ShuffleHero = ({
  images,
  eyebrow = "Welcome to Blogs4U",
  heading = "Stories worth slowing down for",
  paragraph = "A small, carefully written blog about software, travel, wellness, and food — from people who actually did the thing before writing about it.",
}: ShuffleHeroProps) => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-[var(--accent-teal)] font-medium font-mono tracking-wide uppercase">
          {eyebrow}
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight text-[var(--ink)]">
          {heading}
        </h1>
        <p className="text-base md:text-lg text-[var(--ink-soft)] my-4 md:my-6">
          {paragraph}
        </p>
      </div>
      <ShuffleGrid images={images} />
    </section>
  );
};

const shuffle = <T,>(array: T[]): T[] => {
  const result = [...array];
  let currentIndex = result.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
};

const ShuffleGrid = ({ images }: { images: string[] }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const squares = images.length > 0 ? images : ["/fallback-image.jpg"];
  // Repeat the images so the grid always has 16 cells to shuffle.
  const cells = Array.from({ length: 16 }, (_, i) => squares[i % squares.length]);

  // Start with the deterministic, unshuffled order so server- and client-rendered
  // markup match on hydration; the effect below shuffles once mounted on the client.
  const [ordered, setOrdered] = useState(cells);

  const shuffleSquares = useCallback(() => {
    setOrdered(shuffle(cells));
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    shuffleSquares();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [shuffleSquares]);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {ordered.map((src, i) => (
        <motion.div
          key={`${src}-${i}`}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="w-full h-full"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
          }}
        />
      ))}
    </div>
  );
};

export default ShuffleHero;
