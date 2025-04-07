"use client";
import React from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [error, setError] = React.useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const validate = () => {
    const validationErrors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    console.log("Form submitted successfully", formData);
    // Proceed with actual signup logic here
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
                value={formData.email}
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
                value={formData.password}
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
