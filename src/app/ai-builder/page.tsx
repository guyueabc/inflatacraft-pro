"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PRODUCT_TYPES,
  INTENDED_USES,
  INDOOR_OUTDOOR,
  PEOPLE_INTERACT,
  COUNTRIES,
  VOLTAGE_PLUGS,
  ARTWORK_STATUS,
  INSTALLATION_SURFACES,
} from "@/lib/validations/quote";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

interface FormData {
  // Step 1
  country: string;
  productType: string;
  intendedUse: string;
  indoorOutdoor: string;
  // Step 2
  size: string;
  quantity: string;
  peopleInteract: string;
  userAgeRange: string;
  // Step 3
  installationSurface: string;
  deadline: string;
  voltagePlug: string;
  artworkReady: string;
  // Step 4
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  // Honeypot
  website: string;
}

const initialFormData: FormData = {
  country: "",
  productType: "",
  intendedUse: "",
  indoorOutdoor: "",
  size: "",
  quantity: "1",
  peopleInteract: "",
  userAgeRange: "",
  installationSurface: "",
  deadline: "",
  voltagePlug: "",
  artworkReady: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
};

const steps = [
  { number: 1, title: "Project Basics" },
  { number: 2, title: "Size & Interaction" },
  { number: 3, title: "Safety & Site" },
  { number: 4, title: "Contact" },
];

export default function AIBuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user updates field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.country) newErrors.country = "Please select a country";
      if (!formData.productType) newErrors.productType = "Please select a product type";
      if (!formData.intendedUse) newErrors.intendedUse = "Please select intended use";
      if (!formData.indoorOutdoor) newErrors.indoorOutdoor = "Please select indoor/outdoor";
    } else if (step === 2) {
      if (!formData.size) newErrors.size = "Please enter target dimensions";
      if (!formData.quantity || parseInt(formData.quantity) < 1) {
        newErrors.quantity = "Quantity must be at least 1";
      }
      if (!formData.peopleInteract) newErrors.peopleInteract = "Please select an option";
    } else if (step === 3) {
      if (!formData.installationSurface) newErrors.installationSurface = "Please select installation surface";
      if (!formData.voltagePlug) newErrors.voltagePlug = "Please select voltage/plug type";
      if (!formData.artworkReady) newErrors.artworkReady = "Please select artwork status";
    } else if (step === 4) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.phone.trim()) newErrors.phone = "WhatsApp number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      // Collect UTM params from sessionStorage
      const utmParams: Record<string, string> = {};
      const adParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
      adParams.forEach((k) => {
        try {
          const v = sessionStorage.getItem(k);
          if (v) utmParams[k] = v;
        } catch {}
      });

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...utmParams,
          quantity: formData.quantity || "1",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success !== true) {
        throw new Error("Unable to submit your quote right now. Please try again.");
      }

      // The durable API write has succeeded; keep the estimate available for the next page.
      if (data.quote || data.estimate) {
        try {
          sessionStorage.setItem("quote_estimate", JSON.stringify(data.quote || data));
        } catch {}
      }

      router.push(data.nextUrl || "/quote/pending");
    } catch (error) {
      console.error("Submit error:", error);
      setErrors({ email: error instanceof Error ? error.message : "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSelect = (
    field: keyof FormData,
    options: readonly string[],
    placeholder: string
  ) => (
    <div className="space-y-1.5">
      <select
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        className={`w-full rounded-lg border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } bg-white px-4 py-3 text-sm text-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[field] && (
        <p className="text-xs text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  const renderInput = (
    field: keyof FormData,
    type: string,
    placeholder: string,
  ) => (
    <div className="space-y-1.5">
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        min={type === "number" ? 1 : undefined}
        className={`w-full rounded-lg border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500`}
      />
      {errors[field] && (
        <p className="text-xs text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  const renderTextarea = (field: keyof FormData, placeholder: string) => (
    <div className="space-y-1.5">
      <textarea
        value={formData[field]}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`w-full rounded-lg border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500`}
      />
      {errors[field] && (
        <p className="text-xs text-red-500">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy-900">AI Project Builder</h1>
          <p className="mt-2 text-gray-600">Get a budgetary estimate in 2 minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                      currentStep > step.number
                        ? "bg-green-500 text-white"
                        : currentStep === step.number
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`mt-2 hidden text-xs font-medium sm:block ${
                      currentStep >= step.number ? "text-navy-900" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`mx-2 h-1 flex-1 rounded-full ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => updateField("website", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Step 1: Project Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-900">Project Basics</h2>
              <p className="text-sm text-gray-500">Tell us about your inflatable project</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("country", COUNTRIES, "Select country")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("productType", PRODUCT_TYPES, "Select product type")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Intended Use <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("intendedUse", INTENDED_USES, "Select use case")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Indoor / Outdoor <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("indoorOutdoor", INDOOR_OUTDOOR, "Select environment")}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Size & Interaction */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-900">Size & Interaction</h2>
              <p className="text-sm text-gray-500">Dimensions and user interaction details</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Target Dimensions <span className="text-red-500">*</span>
                  </label>
                  {renderInput("size", "text", "e.g. 10ft x 6ft")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  {renderInput("quantity", "number", "1")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Will people interact? <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("peopleInteract", PEOPLE_INTERACT, "Select option")}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Age range of users
                  </label>
                  {renderInput("userAgeRange", "text", "e.g. Children 5-12, Adults, All ages")}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Safety & Site */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-900">Safety & Site</h2>
              <p className="text-sm text-gray-500">Installation and electrical requirements</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Installation Surface <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("installationSurface", INSTALLATION_SURFACES, "Select surface")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateField("deadline", e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Voltage / Plug <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("voltagePlug", VOLTAGE_PLUGS, "Select voltage/plug")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Artwork Ready? <span className="text-red-500">*</span>
                  </label>
                  {renderSelect("artworkReady", ARTWORK_STATUS, "Select status")}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-navy-900">Contact Information</h2>
              <p className="text-sm text-gray-500">How can we reach you?</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  {renderInput("name", "text", "Your name")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  {renderInput("email", "email", "you@example.com")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    WhatsApp number <span className="text-red-500">*</span>
                  </label>
                  {renderInput("phone", "text", "Include country code")}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  {renderInput("company", "text", "Company name")}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Additional Message
                  </label>
                  {renderTextarea("message", "Any other details about your project...")}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                currentStep === 1
                  ? "cursor-not-allowed border-gray-200 text-gray-300"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    Get Estimate <Check className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Your information is secure and will only be used to provide your quote.
        </p>
      </div>
    </div>
  );
}