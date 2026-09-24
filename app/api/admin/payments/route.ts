import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifySessionToken } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("cos_session")?.value;
    if (!token) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    await verifySessionToken(token);

    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    const decision = body.decision === "VERIFY" || body.decision === "REJECT" ? body.decision : "";
    if (!id || !decision) return NextResponse.json({ error: "Payment ID and decision are required." }, { status: 400 });

    const application = await prisma.registrationApplication.update({
      where: { id },
      data: decision === "VERIFY"
        ? { paymentStatus: "PAID", paidAt: new Date() }
        : { paymentStatus: "FAILED", paymentTxHash: null, paymentNetwork: null },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Admin payment verification error:", error);
    return NextResponse.json({ error: "Unable to update payment verification." }, { status: 500 });
  }
}
