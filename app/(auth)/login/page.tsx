"use client";

import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { loginSchema } from "@/lib/validation/auth";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed.");
      }

      window.location.href = "/user-dashboard";
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Unable to sign in right now.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">COS Login</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back</h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input {...form.register("email")} type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white" placeholder="name@example.com" />
            </div>
            {form.formState.errors.email && <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <input {...form.register("password")} type={showPassword ? "text" : "password"} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-10 pl-3 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-3 flex items-center text-slate-500">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password && <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-600" /> Remember me
            </label>
            <Link href="/forgot-password" className="font-medium text-sky-700 hover:text-sky-600">Forgot password?</Link>
          </div>

          <button type="submit" className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">Login</button>

          <div className="pt-2 text-center text-sm text-slate-500">
            Need an account? <Link href="/register" className="font-medium text-sky-700 hover:text-sky-600">Create one</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
