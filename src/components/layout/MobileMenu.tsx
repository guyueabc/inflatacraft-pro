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
              href="https://wa.me/8615376427736" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-navy-700 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              
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
