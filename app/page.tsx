import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

const featureCards = [
  {
    title: "Client-led care planning",
    description: "Track person-centred care plans, risk indicators, and outcomes in one operational view.",
    icon: HeartPulse,
    accent: "bg-rose-100 text-rose-700",
  },
  {
    title: "Workforce and compliance",
    description: "Keep staffing, training, DBS checks, and scheduling aligned with regulatory duties.",
    icon: ShieldCheck,
    accent: "bg-sky-100 text-sky-700",
  },
  {
    title: "Operational confidence",
    description: "Monitor incidents, document status, and service quality with real-time oversight.",
    icon: ClipboardCheck,
    accent: "bg-emerald-100 text-emerald-700",
  },
];

const trustPoints = [
  "CQC-ready documentation workflows",
  "GDPR-aware staff data controls",
  "Multi-site oversight for growing providers",
  "Live intake and registration review",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              <BadgeCheck className="h-3.5 w-3.5" /> Trusted care operations
            </div>

            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Modern support for safe, compliant care delivery.
            </h2>

            <p className="mt-5 max-w-xl text-lg text-slate-600">
              COS brings together staffing, client records, onboarding, compliance, and operational oversight in one secure platform built for UK care providers.
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500">
                Join COS <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Log in</Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-sky-600" /> Care coordination</div>
              <div className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4 text-sky-600" /> Staff management</div>
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-sky-600" /> Family visibility</div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-inner shadow-slate-200/50">
            <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Live overview</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">24</p>
                </div>
                <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Pending review</div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm text-slate-500">Active care teams</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">38</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm text-slate-500">Open incidents</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">3</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm text-slate-500">Document alerts</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">9</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon, accent }) => (
            <div key={title} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[30px] border border-slate-200 bg-slate-900 p-8 text-white shadow-xl shadow-slate-300/30">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300">Built for care providers</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">Operational resilience without the admin burden.</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
