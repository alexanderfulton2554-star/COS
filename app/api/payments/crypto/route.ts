import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifySessionToken } from "@/lib/auth/session";

const addresses = {
  TRC20: process.env.CRYPTO_TRC20_ADDRESS || "TJEzsgLKCVA373mV3qA1oVXmBL53K9nA1o",
  BEP20: process.env.CRYPTO_BEP20_ADDRESS || "0xd0d28c4ccb58c01d27904785ebc9447275b5b5d8",
} as const;

export async function GET() {
  return NextResponse.json({ asset: "USDT", currency: "GBP", options: [{ years: 3, amount: 30000 }, { years: 5, amount: 50000 }], addresses });
}

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("cos_session")?.value;
    if (!token) return NextResponse.json({ error: "You must be signed in." }, { status: 401 });

    const session = await verifySessionToken(token);
    const body = await request.json();
    const applicationRef = typeof body.applicationRef === "string" ? body.applicationRef.trim() : "";
    const network = body.network === "TRC20" || body.network === "BEP20" ? body.network : "";
    const contractYears = body.contractYears === 3 || body.contractYears === 5 ? body.contractYears : 0;
    const txHash = typeof body.txHash === "string" ? body.txHash.trim() : "";

    if (!applicationRef || !network || !contractYears || !txHash) {
      return NextResponse.json({ error: "Application reference, contract term, network, and transaction hash are required." }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9]{32,128}$/.test(txHash)) {
      return NextResponse.json({ error: "Enter a valid blockchain transaction hash." }, { status: 400 });
    }

    const application = await prisma.registrationApplication.findUnique({
      where: { applicationRef },
      select: { id: true, userId: true, status: true, paymentStatus: true, paymentTxHash: true },
    });

    if (!application || application.userId !== session.userId) {
      return NextResponse.json({ error: "Registration application not found." }, { status: 404 });
    }
    if (application.status !== "APPROVED") {
      return NextResponse.json({ error: "Payment is available after admin approval." }, { status: 403 });
    }
    if (application.paymentStatus === "PAID") {
      return NextResponse.json({ error: "This payment has already been verified." }, { status: 409 });
    }
    if (application.paymentTxHash) {
      return NextResponse.json({ error: "A transaction is already awaiting admin verification." }, { status: 409 });
    }

    await prisma.registrationApplication.update({
      where: { id: application.id },
      data: { paymentNetwork: network, paymentTxHash: txHash, contractYears, paymentAmountPence: contractYears === 3 ? 30000 : 50000, paymentStatus: "PENDING" },
    });

    return NextResponse.json({ success: true, message: "Payment submitted for admin verification." });
  } catch (error) {
    console.error("Crypto payment submission error:", error);
    return NextResponse.json({ error: "Unable to submit payment for verification." }, { status: 500 });
  }
}
