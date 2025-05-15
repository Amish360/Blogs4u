"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { LockIcon, MailIcon, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/redux/store";
import { signupUser } from "@/src/redux/slices/authSlice";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const Signup = () => {
  const router = useRouter();

  // Individual states
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<FormErrors>({});
  const {
    isAuthenticated,
    loading,
    error: signupError,
  } = useSelector((state: RootState) => state.auth);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const name = `${firstName} ${lastName}`;

    dispatch(
      signupUser({
        name,
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm md:max-w-2xl bg-white rounded-2xl shadow-md p-10 border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First and Last Name */}
          <div className="flex space-x-4">
            <div className="w-full">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative mt-1">
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="peer pe-10"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <User size={16} />
                </div>
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative mt-1">
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="peer pe-10"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <User size={16} />
                </div>
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="peer pe-10"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <MailIcon size={16} />
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Passwords */}
          <div className="flex space-x-4">
            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="peer pe-10"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <LockIcon size={16} />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="peer pe-10"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <LockIcon size={16} />
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        {signupError && (
          <p className="text-red-500 text-sm text-center mt-2">{signupError}</p>
        )}

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
