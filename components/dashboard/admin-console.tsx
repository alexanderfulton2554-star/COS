"use client";

import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { AdminRegistrationPanel } from "@/components/dashboard/admin-registration-panel";

type Section = "Overview" | "Applications" | "Users" | "Clients" | "Scheduling" | "Compliance" | "Incidents" | "Settings";

const navigation: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Applications", icon: ClipboardCheck },
  { label: "Users", icon: Users },
  { label: "Clients", icon: HeartPulse },
  { label: "Scheduling", icon: CalendarDays },
  { label: "Compliance", icon: ShieldCheck },
  { label: "Incidents", icon: AlertTriangle },
  { label: "Settings", icon: Settings },
];

const metrics = [
  { label: "Active staff", value: "128", detail: "+8 this month", icon: Users, tone: "sky" },
  { label: "Active clients", value: "321", detail: "96% care plans current", icon: HeartPulse, tone: "rose" },
  { label: "Visits today", value: "84", detail: "79 completed", icon: CalendarDays, tone: "emerald" },
  { label: "Compliance alerts", value: "09", detail: "3 need attention", icon: ShieldCheck, tone: "amber" },
];

const activity = [
  { title: "New registration submitted", detail: "Aisha Rahman · 12 minutes ago", tone: "sky" },
  { title: "Training certificate expires soon", detail: "Daniel Clarke · 1 hour ago", tone: "amber" },
  { title: "Incident report updated", detail: "Missed visit · 2 hours ago", tone: "rose" },
];

const toneClasses: Record<string, string> = {
  sky: "bg-sky-100 text-sky-700",
  rose: "bg-rose-100 text-rose-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
};

export function AdminConsole() {
  const [section, setSection] = useState<Section>("Overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function selectSection(nextSection: Section) {
    setSection(nextSection);
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white px-5 py-6 transition-transform lg:static lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white">COS</div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Care Organisation</p>
                <p className="font-semibold text-slate-900">Admin workspace</p>
              </div>
            </div>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-10 space-y-1">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Manage operations</p>
            {navigation.map(({ label, icon: Icon }) => (
              <button key={label} type="button" onClick={() => selectSection(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${section === label ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {section === label && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>
            ))}
          </div>

          <div className="absolute bottom-6 left-5 right-5 rounded-2xl bg-slate-900 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Organisation</p>
            <p className="mt-2 text-sm font-semibold">Northstar Care Group</p>
            <p className="mt-1 text-xs text-slate-400">Administrator access</p>
          </div>
        </aside>

        {mobileMenuOpen && <button type="button" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" aria-label="Close navigation overlay" />}

        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setMobileMenuOpen(true)} className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden" aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Administration</p>
                  <h1 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">{section}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-slate-900">Alex Morgan</p>
                  <p className="text-xs text-slate-500">Organisation admin</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">AM</div>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
            {section === "Overview" && <Overview onSelect={selectSection} />}
            {section === "Applications" && <AdminRegistrationPanel />}
            {section !== "Overview" && section !== "Applications" && <PlaceholderSection section={section} onSelect={selectSection} />}
          </main>
        </div>
      </div>
    </div>
  );
}

function Overview({ onSelect }: { onSelect: (section: Section) => void }) {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses[tone]}`}><Icon className="h-5 w-5" /></div>
            </div>
            <p className="mt-4 text-xs text-slate-500">{detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Daily operations</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Service delivery snapshot</h2>
            </div>
            <button type="button" onClick={() => onSelect("Scheduling")} className="text-sm font-medium text-sky-700 hover:text-sky-600">View schedule</button>
          </div>
          <div className="mt-6 space-y-4">
            <ProgressRow label="Visits completed" value="79 of 84" percent={94} color="bg-emerald-500" />
            <ProgressRow label="Care plans reviewed" value="42 of 48" percent={88} color="bg-sky-500" />
            <ProgressRow label="Staff compliance" value="119 of 128" percent={93} color="bg-violet-500" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Attention needed</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Priority queue</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-slate-400" />
          </div>
          <div className="mt-5 space-y-3">
            <button type="button" onClick={() => onSelect("Applications")} className="flex w-full items-center justify-between rounded-xl bg-amber-50 p-3 text-left text-sm text-amber-800"><span>24 applications to review</span><ChevronRight className="h-4 w-4" /></button>
            <button type="button" onClick={() => onSelect("Compliance")} className="flex w-full items-center justify-between rounded-xl bg-rose-50 p-3 text-left text-sm text-rose-800"><span>9 documents expiring</span><ChevronRight className="h-4 w-4" /></button>
            <button type="button" onClick={() => onSelect("Incidents")} className="flex w-full items-center justify-between rounded-xl bg-sky-50 p-3 text-left text-sm text-sky-800"><span>3 incidents need follow-up</span><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Recent activity</p><h2 className="mt-2 text-xl font-semibold text-slate-900">What is happening</h2></div><FileText className="h-5 w-5 text-slate-400" /></div>
          <div className="mt-5 space-y-4">
            {activity.map((item) => <div key={item.title} className="flex gap-3"><div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone === "amber" ? "bg-amber-500" : item.tone === "rose" ? "bg-rose-500" : "bg-sky-500"}`} /><div><p className="text-sm font-medium text-slate-800">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.detail}</p></div></div>)}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Quick action</p><h2 className="mt-3 text-2xl font-semibold">Keep the organisation moving.</h2><p className="mt-3 max-w-md text-sm leading-6 text-slate-300">Review new applications, keep staff records current, and surface risks before they affect care delivery.</p><button type="button" onClick={() => onSelect("Applications")} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-400">Review applications <ChevronRight className="h-4 w-4" /></button></div>
      </section>
    </>
  );
}

function ProgressRow({ label, value, percent, color }: { label: string; value: string; percent: number; color: string }) {
  return <div><div className="mb-2 flex justify-between gap-3 text-sm"><span className="text-slate-600">{label}</span><span className="font-medium text-slate-900">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} /></div></div>;
}

function PlaceholderSection({ section, onSelect }: { section: Section; onSelect: (section: Section) => void }) {
  const descriptions: Record<string, string> = { Users: "Manage staff accounts, roles, and access across your organisation.", Clients: "Maintain client profiles, care needs, contacts, and care plan reviews.", Scheduling: "Coordinate visits, shifts, availability, and missed-visit follow-up.", Compliance: "Track training, DBS checks, documents, audits, and renewal dates.", Incidents: "Review safeguarding, medication, accident, and service incidents.", Settings: "Configure organisation details, permissions, notifications, and integrations." };
  return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700"><Settings className="h-6 w-6" /></div><h2 className="mt-5 text-2xl font-semibold text-slate-900">{section} management</h2><p className="mt-3 max-w-xl text-slate-600">{descriptions[section]}</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-semibold text-slate-900">--</p><p className="mt-1 text-sm text-slate-500">Live records will appear here</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-semibold text-slate-900">Ready</p><p className="mt-1 text-sm text-slate-500">Module structure configured</p></div><div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-semibold text-slate-900">Next</p><p className="mt-1 text-sm text-slate-500">Connect workflow data</p></div></div><button type="button" onClick={() => onSelect("Overview")} className="mt-8 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500">Back to overview</button></div>;
}
