"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

function LoginForm() {
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
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("密码错误，请重试");
        setLoading(false);
        return;
      }

      router.push(from);
    } catch {
      setError("网络错误，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-navy-100">
        <Lock className="h-7 w-7 text-navy-700" />
      </div>

      <h1 className="mb-2 text-center text-xl font-bold text-navy-900">
        管理员登录
      </h1>
      <p className="mb-6 text-center text-sm text-gray-500">
        请输入密码以访问管理后台
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-navy-700">
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="请输入管理密码"
            autoFocus
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
          disabled={loading || !password.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-900 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "验证中..." : "登录"}
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
        管理员登录
      </h1>
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-navy-400" />
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <Suspense fallback={<LoginFallback />}>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-xs text-gray-400">
          InflatableModel &bull; 管理后台
        </p>
      </div>
    </div>
  );
}