"use client";

import { useEffect, useState } from "react";

type Network = "TRC20" | "BEP20";

export function CryptoPaymentForm({ applicationRef }: { applicationRef: string }) {
  const [contractYears, setContractYears] = useState<3 | 5>(3);
  const [network, setNetwork] = useState<Network>("TRC20");
  const [addresses, setAddresses] = useState<Record<Network, string>>({ TRC20: "", BEP20: "" });
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/payments/crypto").then((response) => response.json()).then((data) => setAddresses(data.addresses));
  }, []);

  async function submitPayment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/payments/crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationRef, network, contractYears, txHash }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit payment.");
      setMessage("Payment submitted. An administrator will verify the transaction.");
      setTxHash("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitPayment} className="mt-3 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setContractYears(3)} className={`rounded-lg border px-3 py-2 text-left text-xs ${contractYears === 3 ? "border-sky-500 bg-sky-100 text-sky-700" : "border-slate-200 bg-white text-slate-600"}`}><strong className="block">3-year contract</strong>£300 processing fee</button>
        <button type="button" onClick={() => setContractYears(5)} className={`rounded-lg border px-3 py-2 text-left text-xs ${contractYears === 5 ? "border-sky-500 bg-sky-100 text-sky-700" : "border-slate-200 bg-white text-slate-600"}`}><strong className="block">5-year contract</strong>£500 processing fee</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {(["TRC20", "BEP20"] as Network[]).map((option) => (
          <button key={option} type="button" onClick={() => setNetwork(option)} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${network === option ? "border-sky-500 bg-sky-100 text-sky-700" : "border-slate-200 bg-white text-slate-600"}`}>{option}</button>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">Send the USDT equivalent of £{contractYears === 3 ? "300" : "500"} on {network} to</p>
        <p className="mt-2 break-all font-mono text-xs text-slate-700">{addresses[network]}</p>
      </div>
      <input value={txHash} onChange={(event) => setTxHash(event.target.value)} required placeholder="Paste transaction hash" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-sky-500" />
      <button type="submit" disabled={loading} className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 disabled:opacity-60">{loading ? "Submitting..." : "Submit transaction for review"}</button>
      {message && <p className="text-xs text-slate-600">{message}</p>}
    </form>
  );
}
