"use client";

import { useState } from "react";

export function RegistrationPaymentButton({ applicationRef }: { applicationRef: string }) {
  const [loading, setLoading] = useState(false);

  async function beginPayment() {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationRef }),
      });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || "Unable to start payment.");
      window.location.href = result.url;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to start payment.");
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={beginPayment} disabled={loading} className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60">
      {loading ? "Opening secure checkout..." : "Pay $50 registration fee"}
    </button>
  );
}
