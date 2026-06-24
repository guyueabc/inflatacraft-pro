"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { X, Phone, Mail, ShoppingCart, ChevronRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: readonly NavLink[];
}

export function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap: focus the close button on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        panelRef.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className={cn(
          "absolute right-0 top-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl",
          "animate-in slide-in-from-right duration-300"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-700">
              <span className="text-base font-bold text-white">IP</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-navy-900">
              inflatablemodel
            </span>
            <span className="text-lg font-semibold tracking-tight text-red-600">
              
            </span>
          </Link>
          <button
            data-close
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-navy-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 text-base font-medium text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
            >
              {link.label}
              <ChevronRight className="h-4 w-4 text-navy-400" />
            </Link>
          ))}
        </nav>

        <div className="border-t" />

        {/* Actions */}
        <div className="flex flex-col gap-3 p-4">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center gap-3 rounded-md border border-navy-200 px-4 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart (0)
          </Link>
          <Link
            href="/get-quote"
            onClick={onClose}
            className="flex items-center justify-center rounded-md border border-navy-300 px-4 py-3 text-sm font-medium text-navy-700 transition-colors hover:border-navy-700 hover:bg-navy-50"
          >
            Get Quote
          </Link>
          <Link
            href="/get-quote"
            onClick={onClose}
            className="flex items-center justify-center rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500"
          >
            Request Quote
          </Link>
        </div>

        {/* Contact */}
        <div className="border-t px-4 py-4">
          <div className="flex flex-col gap-2 text-sm text-navy-500">
            <a
              href="tel:+8615376427736"
              className="flex items-center gap-2 hover:text-navy-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              +86 153****7736
            </a>
            <a
              href="mailto:inflatablemodel@showlovein.com"
              className="flex items-center gap-2 hover:text-navy-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
              inflatablemodel@showlovein.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
