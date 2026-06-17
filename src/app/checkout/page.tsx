"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  ClipboardCheck,
  ShieldCheck,
  Truck,
  Lock,
  Building2,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

type Step = "shipping" | "payment" | "review";

interface ShippingForm {
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const STEPS: { key: Step; label: string; icon: typeof MapPin }[] = [
  { key: "shipping", label: "Shipping", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: ClipboardCheck },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const {
    items,
    getSubtotal,
    getShipping,
    getTax,
    getTotal,
    getItemCount,
    clearCart,
  } = useCartStore();

  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
    email: "",
  });

  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingForm, string>>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentForm, string>>>({});
  const [placing, setPlacing] = useState(false);

  const validateShipping = (): boolean => {
    const errs: Partial<Record<keyof ShippingForm, string>> = {};
    if (!shippingForm.firstName.trim()) errs.firstName = "Required";
    if (!shippingForm.lastName.trim()) errs.lastName = "Required";
    if (!shippingForm.address.trim()) errs.address = "Required";
    if (!shippingForm.city.trim()) errs.city = "Required";
    if (!shippingForm.state.trim()) errs.state = "Required";
    if (!shippingForm.zip.trim()) errs.zip = "Required";
    if (!shippingForm.email.trim()) errs.email = "Required";
    if (!shippingForm.phone.trim()) errs.phone = "Required";
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = (): boolean => {
    const errs: Partial<Record<keyof PaymentForm, string>> = {};
    if (!paymentForm.cardName.trim()) errs.cardName = "Required";
    if (!paymentForm.cardNumber.trim()) errs.cardNumber = "Required";
    if (paymentForm.cardNumber.replace(/\s/g, "").length < 13)
      errs.cardNumber = "Invalid card number";
    if (!paymentForm.expiry.trim()) errs.expiry = "Required";
    if (!paymentForm.cvc.trim()) errs.cvc = "Required";
    if (paymentForm.cvc.length < 3) errs.cvc = "Invalid CVC";
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setCurrentStep("payment");
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setCurrentStep("review");
    }
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    // Simulate order placement
    await new Promise((r) => setTimeout(r, 1500));
    setOrderNumber(`IFC-${Date.now().toString(36).toUpperCase()}`);
    setOrderPlaced(true);
    clearCart();
    setPlacing(false);
  };

  const updateShippingField = (field: keyof ShippingForm, value: string) => {
    setShippingForm((prev) => ({ ...prev, [field]: value }));
    if (shippingErrors[field]) {
      setShippingErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updatePaymentField = (field: keyof PaymentForm, value: string) => {
    if (field === "cardNumber") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }
    if (field === "expiry") {
      value = value
        .replace(/\D/g, "")
        .replace(/(.{2})/, "$1/")
        .slice(0, 5);
    }
    if (field === "cvc") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
    if (paymentErrors[field]) {
      setPaymentErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const tax = getTax();
  const total = getTotal();
  const itemCount = getItemCount();

  // Empty cart guard
  if (!orderPlaced && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-20">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-20 shadow-sm">
            <ShoppingBag className="mb-6 h-16 w-16 text-navy-300" />
            <h1 className="mb-3 text-2xl font-bold text-navy-900">
              Nothing to Checkout
            </h1>
            <p className="mb-8 text-gray-500">
              Your cart is empty. Add some products first!
            </p>
            <Link
              href="/products"
              className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Order success
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-2xl px-4 py-20">
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-navy-900">
              Order Confirmed!
            </h1>
            <p className="mb-2 text-lg text-gray-600">
              Thank you for your order.
            </p>
            <p className="mb-8 text-sm text-gray-500">
              Order #{" "}
              <span className="font-mono font-bold text-navy-900">
                {orderNumber}
              </span>
            </p>

            <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6 text-left">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                What Happens Next
              </h3>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
                    1
                  </span>
                  <span>
                    You&apos;ll receive an order confirmation email within minutes.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
                    2
                  </span>
                  <span>
                    Our design team will send 3D renderings for approval within 48 hours.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
                    3
                  </span>
                  <span>
                    Production begins after your approval. We&apos;ll keep you updated at
                    every stage.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
                    4
                  </span>
                  <span>
                    Your custom inflatable ships with full tracking. Arrives in 3-6 weeks.
                  </span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/account/orders"
                className="rounded-lg bg-navy-700 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800"
              >
                View Order
              </Link>
              <Link
                href="/products"
                className="rounded-lg border border-navy-300 px-6 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-50"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIdx = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy-900 px-4 py-10 text-white">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
          <p className="mt-1 text-gray-300">
            {itemCount} item{itemCount !== 1 ? "s" : ""} ·{" "}

          </p>
        </div>
      </section>

      {/* Steps indicator */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="flex items-center justify-between py-4">
            {STEPS.map((step, idx) => {
              const isActive = currentStep === step.key;
              const isDone = idx < currentStepIdx;
              const Icon = step.icon;

              return (
                <div key={step.key} className="flex items-center">
                  {/* Step circle */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                        isActive
                          ? "border-navy-700 bg-navy-700 text-white"
                          : isDone
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 bg-white text-gray-400"
                      )}
                    >
                      {isDone ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        isActive
                          ? "text-navy-700"
                          : isDone
                          ? "text-green-600"
                          : "text-gray-400"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {/* Connector line */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "mx-2 mb-6 h-0.5 w-12 rounded-full sm:w-24",
                        idx < currentStepIdx ? "bg-green-500" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === "shipping" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-navy-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-navy-600" />
                  Shipping Address
                </h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      label="First Name"
                      required
                      value={shippingForm.firstName}
                      onChange={(v) => updateShippingField("firstName", v)}
                      error={shippingErrors.firstName}
                      placeholder="John"
                    />
                    <FormField
                      label="Last Name"
                      required
                      value={shippingForm.lastName}
                      onChange={(v) => updateShippingField("lastName", v)}
                      error={shippingErrors.lastName}
                      placeholder="Doe"
                    />
                    <FormField
                      label="Company (optional)"
                      value={shippingForm.company}
                      onChange={(v) => updateShippingField("company", v)}
                      placeholder="Acme Inc."
                      className="sm:col-span-2"
                    />
                    <FormField
                      label="Address"
                      required
                      value={shippingForm.address}
                      onChange={(v) => updateShippingField("address", v)}
                      error={shippingErrors.address}
                      placeholder="123 Main Street"
                      className="sm:col-span-2"
                    />
                    <FormField
                      label="Apt, Suite, Unit (optional)"
                      value={shippingForm.address2}
                      onChange={(v) => updateShippingField("address2", v)}
                      placeholder="Suite 100"
                      className="sm:col-span-2"
                    />
                    <FormField
                      label="City"
                      required
                      value={shippingForm.city}
                      onChange={(v) => updateShippingField("city", v)}
                      error={shippingErrors.city}
                      placeholder="New York"
                    />
                    <FormField
                      label="State"
                      required
                      value={shippingForm.state}
                      onChange={(v) => updateShippingField("state", v)}
                      error={shippingErrors.state}
                      placeholder="NY"
                    />
                    <FormField
                      label="ZIP Code"
                      required
                      value={shippingForm.zip}
                      onChange={(v) => updateShippingField("zip", v)}
                      error={shippingErrors.zip}
                      placeholder="10001"
                    />
                    <FormField
                      label="Country"
                      required
                      value={shippingForm.country}
                      onChange={(v) => updateShippingField("country", v)}
                      placeholder="United States"
                    />
                    <FormField
                      label="Phone"
                      required
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(v) => updateShippingField("phone", v)}
                      error={shippingErrors.phone}
                      placeholder="(555) 123-4567"
                    />
                    <FormField
                      label="Email"
                      required
                      type="email"
                      value={shippingForm.email}
                      onChange={(v) => updateShippingField("email", v)}
                      error={shippingErrors.email}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                    >
                      Continue to Payment
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === "payment" && (
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-navy-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-navy-600" />
                  Payment Information
                </h2>

                <form onSubmit={handlePaymentSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      label="Name on Card"
                      required
                      value={paymentForm.cardName}
                      onChange={(v) => updatePaymentField("cardName", v)}
                      error={paymentErrors.cardName}
                      placeholder="John Doe"
                      className="sm:col-span-2"
                    />

                    {/* Card Number with Stripe-style styling */}
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-navy-900">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <div
                        className={cn(
                          "flex items-center gap-3 rounded-lg border bg-white px-4 py-3 transition-colors",
                          paymentErrors.cardNumber
                            ? "border-red-500"
                            : "border-gray-300 focus-within:border-navy-500 focus-within:ring-2 focus-within:ring-navy-500/20"
                        )}
                      >
                        <CreditCard className="h-5 w-5 text-gray-400 shrink-0" />
                        <input
                          type="text"
                          value={paymentForm.cardNumber}
                          onChange={(e) =>
                            updatePaymentField("cardNumber", e.target.value)
                          }
                          placeholder="4242 4242 4242 4242"
                          className="flex-1 bg-transparent text-sm font-medium text-navy-900 placeholder-gray-400 focus:outline-none"
                        />
                        <div className="flex gap-1">
                          {/* Visa/MC icons */}
                          <span className="text-lg opacity-40">💳</span>
                        </div>
                      </div>
                      {paymentErrors.cardNumber && (
                        <p className="mt-1 text-xs text-red-500">
                          {paymentErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <FormField
                      label="Expiry Date"
                      required
                      value={paymentForm.expiry}
                      onChange={(v) => updatePaymentField("expiry", v)}
                      error={paymentErrors.expiry}
                      placeholder="MM/YY"
                    />
                    <FormField
                      label="CVC"
                      required
                      value={paymentForm.cvc}
                      onChange={(v) => updatePaymentField("cvc", v)}
                      error={paymentErrors.cvc}
                      placeholder="123"
                    />
                  </div>

                  {/* Security note */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
                    <Lock className="h-4 w-4 text-green-600" />
                    Your payment information is encrypted and secure. We never store
                    your full card details.
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("shipping")}
                      className="inline-flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-navy-900"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                    >
                      Review Order
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === "review" && (
              <div className="space-y-6">
                {/* Order items review */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="mb-6 text-lg font-bold text-navy-900 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-navy-600" />
                    Order Review
                  </h2>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 border-b border-gray-100 pb-4"
                      >
                        <div className="h-16 w-20 shrink-0 rounded-lg bg-gradient-to-br from-navy-100 to-navy-200" />
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div>
                            <p className="text-sm font-semibold text-navy-900">
                              {item.name}
                            </p>
                            {item.isCustom && (
                              <span className="inline-flex items-center gap-1 rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                                <AlertCircle className="h-3 w-3" />
                                Custom Quote
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">
                              Qty: {item.quantity}
                            </span>
                            <span className="font-semibold text-navy-900">
                              Quote Pending
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping summary */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Shipping To
                  </h3>
                  <p className="text-sm text-navy-900">
                    {shippingForm.firstName} {shippingForm.lastName}
                    {shippingForm.company && <> · {shippingForm.company}</>}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingForm.address}
                    {shippingForm.address2 && <>, {shippingForm.address2}</>}
                  </p>
                  <p className="text-sm text-gray-600">
                    {shippingForm.city}, {shippingForm.state} {shippingForm.zip}
                  </p>
                </div>

                {/* Payment summary */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Payment Method
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-navy-900">
                    <CreditCard className="h-4 w-4 text-navy-600" />
                    {paymentForm.cardNumber.slice(-4).padStart(
                      paymentForm.cardNumber.length,
                      "•"
                    ) || "•••• •••• •••• ••••"}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Expires {paymentForm.expiry || "—"}
                  </p>
                </div>

                {/* Place Order */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={placing}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 text-base font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {placing ? (
                      <>
                        <svg
                          className="h-5 w-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />

                      </>
                    )}
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-400">
                    By placing your order, you agree to inflatablemodel&apos;s{" "}
                    <Link
                      href="/terms"
                      className="underline hover:text-gray-600"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-gray-600"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("payment")}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-navy-700 hover:text-navy-900"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-bold text-navy-900">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="font-semibold text-navy-900">

                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-green-600">FREE</span>
                  ) : (
                    <span className="font-semibold text-navy-900">

                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span className="font-semibold text-navy-900">

                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-base">
                    <span className="font-bold text-navy-900">Total</span>
                    <span className="font-bold text-navy-900">

                    </span>
                  </div>
                </div>
              </div>

              {/* Item thumbnails */}
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-10 w-12 shrink-0 rounded bg-gradient-to-br from-navy-100 to-navy-200" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-navy-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-navy-900 shrink-0">
                      Quote Pending
                    </span>
                  </div>
                ))}
                {items.length > 5 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{items.length - 5} more items
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable form field component
function FormField({
  label,
  required,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy-900 placeholder-gray-400 transition-colors focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500/20"
            : "border-gray-300 focus:border-navy-500 focus:ring-navy-500/20"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
