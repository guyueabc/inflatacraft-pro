"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  quotePhase1Schema,
  quotePhase2Schema,
  PRODUCT_TYPES,
  BUDGET_RANGES,
  DEADLINES,
  type QuotePhase1Data,
  type QuotePhase2Data,
} from "@/lib/validations/quote";
import {
  ArrowRight,
  ArrowLeft,
  Send,
  Loader2,
  CheckCircle2,
  Upload,
  FileText,
  X,
  ShieldAlert,
} from "lucide-react";

// Simple math captcha generator
const CAPTCHA_QUESTION = "What is 3 + 4?";
const CAPTCHA_ANSWER = "7";

export default function GetQuotePage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Phase 1 form
  const phase1 = useForm<QuotePhase1Data>({
    resolver: zodResolver(quotePhase1Schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      productType: "",
    },
  });

  // Phase 2 form
  const phase2 = useForm<QuotePhase2Data>({
    resolver: zodResolver(quotePhase2Schema),
    defaultValues: {
      company: "",
      description: "",
      size: "",
      quantity: "",
      budgetRange: "",
      deadline: "",
      captcha: "",
    },
  });

  const handlePhase1Submit = useCallback(async () => {
    const valid = await phase1.trigger();
    if (valid) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [phase1]);

  const handleFileDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...files]);
      }
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleFinalSubmit = useCallback(
    async (data: QuotePhase2Data) => {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const phase1Data = phase1.getValues();
      console.log("Quote submission:", { ...phase1Data, ...data, files: selectedFiles.length });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [phase1, selectedFiles]
  );

  // ---- Success State ----
  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-navy-900">
            Quote Request Submitted!
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            Thank you for reaching out. Our team will review your requirements
            and contact you within <strong>24 hours</strong> with a custom
            estimate. We look forward to bringing your vision to life.
          </p>
          <div className="mt-8 rounded-xl border border-navy-200 bg-navy-50 p-6 text-left">
            <h3 className="font-semibold text-navy-800">What happens next?</h3>
            <ol className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  1
                </span>
                Our team reviews your requirements
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  2
                </span>
                We create a free 3D rendering of your design
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  3
                </span>
                You receive a detailed quote within 24 hours
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  // ---- Form State ----
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Get a Free Quote
          </h1>
          <p className="mt-3 text-gray-600">
            Tell us about your project and we&apos;ll respond with a custom
            estimate within 24 hours.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                step === 1 ? "text-navy-700" : "text-navy-400"
              )}
            >
              Step 1: Contact Info
            </span>
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                step === 2 ? "text-navy-700" : "text-navy-400"
              )}
            >
              Step 2: Project Details
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-navy-200 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-navy-700 transition-all duration-500",
                step === 1 ? "w-1/2" : "w-full"
              )}
            />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all",
                s < step
                  ? "bg-green-500 text-white"
                  : s === step
                  ? "bg-red-600 text-white ring-4 ring-red-200"
                  : "bg-navy-200 text-navy-500"
              )}
            >
              {s < step ? "✓" : s}
            </div>
          ))}
        </div>

        {/* ---- PHASE 1 ---- */}
        {step === 1 && (
          <div className="rounded-xl border border-navy-200 bg-white p-8 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy-900 mb-6">
              Your Contact Information
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="q-name"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Full name *
                </label>
                <input
                  id="q-name"
                  type="text"
                  placeholder="John Smith"
                  {...phase1.register("name")}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                    phase1.formState.errors.name
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                  )}
                />
                {phase1.formState.errors.name && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {phase1.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email + Phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="q-email"
                    className="block text-sm font-medium text-navy-700 mb-1.5"
                  >
                    Email address *
                  </label>
                  <input
                    id="q-email"
                    type="email"
                    placeholder="you@company.com"
                    {...phase1.register("email")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      phase1.formState.errors.email
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  />
                  {phase1.formState.errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {phase1.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="q-phone"
                    className="block text-sm font-medium text-navy-700 mb-1.5"
                  >
                    Phone number *
                  </label>
                  <input
                    id="q-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...phase1.register("phone")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      phase1.formState.errors.phone
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  />
                  {phase1.formState.errors.phone && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {phase1.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Type */}
              <div>
                <label
                  htmlFor="q-product"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Product type *
                </label>
                <select
                  id="q-product"
                  {...phase1.register("productType")}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2",
                    phase1.formState.errors.productType
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                  )}
                >
                  <option value="">Select a product type...</option>
                  {PRODUCT_TYPES.map((pt) => (
                    <option key={pt} value={pt}>
                      {pt}
                    </option>
                  ))}
                </select>
                {phase1.formState.errors.productType && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {phase1.formState.errors.productType.message}
                  </p>
                )}
              </div>

              {/* Next button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePhase1Submit}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]"
                >
                  Continue to Project Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---- PHASE 2 ---- */}
        {step === 2 && (
          <form
            onSubmit={phase2.handleSubmit(handleFinalSubmit)}
            className="rounded-xl border border-navy-200 bg-white p-8 shadow-sm"
            noValidate
          >
            <h2 className="font-heading text-xl font-bold text-navy-900 mb-6">
              Project Details
            </h2>

            <div className="space-y-5">
              {/* Company */}
              <div>
                <label
                  htmlFor="q-company"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Company name (optional)
                </label>
                <input
                  id="q-company"
                  type="text"
                  placeholder="Your company"
                  {...phase2.register("company")}
                  className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="q-description"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Project description *
                </label>
                <textarea
                  id="q-description"
                  rows={4}
                  placeholder="Describe your inflatable project — dimensions, design ideas, colors, purpose, any reference images you might have..."
                  {...phase2.register("description")}
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 resize-y",
                    phase2.formState.errors.description
                      ? "border-red-300 focus:ring-red-500/20"
                      : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                  )}
                />
                {phase2.formState.errors.description && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {phase2.formState.errors.description.message}
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1.5">
                  Attachments (optional)
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="rounded-lg border-2 border-dashed border-navy-300 bg-navy-50/50 p-6 text-center transition-colors hover:border-navy-500 cursor-pointer"
                >
                  <Upload className="mx-auto h-8 w-8 text-navy-400" />
                  <p className="mt-2 text-sm font-medium text-navy-700">
                    Drag & drop files here, or click to browse
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Reference images, sketches, spec sheets (PDF, JPG, PNG, up
                    to 10MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileSelect}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    aria-label="Upload files"
                  />
                </div>
                {selectedFiles.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {selectedFiles.map((file, idx) => (
                      <li
                        key={`${file.name}-${idx}`}
                        className="flex items-center justify-between rounded-md bg-navy-50 border border-navy-200 px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-2 text-navy-700 truncate">
                          <FileText className="h-4 w-4 flex-shrink-0 text-navy-400" />
                          {file.name}{" "}
                          <span className="text-xs text-gray-400">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                          aria-label={`Remove ${file.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Size + Quantity */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="q-size"
                    className="block text-sm font-medium text-navy-700 mb-1.5"
                  >
                    Approximate size *
                  </label>
                  <input
                    id="q-size"
                    type="text"
                    placeholder='e.g. 10 ft tall x 6 ft wide'
                    {...phase2.register("size")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      phase2.formState.errors.size
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  />
                  {phase2.formState.errors.size && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {phase2.formState.errors.size.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="q-quantity"
                    className="block text-sm font-medium text-navy-700 mb-1.5"
                  >
                    Quantity *
                  </label>
                  <input
                    id="q-quantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    {...phase2.register("quantity")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                      phase2.formState.errors.quantity
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  />
                  {phase2.formState.errors.quantity && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {phase2.formState.errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Budget + Deadline */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="q-budget"
                    className="block text-sm font-medium text-navy-700 mb-1.5"
                  >
                    Budget range *
                  </label>
                  <select
                    id="q-budget"
                    {...phase2.register("budgetRange")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2",
                      phase2.formState.errors.budgetRange
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  >
                    <option value="">Select a range...</option>
                    {BUDGET_RANGES.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                  {phase2.formState.errors.budgetRange && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {phase2.formState.errors.budgetRange.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="q-deadline"
                    className="block text-sm font-medium text-navy-700 mb-1.5"
                  >
                    Deadline *
                  </label>
                  <select
                    id="q-deadline"
                    {...phase2.register("deadline")}
                    className={cn(
                      "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2",
                      phase2.formState.errors.deadline
                        ? "border-red-300 focus:ring-red-500/20"
                        : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                    )}
                  >
                    <option value="">Select timeframe...</option>
                    {DEADLINES.map((dl) => (
                      <option key={dl} value={dl}>
                        {dl}
                      </option>
                    ))}
                  </select>
                  {phase2.formState.errors.deadline && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {phase2.formState.errors.deadline.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Anti-spam Captcha */}
              <div className="rounded-lg border border-navy-200 bg-navy-50 p-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-5 w-5 text-navy-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-navy-800">
                      Anti-spam check: {CAPTCHA_QUESTION}
                    </p>
                    <input
                      type="text"
                      placeholder="Your answer"
                      {...phase2.register("captcha")}
                      className={cn(
                        "mt-2 w-full max-w-[200px] rounded-lg border bg-white px-3 py-2 text-sm placeholder-gray-400 transition-all focus:outline-none focus:ring-2",
                        phase2.formState.errors.captcha
                          ? "border-red-300 focus:ring-red-500/20"
                          : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                      )}
                    />
                  </div>
                </div>
                {phase2.formState.errors.captcha && (
                  <p className="mt-1.5 text-xs text-red-600 ml-8">
                    {phase2.formState.errors.captcha.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-navy-300 bg-white px-6 py-3 text-sm font-medium text-navy-700 transition-all hover:bg-navy-50 active:scale-[0.98] sm:order-first"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={phase2.formState.isSubmitting}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]",
                    phase2.formState.isSubmitting &&
                      "cursor-not-allowed opacity-70"
                  )}
                >
                  {phase2.formState.isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Quote Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
