"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

type Registration = {
  id: string;
  applicationRef: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  createdAt: string;
  adminNotes?: string | null;
  paymentStatus?: string;
  paymentNetwork?: string | null;
  paymentTxHash?: string | null;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  };
};

const fallbackRegistrations: Registration[] = [
  {
    id: "demo-1",
    applicationRef: "COS-2026-000184",
    status: "PENDING_REVIEW",
    firstName: "Aisha",
    lastName: "Rahman",
    email: "aisha.rahman@example.com",
    phone: "+44 7700 900184",
    createdAt: new Date().toISOString(),
    adminNotes: "Awaiting staff verification.",
  },
  {
    id: "demo-2",
    applicationRef: "COS-2026-000193",
    status: "UNDER_REVIEW",
    firstName: "Marcus",
    lastName: "Bell",
    email: "marcus.bell@example.com",
    phone: "+44 7700 900193",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    adminNotes: "Right-to-work checks in progress.",
  },
];

export function AdminRegistrationPanel() {
  const [registrations, setRegistrations] = useState<Registration[]>(fallbackRegistrations);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const response = await fetch("/api/admin/registrations");
        const data = await response.json();
        setRegistrations(data.registrations && data.registrations.length > 0 ? data.registrations : fallbackRegistrations);
      } catch (error) {
        console.error("Unable to load registrations", error);
        setRegistrations(fallbackRegistrations);
      } finally {
        setLoading(false);
      }
    }

    fetchRegistrations();
  }, []);

  const approve = async (id: string) => {
    const response = await fetch("/api/admin/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "APPROVED", adminNotes: "Application approved after review." }),
    });

    if (response.ok) {
      setRegistrations((current) => current.map((item) => (item.id === id ? { ...item, status: "APPROVED" } : item)));
    }
  };

  const reject = async (id: string) => {
    const response = await fetch("/api/admin/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "REJECTED", adminNotes: "Application rejected pending additional evidence." }),
    });

    if (response.ok) {
      setRegistrations((current) => current.map((item) => (item.id === id ? { ...item, status: "REJECTED" } : item)));
    }
  };

  const verifyPayment = async (id: string, decision: "VERIFY" | "REJECT") => {
    const response = await fetch("/api/admin/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, decision }),
    });

    if (response.ok) {
      setRegistrations((current) => current.map((item) => item.id === id ? { ...item, paymentStatus: decision === "VERIFY" ? "PAID" : "FAILED", paymentTxHash: decision === "VERIFY" ? item.paymentTxHash : null } : item));
    }
  };

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Loading registrations…</div>;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin review</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Registration applications</h2>
        </div>
        <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">{registrations.length} records</div>
      </div>

      <div className="space-y-4">
        {registrations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-500">No applications found.</div>
        ) : (
          registrations.map((application) => (
            <div key={application.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">{application.firstName} {application.lastName}</h3>
                    <span className="rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700">{application.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{application.applicationRef} • {application.email}</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => approve(application.id)} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button onClick={() => reject(application.id)} className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl bg-white p-3 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Phone</span>
                  {application.phone || "Not provided"}
                </div>
                <div className="rounded-xl bg-white p-3 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Submitted</span>
                  {new Date(application.createdAt).toLocaleDateString("en-GB")}
                </div>
                <div className="rounded-xl bg-white p-3 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">Review status</span>
                  <span className="inline-flex items-center gap-2 text-slate-700">
                    <Clock3 className="h-3.5 w-3.5" /> {application.status}
                  </span>
                </div>
              </div>
              {application.paymentTxHash && (
                <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Crypto payment · {application.paymentNetwork}</p>
                  <p className="mt-2 break-all font-mono text-xs text-slate-700">{application.paymentTxHash}</p>
                  {application.paymentStatus !== "PAID" && (
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => verifyPayment(application.id, "VERIFY")} className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-500">Verify $50 payment</button>
                      <button onClick={() => verifyPayment(application.id, "REJECT")} className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50">Reject payment</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
