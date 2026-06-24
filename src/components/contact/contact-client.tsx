"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  ShoppingCart,
  PenTool,
  Truck,
  Globe,
  AtSign,
  Camera,
  Building2,
  Play,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Request a Quote",
  "Existing Order Support",
  "Design & Technical Question",
  "Distributor / Wholesale",
  "Partnership Opportunity",
  "Press & Media",
  "Other",
];

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+86 153****7736", "(313) 555-0142"],
    action: { label: "Call Now", href: "tel:+8615376427736" },
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["inflatablemodel@showlovein.com", "support@inflatacraftpro.com"],
    action: { label: "Send Email", href: "mailto:inflatablemodel@showlovein.com" },
  },
  {
    icon: MapPin,
    title: "Address",
    lines: [
      "7426 Industrial Parkway",
      "Detroit, MI 48216",
      "United States",
    ],
    action: { label: "Get Directions", href: "#" },
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: [
      "Monday – Friday",
      "8:00 AM – 6:00 PM EST",
      "Weekend by appointment",
    ],
    action: null,
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    lines: [
      "Chat with our team in real-time",
      "Average response: under 2 min",
      "Available during business hours",
    ],
    action: { label: "Start Chat", href: "#" },
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: Globe },
  { label: "Twitter", href: "#", icon: AtSign },
  { label: "Instagram", href: "#", icon: Camera },
  { label: "LinkedIn", href: "#", icon: Building2 },
  { label: "YouTube", href: "#", icon: Play },
];

const FAQ_QUICK_LINKS = [
  { label: "How do I get a quote?", href: "/faq", icon: ShoppingCart },
  { label: "What materials do you use?", href: "/faq", icon: PenTool },
  { label: "How long does production take?", href: "/faq", icon: Clock },
  { label: "Do you ship internationally?", href: "/faq", icon: Truck },
  { label: "What's your warranty policy?", href: "/faq", icon: HelpCircle },
];

// ── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

// ── Main Page ────────────────────────────────────────────────────────────────

