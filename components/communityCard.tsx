"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

interface CommunityCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  name,
  image,
  onClick,
}) => {
  return (
    <div className="w-full group/card">
      <div
        onClick={onClick}
        className={cn(
          "relative cursor-pointer overflow-hidden card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4"
        )}
      >
        {/* Background Image */}
        <Image
          src={image}
          alt={`${name} background`}
          fill
          className="object-cover absolute inset-0 z-0"
        />

        {/* Dark overlay on hover */}
        <div className="absolute w-full h-full top-0 left-0 bg-black/40 group-hover/card:bg-black/60 transition duration-300 z-10"></div>

        {/* Text Content */}
        <div className="z-20 relative mt-auto">
          <h1 className="font-bold text-xl md:text-2xl text-white">{name}</h1>
          <p className="font-normal text-sm text-gray-200 my-4">
            Explore blogs and discussions from the {name} community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
