import { AdminRegistrationPanel } from "@/components/dashboard/admin-registration-panel";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Operations overview</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">COS Dashboard</h1>
          </div>
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">All systems operational</div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total staff</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">128</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active clients</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">321</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending registrations</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">27</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Document alerts</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">09</p>
          </div>
        </section>

        <section className="mt-8">
          <AdminRegistrationPanel />
        </section>
      </div>
    </main>
  );
}
