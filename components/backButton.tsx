"use client";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const hiddenPaths = [
  "/MyBlogs",
  "/Community",
  "/FAQ",
  "/Support",
  "/MyAccount",
  "/Login",
  "/Signup",
];

export const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (hiddenPaths.includes(pathname)) return null;

  return (
    <div className="relative top-6 left-6 z-50">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-white bg-black"
      >
        <ArrowLeftIcon size={16} />
        Back
      </Button>
    </div>
  );
};
