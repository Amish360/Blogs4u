"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const BlogsGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
  href,
  author,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  href?: string;
  author?: {
    id: number | string;
    name: string;
    avatarUrl?: string;
    href?: string;
  };
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "group/bento shadow-input relative row-span-1 flex flex-col justify-between space-y-4 rounded-md border border-[var(--line)] bg-[var(--paper-raised)] p-4 transition duration-200 hover:shadow-xl",
        className
      )}
    >
      {header}

      {image && (
        <div className="relative h-40 w-full rounded-sm overflow-hidden">
          <Image
            src={imageError ? "/fallback-image.jpg" : image}
            alt="Blog Thumbnail"
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-serif font-semibold text-[var(--ink)]">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-[var(--ink-soft)]">
          {description}
        </div>
      </div>

      {/* Stretched link: makes the whole card clickable without nesting <a> tags */}
      {href && (
        <Link href={href} className="absolute inset-0 z-0" aria-label={typeof title === "string" ? title : "View post"}>
          <span className="sr-only">{typeof title === "string" ? title : "View post"}</span>
        </Link>
      )}

      {author && <AuthorLink author={author} />}
    </div>
  );
};

const AuthorLink = ({
  author,
}: {
  author: { name: string; avatarUrl?: string; href?: string };
}) => {
  const inner = (
    <div className="flex items-center gap-2 mt-2 text-sm">
      <Image
        src={author.avatarUrl || "/default-avatar.png"}
        alt={author.name}
        width={24}
        height={24}
        className="rounded-full object-cover"
      />
      <span className="text-[var(--ink-soft)]">{author.name}</span>
    </div>
  );

  if (author.href) {
    return (
      <Link href={author.href} className="relative z-10 hover:underline w-fit">
        {inner}
      </Link>
    );
  }

  return inner;
};
