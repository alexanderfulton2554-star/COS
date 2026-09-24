import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { CryptoPaymentForm } from "@/components/dashboard/crypto-payment-form";

const tasks = [
  { title: "Complete your profile", detail: "Add your availability and preferred contact details.", action: "Update profile", href: "#profile", icon: UserRound, tone: "sky" },
  { title: "Upload supporting documents", detail: "Your application still needs document verification.", action: "View documents", href: "#documents", icon: FileText, tone: "amber" },
  { title: "Review your application", detail: "Your application is currently waiting for admin review.", action: "View status", href: "#status", icon: ShieldCheck, tone: "emerald" },
];

const toneClasses: Record<string, string> = {
  sky: "bg-sky-100 text-sky-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

type UserApplication = { applicationRef: string; status: string; paymentStatus: string } | null;

export function UserDashboard({ application }: { application: UserApplication }) {
  const isApproved = application?.status === "APPROVED";
  const isPaid = application?.paymentStatus === "PAID";
  const statusLabel = isPaid ? "Payment complete" : isApproved ? "Approved - payment required" : "Pending admin review";

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-sm font-bold text-white">COS</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Care Organisation</p>
              <p className="font-semibold text-slate-900">My workspace</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50" aria-label="Notifications"><Bell className="h-5 w-5" /></button>
            <div className="hidden text-right sm:block"><p className="text-sm font-medium text-slate-900">Welcome back</p><p className="text-xs text-slate-500">Applicant account</p></div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">U</div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-300/30 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Personal workspace</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Your care career, in one place.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Track your application, keep your documents current, and stay connected with your care organisation.</p>
            </div>
            <div id="status" className="rounded-2xl border border-white/10 bg-white/5 p-4 lg:min-w-64"><div className="flex items-center gap-2 text-sm text-slate-300"><Clock3 className="h-4 w-4 text-amber-300" /> Application status</div><p className="mt-2 text-lg font-semibold">{statusLabel}</p><p className="mt-1 text-xs text-slate-400">{application?.applicationRef || "No application found"}</p></div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Application progress" value={isPaid ? "100%" : isApproved ? "90%" : "78%"} detail={isPaid ? "Registration complete" : isApproved ? "Payment required" : "Waiting for review"} icon={CheckCircle2} tone="emerald" />
          <SummaryCard label="Documents uploaded" value="4" detail="2 awaiting review" icon={FileText} tone="sky" />
          <SummaryCard label="Profile completion" value="86%" detail="Add availability" icon={UserRound} tone="amber" />
          <SummaryCard label="Next review" value="28 Sep" detail="Application follow-up" icon={CalendarDays} tone="rose" />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div id="documents" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Next steps</p><h2 className="mt-2 text-xl font-semibold text-slate-900">Keep your application moving</h2></div><HeartPulse className="h-5 w-5 text-sky-600" /></div>
            <div className="mt-5 space-y-3">{tasks.map(({ title, detail, action, href, icon: Icon, tone }) => <div key={title} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}><Icon className="h-5 w-5" /></div><div className="min-w-0 flex-1"><p className="font-medium text-slate-900">{title}</p><p className="mt-1 text-sm text-slate-500">{detail}</p></div><Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:text-sky-600">{action}<ArrowRight className="h-4 w-4" /></Link></div>)}</div>
          </div>

          <div id="profile" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Account details</p><h2 className="mt-2 text-xl font-semibold text-slate-900">Your profile</h2><div className="mt-5 space-y-3 text-sm"><div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className="text-slate-500">Account type</span><span className="font-medium text-slate-900">Care applicant</span></div><div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className="text-slate-500">Email status</span><span className="inline-flex items-center gap-1.5 font-medium text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Verified</span></div><div className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span className="text-slate-500">Application</span><span className={`font-medium ${isApproved ? "text-emerald-700" : "text-amber-700"}`}>{statusLabel}</span></div></div>{isApproved && !isPaid && application && <div className="mt-5 rounded-xl border border-sky-200 bg-sky-50 p-4"><p className="text-sm font-medium text-slate-900">Your application was accepted.</p><p className="mt-1 text-sm text-slate-600">Send $50 USDT on TRC20 or BEP20, then submit the transaction hash.</p><CryptoPaymentForm applicationRef={application.applicationRef} /></div>}<Link href="/register" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-600">Edit registration details <ArrowRight className="h-4 w-4" /></Link></div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({ label, value, detail, icon: Icon, tone }: { label: string; value: string; detail: string; icon: typeof UserRound; tone: string }) {
  const toneMap: Record<string, string> = { emerald: "bg-emerald-100 text-emerald-700", sky: "bg-sky-100 text-sky-700", amber: "bg-amber-100 text-amber-700", rose: "bg-rose-100 text-rose-700" };
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p></div><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneMap[tone]}`}><Icon className="h-5 w-5" /></div></div><p className="mt-4 text-xs text-slate-500">{detail}</p></div>;
}
