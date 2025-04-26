import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

// Use React.ComponentProps<typeof Image> directly
export const AvatarImage = ({
  className,
  alt,
  ...props
}: React.ComponentProps<typeof Image>) => {
  return (
    <Image
      className={cn("object-cover", className)}
      fill
      sizes="(min-width: 40px) 100vw"
      alt={alt || "User avatar"} // Use the `alt` from props or fallback to a default text
      {...props}
    />
  );
};

export const AvatarFallback = ({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
        className
      )}
    >
      {children}
    </span>
  );
};
