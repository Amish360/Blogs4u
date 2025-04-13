"use client";

import { useId, useState } from "react";
import { RiStarFill } from "@remixicon/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RatingProps = {
  rating?: number; // optional controlled rating
  onRate?: (value: number) => void; // callback for selecting a rating
  max?: number; // default 5
  className?: string;
};

export default function Rating({
  rating,
  onRate,
  max = 5,
  className = "",
}: RatingProps) {
  const id = useId();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  const displayRating = hoverRating ?? rating ?? currentRating ?? 0;

  const handleValueChange = (value: string) => {
    const num = parseInt(value);
    setCurrentRating(num);
    onRate?.(num);
  };

  return (
    <fieldset className={`space-y-4 ${className}`}>
      <RadioGroup
        className="inline-flex gap-0"
        onValueChange={handleValueChange}
        value={(rating ?? currentRating)?.toString()}
      >
        {Array.from({ length: max }, (_, i) => {
          const value = (i + 1).toString();
          return (
            <label
              key={value}
              className="group has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative cursor-pointer rounded p-0.5 outline-none has-focus-visible:ring-[3px]"
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(null)}
            >
              <RadioGroupItem
                id={`${id}-${value}`}
                value={value}
                className="sr-only"
              />
              <RiStarFill
                size={24}
                className={`transition-all ${
                  displayRating >= i + 1 ? "text-amber-500" : "text-input"
                } group-hover:scale-110`}
              />
              <span className="sr-only">
                {value} star{value === "1" ? "" : "s"}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </fieldset>
  );
}
