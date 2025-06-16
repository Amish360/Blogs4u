// components/ClientLayoutWrapper.tsx
"use client";

import FlipNavWrapper from "@/components/navbar";
import { BackButton } from "@/components/backButton";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FlipNavWrapper />
      <BackButton />
      {children}
    </>
  );
}
