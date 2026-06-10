"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signUpSchema, ROLES, type SignUpFormData } from "@/lib/validations/auth";
import {
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  AlertCircle,
  Upload,
  Building2,
} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      termsAccepted: false as unknown as true,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: SignUpFormData) => {
    setServerError("");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Sign up:", data);
      // Redirect would happen here in production
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-navy-900">
            Create your account
          </h1>
          <p className="mt-2 text-gray-600">
            Join InflataCraft Pro and start ordering custom inflatables
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-navy-200 bg-white p-8 shadow-lg">
          {/* Google OAuth */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm font-medium text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">
                or sign up with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {serverError && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {serverError}
              </div>
            )}

            {/* Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-navy-700 mb-1.5"
              >
                Full name *
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="John Smith"
                {...register("name")}
                className={cn(
                  "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                  errors.name
                    ? "border-red-300 focus:ring-red-500/20"
                    : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                )}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Email address *
                </label>
                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@company.com"
                  {...register("email")}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                    errors.email
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                  )}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="signup-phone"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Phone number *
                </label>
                <input
                  id="signup-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                    errors.phone
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                  )}
                />
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="signup-company"
                className="block text-sm font-medium text-navy-700 mb-1.5"
              >
                Company (optional)
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="signup-company"
                  type="text"
                  placeholder="Your company name"
                  {...register("company")}
                  className={cn(
                    "w-full rounded-lg border bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                    "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                  )}
                />
              </div>
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                I am a... *
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                {ROLES.map((role) => (
                  <label
                    key={role.value}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all",
                      selectedRole === role.value
                        ? "border-red-500 bg-red-50 ring-2 ring-red-500/20"
                        : "border-navy-200 hover:border-navy-400"
                    )}
                  >
                    <input
                      type="radio"
                      value={role.value}
                      {...register("role")}
                      className="mt-0.5 h-4 w-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{role.label}</span>
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Distributor: Business License Upload */}
            {selectedRole === "distributor" && (
              <div className="rounded-lg border-2 border-dashed border-navy-300 bg-navy-50/50 p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-navy-400" />
                <p className="mt-2 text-sm font-medium text-navy-700">
                  Upload Business License
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Required for distributor verification. PDF, JPG, or PNG up to 5MB.
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-navy-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-navy-800"
                />
              </div>
            )}

            {/* Password + Confirm */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    {...register("password")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      errors.password
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-navy-700 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="signup-confirm"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Confirm password *
                </label>
                <div className="relative">
                  <input
                    id="signup-confirm"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    {...register("confirmPassword")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 pr-12 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      errors.confirmPassword
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-navy-700 transition-colors"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="signup-terms"
                type="checkbox"
                {...register("termsAccepted")}
                className="mt-0.5 h-4 w-4 rounded border-navy-300 text-red-600 focus:ring-red-500"
              />
              <label
                htmlFor="signup-terms"
                className="text-sm text-gray-600 select-none cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-red-600 hover:text-red-700"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-xs text-red-600 -mt-3 ml-6">
                {errors.termsAccepted.message}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]",
                isSubmitting && "cursor-not-allowed opacity-70"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
