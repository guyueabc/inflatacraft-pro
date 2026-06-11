"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Phone,
  Mail,
  ShoppingCart,
  Menu,
  ChevronDown,
} from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Gallery", href: "/gallery" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      )}
    >
      {/* Top Bar */}
      <div
        className={cn(
          "bg-navy-900 text-white transition-all duration-300",
          isScrolled ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:1-800-INFLATA"
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>1-800-INFLATA</span>
            </a>
            <a
              href="mailto:sales@inflatacraftpro.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>sales@inflatacraftpro.com</span>
            </a>
          </div>
          <Link
            href="/request-quote"
            className="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-500 sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">Request Quote</span>
            <span className="sm:hidden">Quote</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto flex items-center justify-between px-4 py-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-700">
            <span className="text-lg font-bold text-white">IP</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold tracking-tight text-navy-900">
              InflataCraft
            </span>
            <span className="ml-1 text-xl font-semibold tracking-tight text-red-600">
              Pro
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {link.label}
              {"hasDropdown" in link && link.hasDropdown && (
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            className="relative rounded-md p-2 text-navy-700 transition-colors hover:bg-navy-50"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              0
            </span>
          </button>
          <Link
            href="/sign-in"
            className="rounded-md border border-navy-300 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-700 hover:bg-navy-50"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href="/cart"
            className="relative rounded-md p-2 text-navy-700 transition-colors hover:bg-navy-50"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              0
            </span>
          </Link>
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-2 text-navy-700 transition-colors hover:bg-navy-50"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </header>
  );
}
