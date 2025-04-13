"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Types
type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormError = Partial<Record<keyof LoginFormData, string>>;

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<LoginFormError>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const validate = (): LoginFormError => {
    const validationErrors: LoginFormError = {};
    if (!email.trim()) validationErrors.email = "Email is required";
    if (!password.trim()) validationErrors.password = "Password is required";
    return validationErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    console.log("Form submitted successfully", { email, password });
    // Proceed with actual login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm md:max-w-md bg-white rounded-2xl shadow-md p-8 border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Input
                id="email"
                className="peer pe-10"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                type="email"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                <MailIcon size={16} aria-hidden="true" />
              </div>
            </div>
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                className="peer pe-10"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                type="password"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                <LockIcon size={16} aria-hidden="true" />
              </div>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>

        {/* Sign Up Redirect */}
        <div className="flex justify-center items-center mt-6 space-x-2 text-sm">
          <p>Do not have an account?</p>
          <Button
            variant="link"
            className="text-blue-600 p-0"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
