import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const titles = [
    { name: 'Uzman Klinik Psikolog' },
    { name: 'Psikiyatri' },
    { name: 'Uzman Psikolog' },
    { name: 'Psikolog' },
    { name: 'Çift ve Aile Terapisti' },
    { name: 'Pedagog' }
  ];

  console.log('Seeding titles...');
  for (const t of titles) {
    await prisma.title.upsert({
      where: { name: t.name },
      update: {},
      create: t
    });
  }
  console.log('Titles seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
