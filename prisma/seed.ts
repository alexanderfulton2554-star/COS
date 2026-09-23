import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organisation.upsert({
    where: { email: 'hello@coscare.org' },
    update: {},
    create: {
      name: 'COS Care Organisation',
      email: 'hello@coscare.org',
      phone: '020 7946 0118',
      address: '88 Care Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom',
    },
  });

  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@coscare.org' },
    update: {},
    create: {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@coscare.org',
      phone: '+447700900100',
      passwordHash: '$2a$10$J5xP6WQ0r4xWpD7l2fH5vOHf8jSbD2gD0cJRYpVvQ2k5V3QwYD3qS',
      isEmailVerified: true,
      organisationId: org.id,
    },
  });

  console.log('Demo organisation and seed user created:', { orgId: org.id, userId: superAdmin.id });
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
