import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { registerSchema } from '@/lib/validation/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid registration data.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const applicationReference = `COS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000) + 1).padStart(6, '0')}`;

    const user = await prisma.user.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        passwordHash,
        isEmailVerified: false,
        isActive: true,
      },
    });

    await prisma.registrationApplication.create({
      data: {
        userId: user.id,
        applicationRef: applicationReference,
        status: 'PENDING_REVIEW',
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        employmentRole: 'Applicant',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully.',
      applicationRef: applicationReference,
      userId: user.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Unable to complete registration right now.' }, { status: 500 });
  }
}
