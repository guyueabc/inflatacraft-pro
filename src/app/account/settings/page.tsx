"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  Package,
  Palette,
  Settings,
  LogOut,
  ChevronRight,
  User,
  Mail,
  Phone,
  Building2,
  Lock,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/quotes", label: "My Quotes", icon: FileText, exact: false },
  { href: "/account/orders", label: "My Orders", icon: Package, exact: false },
  { href: "/account/design-review", label: "Design Review", icon: Palette, exact: false },
  { href: "/account/settings", label: "Settings", icon: Settings, exact: false },
] as const;

export default function SettingsPage() {
  const pathname = usePathname();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@acmecorp.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Marketing Group",
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmNew: "",
  });

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    setPasswords({ current: "", newPassword: "", confirmNew: "" });
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <nav className="rounded-xl border border-navy-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
              <div className="px-3 py-4 border-b border-navy-100 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Account
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-navy-900">
                  Hello, Alex
                </p>
                <p className="text-sm text-gray-500">alex@acmecorp.com</p>
              </div>

              <ul className="space-y-1">
                {SIDEBAR_LINKS.map((link) => {
                  const isActive = link.exact
                    ? pathname === link.href
                    : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "bg-red-600 text-white"
                            : "text-navy-700 hover:bg-navy-50 hover:text-navy-900"
                        )}
                      >
                        <link.icon className="h-4 w-4" />
                        {link.label}
                        {isActive && (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-4 border-t border-navy-100">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-8">
            <div>
              <h1 className="font-heading text-2xl font-bold text-navy-900">
                Account Settings
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your profile and security preferences
              </p>
            </div>

            {/* Success Toast */}
            {isSaved && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" />
                Settings saved successfully!
              </div>
            )}

            {/* Profile Section */}
            <div className="rounded-xl border border-navy-200 bg-white shadow-sm">
              <div className="border-b border-navy-100 px-6 py-4">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-navy-900">
                  <User className="h-5 w-5 text-navy-500" />
                  Profile Information
                </h2>
              </div>
              <form onSubmit={handleProfileSave} className="px-6 py-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="settings-name"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="settings-name"
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="settings-email"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="settings-email"
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-navy-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-phone"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      Phone number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="settings-phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                        className="w-full rounded-lg border border-navy-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="settings-company"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      Company
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="settings-company"
                        type="text"
                        value={profile.company}
                        onChange={(e) =>
                          setProfile({ ...profile, company: e.target.value })
                        }
                        className="w-full rounded-lg border border-navy-300 bg-white pl-10 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={cn(
                      "flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.98]",
                      isSaving && "cursor-not-allowed opacity-70"
                    )}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password Section */}
            <div className="rounded-xl border border-navy-200 bg-white shadow-sm">
              <div className="border-b border-navy-100 px-6 py-4">
                <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-navy-900">
                  <Lock className="h-5 w-5 text-navy-500" />
                  Change Password
                </h2>
              </div>
              <form onSubmit={handlePasswordSave} className="px-6 py-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="settings-current-pw"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      Current password
                    </label>
                    <input
                      id="settings-current-pw"
                      type="password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          current: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="settings-new-pw"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      New password
                    </label>
                    <input
                      id="settings-new-pw"
                      type="password"
                      value={passwords.newPassword}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Min. 8 characters"
                      className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="settings-confirm-pw"
                      className="block text-sm font-medium text-navy-700 mb-1.5"
                    >
                      Confirm new password
                    </label>
                    <input
                      id="settings-confirm-pw"
                      type="password"
                      value={passwords.confirmNew}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          confirmNew: e.target.value,
                        })
                      }
                      placeholder="Repeat new password"
                      className="w-full rounded-lg border border-navy-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={cn(
                      "flex items-center gap-2 rounded-lg bg-navy-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-800 active:scale-[0.98]",
                      isSaving && "cursor-not-allowed opacity-70"
                    )}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
