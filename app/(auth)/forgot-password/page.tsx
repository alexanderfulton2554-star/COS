import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Password reset</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Forgot your password?</h1>
        <p className="mt-3 text-sm text-slate-600">Enter your email address and we’ll send a secure reset link if the account exists.</p>

        <form className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white" placeholder="name@example.com" />
          </div>

          <button type="submit" className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">Send reset link</button>
          <Link href="/login" className="block text-center text-sm font-medium text-sky-700 hover:text-sky-600">Back to sign in</Link>
        </form>
      </div>
    </main>
  );
}
