import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, ClipboardList } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <nav className="mb-16 flex items-center justify-between rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white">COS</div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Care Organisation</p>
              <h1 className="text-lg font-semibold text-slate-900">System</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Sign in</Link>
            <Link href="/register" className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-sky-500">Create account</Link>
          </div>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Operational compliance</span>
            <h2 className="max-w-xl text-5xl font-semibold tracking-tight text-slate-900">Care operations that stay compliant, organised and responsive.</h2>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              COS brings together staff management, client records, care plans, incidents, training compliance and secure document workflows for modern UK care providers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500">
                Join COS <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Log in</Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Users className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-slate-900">1,200+</p>
                <p className="text-sm text-slate-600">Staff records</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-slate-900">98.4%</p>
                <p className="text-sm text-slate-600">Visit completion</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-2xl font-semibold text-slate-900">100%</p>
                <p className="text-sm text-slate-600">Audit readiness</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Live overview</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="text-sm text-slate-500">Pending registrations</p>
                    <p className="text-2xl font-semibold text-slate-900">24</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">Review</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="text-sm text-slate-500">Expiring documents</p>
                    <p className="text-2xl font-semibold text-slate-900">9</p>
                  </div>
                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">Action</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                  <div>
                    <p className="text-sm text-slate-500">Open incidents</p>
                    <p className="text-2xl font-semibold text-slate-900">3</p>
                  </div>
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-medium text-sky-700">Monitored</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
