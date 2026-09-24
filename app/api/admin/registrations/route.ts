import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { registrationDecisionSchema } from '@/lib/validation/admin';

export async function GET() {
  try {
    const registrations = await prisma.registrationApplication.findMany({
      where: { status: { not: 'DRAFT' } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        applicationRef: true,
        status: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
        adminNotes: true,
        paymentStatus: true,
        paymentNetwork: true,
        paymentTxHash: true,
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, phone: true, isActive: true },
        },
      },
    });

    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registration applications:', error);
    return NextResponse.json({ error: 'Unable to fetch registration applications.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationDecisionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid decision payload.' }, { status: 400 });
    }

    const { status, adminNotes } = parsed.data;
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Registration ID is required.' }, { status: 400 });
    }

    const application = await prisma.registrationApplication.update({
      where: { id },
      data: {
        status,
        adminNotes: adminNotes || null,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Error updating registration application:', error);
    return NextResponse.json({ error: 'Unable to update application status.' }, { status: 500 });
  }
}
