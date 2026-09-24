import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ applicationRef?: string }> }) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-[28px] border border-emerald-200 bg-white p-8 text-center shadow-xl shadow-slate-200/40">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Payment received</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Registration submitted</h1>
        <p className="mt-3 text-slate-600">Your contract processing payment has been received. Your application will now be reviewed by the care organisation.</p>
        {params.applicationRef && <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">Reference: {params.applicationRef}</p>}
        <Link href="/login" className="mt-6 inline-flex rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-500">Continue to sign in</Link>
      </div>
    </main>
  );
}
