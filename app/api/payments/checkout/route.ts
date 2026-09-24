import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";
import { verifySessionToken } from "@/lib/auth/session";

const registrationFeeCents = 5000;

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Payment checkout is not configured yet." }, { status: 503 });
  }

  try {
    const token = (await cookies()).get("cos_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "You must be signed in to pay this fee." }, { status: 401 });
    }

    const authSession = await verifySessionToken(token);
    const body = await request.json();
    const applicationRef = typeof body.applicationRef === "string" ? body.applicationRef : "";

    if (!applicationRef) {
      return NextResponse.json({ error: "Application reference is required." }, { status: 400 });
    }

    const application = await prisma.registrationApplication.findUnique({
      where: { applicationRef },
      select: { id: true, userId: true, email: true, firstName: true, lastName: true, status: true, paymentStatus: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Registration application not found." }, { status: 404 });
    }

    if (application.userId !== authSession.userId) {
      return NextResponse.json({ error: "You cannot pay another user's application." }, { status: 403 });
    }

    if (application.paymentStatus === "PAID") {
      return NextResponse.json({ error: "This registration fee has already been paid." }, { status: 409 });
    }

    if (application.status !== "APPROVED") {
      return NextResponse.json({ error: "Payment becomes available after an administrator approves the application." }, { status: 403 });
    }

    const stripe = new Stripe(secretKey);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: application.email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: registrationFeeCents,
          product_data: { name: "COS registration fee" },
        },
      }],
      metadata: { applicationId: application.id, applicationRef },
      success_url: `${appUrl}/payment/success?applicationRef=${encodeURIComponent(applicationRef)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/register?payment=cancelled&applicationRef=${encodeURIComponent(applicationRef)}`,
    });

    await prisma.registrationApplication.update({
      where: { id: application.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Unable to start secure payment checkout." }, { status: 500 });
  }
}
