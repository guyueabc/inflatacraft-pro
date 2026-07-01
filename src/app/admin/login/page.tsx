"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/stats";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      router.push(from);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
        <Lock className="h-7 w-7 text-navy-700" />
      </div>

      <h1 className="mb-2 text-center text-xl font-bold text-navy-900">
        Admin Login
      </h1>
      <p className="mb-6 text-center text-sm text-gray-500">
        Enter your credentials to access the admin panel
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="mb-1 block text-sm font-medium text-navy-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            placeholder="Enter admin username"
            autoFocus
            autoComplete="username"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder-gray-400 transition-colors focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-navy-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="Enter admin password"
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-navy-900 placeholder-gray-400 transition-colors focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !username.trim() || !password.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-900 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
        <Lock className="h-7 w-7 text-navy-700" />
      </div>
      <h1 className="mb-2 text-center text-xl font-bold text-navy-900">
        Admin Login
      </h1>
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-navy-400" />
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        header, footer, [class*="FloatingCTA"], [class*="floating"], [class*="fixed"][class*="bottom"] {
          display: none !important;
        }
      ` }} />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 text-lg font-bold text-white mb-3">
              IP
            </div>
            <span className="text-sm font-semibold text-navy-700">inflatablemodel</span>
          </div>
          <Suspense fallback={<LoginFallback />}>
            <LoginForm />
          </Suspense>
          <p className="mt-6 text-center text-xs text-gray-400">
            InflatableModel &bull; 管理后台
          </p>
        </div>
      </div>
    </>
  );
}