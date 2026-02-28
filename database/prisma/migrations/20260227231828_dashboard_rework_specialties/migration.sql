-- AlterTable
ALTER TABLE "expert_profiles" ADD COLUMN     "working_hours" JSONB;

-- CreateTable
CREATE TABLE "specialties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpertSpecialties" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExpertSpecialties_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "specialties_name_key" ON "specialties"("name");

-- CreateIndex
CREATE INDEX "_ExpertSpecialties_B_index" ON "_ExpertSpecialties"("B");

-- AddForeignKey
ALTER TABLE "_ExpertSpecialties" ADD CONSTRAINT "_ExpertSpecialties_A_fkey" FOREIGN KEY ("A") REFERENCES "expert_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpertSpecialties" ADD CONSTRAINT "_ExpertSpecialties_B_fkey" FOREIGN KEY ("B") REFERENCES "specialties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
