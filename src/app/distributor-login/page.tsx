"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";
import {
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Truck,
  Globe,
  BadgePercent,
} from "lucide-react";

const BENEFITS = [
  {
    icon: BadgePercent,
    title: "Wholesale Pricing",
    desc: "Exclusive distributor discounts on all products",
  },
  {
    icon: Truck,
    title: "Priority Production",
    desc: "Dedicated production slots for distributor orders",
  },
  {
    icon: Globe,
    title: "Territory Protection",
    desc: "Exclusive rights in your designated region",
  },
  {
    icon: ShieldCheck,
    title: "Verified Badge",
    desc: "Official distributor listing on our website",
  },
];

export default function DistributorLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setServerError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Distributor sign in:", data);
    } catch {
      setServerError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2">
        {/* Left: Benefits */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-navy-900">
            Distributor Portal
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Access wholesale pricing, manage your orders, and grow your
            inflatables business with dedicated partner support.
          </p>

          <div className="mt-8 space-y-5">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy-50">
                  <benefit.icon className="h-5 w-5 text-navy-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-500">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Login Card */}
        <div>
          <div className="rounded-xl border border-navy-200 bg-white p-8 shadow-lg">
            {/* Mobile header */}
            <div className="lg:hidden mb-6 text-center">
              <h1 className="font-heading text-2xl font-bold text-navy-900">
                Distributor Portal
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Sign in to your distributor account
              </p>
            </div>

            <div className="hidden lg:block mb-6">
              <h1 className="font-heading text-2xl font-bold text-navy-900">
                Distributor Sign In
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, partner
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {serverError && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {serverError}
                </div>
              )}

              {/* Email */}
              <div>
                <label
                  htmlFor="dist-email"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="dist-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@distribution.com"
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

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="dist-password"
                    className="block text-sm font-medium text-navy-700"
                  >
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="dist-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="dist-remember"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-navy-300 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="dist-remember"
                  className="text-sm text-gray-600 select-none cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

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
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign in to Portal
                  </>
                )}
              </button>
            </form>

            {/* Apply link */}
            <div className="mt-6 rounded-lg bg-navy-50 border border-navy-200 p-4 text-center">
              <p className="text-sm text-navy-700">
                Not a distributor yet?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                >
                  Apply for a Distributor Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
