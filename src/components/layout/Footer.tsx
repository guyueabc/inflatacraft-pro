"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Globe,
  AtSign,
  Camera,
  Building2,
  Play,
} from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Products",
    links: [
      { label: "Custom Inflatables", href: "/products?category=custom" },
      { label: "Inflatable Arches", href: "/products?category=arch" },
      { label: "Inflatable Tents", href: "/products?category=tent" },
      { label: "Inflatable Costumes", href: "/products?category=costume" },
      { label: "Giant Replicas", href: "/products?category=replica" },
      { label: "Inflatable Games", href: "/products?category=game" },
      { label: "All Products", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Process", href: "/how-it-works" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Trade Shows", href: "/industries/trade-shows" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Sports Events", href: "/industries/sports" },
      { label: "Food & Beverage", href: "/industries/food-beverage" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Buying Guide", href: "/buying-guide" },
      { label: "Pricing Guide", href: "/pricing-guide" },
      { label: "Material Specs", href: "/materials" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Setup Guide", href: "/setup-guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Request Quote", href: "/get-quote" },
      { label: "Contact Sales", href: "/contact" },
      { label: "WhatsApp", href: "https://wa.me/8615376427736" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  { label: "Facebook", href: "", icon: Globe },
  { label: "Twitter", href: "", icon: AtSign },
  { label: "Instagram", href: "", icon: Camera },
  { label: "LinkedIn", href: "", icon: Building2 },
  { label: "YouTube", href: "", icon: Play },
] as const;

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("idle");
    setNewsletterMessage("");
    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, formType: "newsletter" }),
      });
      if (!res.ok) throw new Error("Failed to subscribe");
      setNewsletterStatus("success");
      setNewsletterMessage("Thank you for subscribing!");
      setNewsletterEmail("");
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-navy-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand + Newsletter Column (spans 2) */}
          <div className="sm:col-span-2">
            {/* Logo */}
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <span className="text-lg font-bold text-white">IP</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                inflatablemodel
              </span>
              <span className="text-xl font-semibold tracking-tight text-red-400">
                
              </span>
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/60">
              Premium custom inflatable manufacturing for businesses worldwide.
              From concept to creation — we bring your brand to life at scale.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/80">
                Stay Inflated
              </h4>
              <p className="mb-3 text-sm text-white/50">
                Get tips, case studies, and exclusive offers.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                {newsletterMessage && (
                  <p
                    className={
                      newsletterStatus === "success"
                        ? "mt-2 text-sm text-green-400"
                        : "mt-2 text-sm text-red-400"
                    }
                  >
                    {newsletterMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              {SOCIAL_LINKS.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60"
                  >
                    <social.icon className="h-4 w-4" />
                  </span>
                )
              )}
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-red-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} inflatablemodel. All rights
            reserved.
          </p>

          {/* Badges */}
          <div className="flex flex-col items-center gap-3 text-sm text-white/40 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Made in
              </span>
              <span className="inline-flex items-center rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                USA
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                BBB Rating
              </span>
              <span className="inline-flex items-center rounded bg-white/10 px-2 py-0.5 text-xs font-bold text-white">
                A+
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
