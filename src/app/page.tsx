"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // for Pages Router

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen p-24 text-center bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to Blogs4U</h1>
      <p className="mt-4 text-2xl">Your go-to platform for blogging.</p>
      <div className="flex flex-row space-x-4 my-5">
        <Button className="p-5" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button className="p-5" onClick={() => router.push("/signup")}>
          SignUp
        </Button>
      </div>
    </div>
  );
}
