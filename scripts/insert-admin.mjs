import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

try {
  const existing = await prisma.user.findMany();
  console.log('Existing users:', existing.length);

  if (existing.length === 0) {
    const hash = await bcrypt.hash('Admin@RoyalGad2026', 12);
    const user = await prisma.user.create({
      data: {
        email: 'admin@royalgad.com.ng',
        password: hash,
        name: 'RoyalGad Admin',
        role: 'admin',
      },
    });
    console.log('Created admin user:', user.email);
  } else {
    console.log('Admin user already exists:');
    for (const u of existing) {
      console.log(`  - ${u.email} (${u.name})`);
    }
  }
} catch (e) {
  console.error('Error:', e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
