"use client";
import React from "react";
import { LocateIcon, LockIcon, MailIcon, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [error, setError] = React.useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  const validate = () => {
    const validationErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Address is required";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
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
      <div className="w-full max-w-sm md:max-w-2xl bg-white rounded-2xl shadow-md p-10 border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First and Last Name */}
          <div className="flex space-x-4">
            <div className="w-full">
              <Label htmlFor="first-name">First Name</Label>
              <div className="relative mt-1">
                <Input
                  id="firstName"
                  className="peer pe-10"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground/80">
                  <User size={16} />
                </div>
              </div>
              {error.firstName && (
                <p className="text-red-500 text-sm mt-1">{error.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="last-name">Last Name</Label>
              <div className="relative mt-1">
                <Input
                  id="lastName"
                  className="peer pe-10"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground/80">
                  <User size={16} />
                </div>
              </div>
              {error.lastName && (
                <p className="text-red-500 text-sm mt-1">{error.lastName}</p>
              )}
            </div>
          </div>

          {/* Email and Address */}
          <div className="flex space-x-4">
            <div className="w-full">
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
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground/80">
                  <MailIcon size={16} />
                </div>
              </div>
              {error.email && (
                <p className="text-red-500 text-sm mt-1">{error.email}</p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="address">Address</Label>
              <div className="relative mt-1">
                <Input
                  id="address"
                  className="peer pe-10"
                  placeholder="Address"
                  type="text"
                  onChange={handleChange}
                  value={formData.address}
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground/80">
                  <LocateIcon size={16} />
                </div>
              </div>
              {error.address && (
                <p className="text-red-500 text-sm mt-1">{error.address}</p>
              )}
            </div>
          </div>

          {/* Password and Confirm Password */}
          <div className="flex space-x-4">
            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  className="peer pe-10"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground/80">
                  <LockIcon size={16} />
                </div>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm mt-1">{error.password}</p>
              )}
            </div>
            <div className="w-full">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  className="peer pe-10"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  type="password"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground/80">
                  <LockIcon size={16} />
                </div>
              </div>
              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        {/* Already have an account? */}
        <div className="flex justify-center items-center mt-6 space-x-2 text-sm">
          <p>Already have an account?</p>
          <Button
            variant="link"
            className="text-blue-600 p-0"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