export function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submission:", data);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden bg-navy-900 px-4 py-16 md:py-24">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 inline-block rounded-full bg-red-600/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-red-400">
              Contact Us
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-6 text-lg text-navy-300 leading-relaxed max-w-2xl mx-auto">
              Whether you have a project in mind, need a quote, or just want to
              learn more about what we do — our team is ready to help. We
              respond within 24 hours, usually much faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ Contact Form + Info Cards ═══ */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mx-auto max-w-xl py-16 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 sm:h-24 sm:w-24">
                  <CheckCircle2 className="h-8 w-8 text-green-600 sm:h-12 sm:w-12" />
                </div>
                <h2 className="mt-8 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
                  Message Sent!
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Thank you for reaching out. A member of our team will review
                  your message and respond within{" "}
                  <strong className="text-navy-900">24 hours</strong>. In the
                  meantime, feel free to browse our gallery or learn more about
                  our process.
                </p>

                <div className="mt-8 rounded-xl border border-navy-200 bg-white p-6 text-left shadow-sm">
                  <h3 className="font-semibold text-navy-800">
                    What happens next?
                  </h3>
                  <ol className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        1
                      </span>
                      Our team reviews your message within 2 hours
                    </li>
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        2
                      </span>
                      We&apos;ll follow up with any clarifying questions
                    </li>
                    <li className="flex gap-2">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        3
                      </span>
                      You&apos;ll receive a detailed response or quote
                    </li>
                  </ol>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-navy-300 px-6 py-3 text-sm font-semibold text-navy-700 transition-all hover:border-navy-700 hover:bg-navy-50"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500"
                  >
                    View Our Work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ) : (
              /* ── Form + Info Layout ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-10 lg:grid-cols-5"
              >
                {/* Left: Contact Form (spans 3 cols) */}
                <div className="lg:col-span-3">
                  <div className="rounded-2xl border border-navy-200 bg-white p-5 shadow-sm sm:p-8">
                    <h2 className="font-heading text-2xl font-bold text-navy-900 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-sm text-gray-500 mb-8">
                      Fill out the form below and we&apos;ll get back to you
                      within 24 hours.
                    </p>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                      noValidate
                    >
                      {/* Name + Company */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-sm font-medium text-navy-700 mb-1.5"
                          >
                            Full name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            placeholder="John Smith"
                            {...register("name", {
                              required: "Name is required",
                            })}
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
                        <div>
                          <label
                            htmlFor="contact-company"
                            className="block text-sm font-medium text-navy-700 mb-1.5"
                          >
                            Company
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            placeholder="Your company"
                            {...register("company")}
                            className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                          />
                        </div>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-sm font-medium text-navy-700 mb-1.5"
                          >
                            Email address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            placeholder="you@company.com"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email",
                              },
                            })}
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
                            htmlFor="contact-phone"
                            className="block text-sm font-medium text-navy-700 mb-1.5"
                          >
                            Phone number
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            {...register("phone")}
                            className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-sm font-medium text-navy-700 mb-1.5"
                        >
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="contact-subject"
                          {...register("subject", {
                            required: "Please select a subject",
                          })}
                          className={cn(
                            "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2",
                            errors.subject
                              ? "border-red-300 focus:ring-red-500/20"
                              : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                          )}
                        >
                          <option value="">Select a subject...</option>
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="mt-1.5 text-xs text-red-600">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-navy-700 mb-1.5"
                        >
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          rows={6}
                          placeholder="Tell us about your project, question, or request. The more detail you provide, the better we can help you."
                          {...register("message", {
                            required: "Message is required",
                            minLength: {
                              value: 10,
                              message:
                                "Please provide at least 10 characters",
                            },
                          })}
                          className={cn(
                            "w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 resize-y",
                            errors.message
                              ? "border-red-300 focus:ring-red-500/20"
                              : "border-navy-300 focus:border-navy-700 focus:ring-navy-500/20"
                          )}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs text-red-600">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={cn(
                            "flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]",
                            isSubmitting &&
                              "cursor-not-allowed opacity-70"
                          )}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right: Contact Info Cards (spans 2 cols) */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {CONTACT_CARDS.map((card, idx) => (
                      <motion.div
                        key={card.title}
                        custom={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="rounded-xl border border-navy-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50">
                            <card.icon className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-navy-900">
                              {card.title}
                            </h3>
                            {card.lines.map((line, i) => (
                              <p
                                key={i}
                                className={cn(
                                  "text-sm",
                                  i === 0
                                    ? "text-gray-600 mt-1"
                                    : "text-gray-500"
                                )}
                              >
                                {line}
                              </p>
                            ))}
                            {card.action && (
                              <a
                                href={card.action.href}
                                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                              >
                                {card.action.label}
                                <ChevronRight className="h-3.5 w-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Map Placeholder */}
                  <div className="mt-6 rounded-xl border-2 border-dashed border-navy-300 bg-navy-50 aspect-[16/9] flex items-center justify-center overflow-hidden">
                    <div className="text-center">
                      <MapPin className="mx-auto h-8 w-8 text-navy-400" />
                      <p className="mt-2 text-sm font-medium text-navy-500">
                        Map
                      </p>
                      <p className="text-xs text-navy-400">
                        7426 Industrial Parkway, Detroit, MI 48216
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ Social + FAQ Quick Links ═══ */}
      {!isSubmitted && (
        <>
          {/* Social links */}
          <section className="bg-white border-t border-navy-100 px-4 py-12">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={0}
                className="text-center"
              >
                <h2 className="font-heading text-2xl font-bold text-navy-900">
                  Follow Us
                </h2>
                <p className="mt-2 text-gray-600">
                  See our latest projects, behind-the-scenes content, and
                  company news.
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy-200 text-navy-500 transition-all hover:border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ Quick Links */}
          <section className="px-4 py-12 border-t border-navy-100 bg-gray-50">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={0}
                className="text-center"
              >
                <h2 className="font-heading text-2xl font-bold text-navy-900">
                  Quick Answers
                </h2>
                <p className="mt-2 text-gray-600">
                  Commonly asked questions — find answers fast.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {FAQ_QUICK_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-700 shadow-sm transition-all hover:border-navy-700 hover:shadow-md"
                    >
                      <link.icon className="h-4 w-4 text-red-500" />
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-navy-800"
                  >
                    View All FAQs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
