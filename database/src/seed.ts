import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding lookup tables...');

  // Roles
  const roles = [
    { name: 'user', description: 'Standart Sistem Kullanıcısı / Danışan' },
    { name: 'expert', description: 'Uzman / Psikolog' },
    { name: 'admin', description: 'Sistem Yöneticisi' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('Roles seeded.');

  // Degree Types
  const degrees = [
    { name: 'Lisans', description: 'Üniversite Mezunu' },
    { name: 'Yüksek Lisans', description: 'Uzmanlık' },
    { name: 'Doktora', description: 'Akademik Doktora' },
  ];

  for (const degree of degrees) {
    await prisma.degreeType.upsert({
      where: { name: degree.name },
      update: {},
      create: degree,
    });
  }
  console.log('Degree Types seeded.');

  // Specialties
  const specialties = [
    'Depresyon',
    'Anksiyete',
    'Aile Terapisi',
    'Çocuk Psikolojisi',
    'Öfke Kontrolü',
    'EMDR',
    'Çift Terapisi',
    'Cinsel Terapi',
  ];

  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty },
      update: {},
      create: { name: specialty },
    });
  }
  console.log('Specialties seeded');

  // Seed Therapeutic Approaches
  const therapeuticApproaches = [
    'Bilişsel Terapi',
    'Şema Terapisi',
    'Psikanaliz',
  ];

  for (const approach of therapeuticApproaches) {
    await prisma.therapeuticApproach.upsert({
      where: { name: approach },
      update: {},
      create: { name: approach },
    });
  }
  console.log('Therapeutic Approaches seeded');

  // Orijinal demo kullanıcı ve uzman kodları aşağıda kalacak.

  // Appointment Statuses
  const statuses = [
    { name: 'pending', description: 'Onay Bekliyor' },
    { name: 'confirmed', description: 'Onaylandı' },
    { name: 'cancelled', description: 'İptal Edildi' },
    { name: 'completed', description: 'Tamamlandı' },
    { name: 'no_show', description: 'Katılım Sağlanmadı' },
  ];

  for (const status of statuses) {
    await prisma.appointmentStatus.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }
  console.log('Appointment Statuses seeded.');

  console.log('Appointment Statuses seeded.');

  console.log('Creating default admin user...');
  const adminEmail = 'admin@admin.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await prisma.user.create({
      data: {
        firstName: 'Sistem',
        lastName: 'Yöneticisi',
        email: adminEmail,
        passwordHash: hashedPassword,
        isActive: true,
        role: {
          connect: { name: 'admin' }
        }
      }
    });
    console.log('Default admin user created.');
  } else {
    console.log('Default admin already exists.');
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
