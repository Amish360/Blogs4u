"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Login isn't connected to a backend yet.");
  };

  return (
    <div className="max-w-md mx-auto mt-16 mb-24 p-6 sm:p-8 bg-[var(--paper-raised)] shadow-md rounded-md border border-[var(--line)]">
      <h1 className="font-serif text-3xl font-semibold text-[var(--ink)] mb-2">
        Log In
      </h1>
      <p className="text-sm text-[var(--ink-soft)] mb-6">
        This form isn&rsquo;t wired to a backend yet — it&rsquo;s a preview of
        the account flow, ready for a future auth service.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>

      <p className="text-sm text-[var(--ink-soft)] mt-6 text-center">
        Don&rsquo;t have an account?{" "}
        <Link
          href="/Signup"
          className="text-[var(--accent-teal)] underline underline-offset-2"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
