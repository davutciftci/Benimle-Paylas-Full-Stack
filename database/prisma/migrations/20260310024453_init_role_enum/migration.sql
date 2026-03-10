/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('user', 'admin', 'expert');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- DropIndex
DROP INDEX "users_role_id_idx";

-- AlterTable
ALTER TABLE "expert_profiles" ADD COLUMN     "price" INTEGER,
ADD COLUMN     "title_id" INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_id",
ADD COLUMN     "role" "user_roles" NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "roles";

-- CreateTable
CREATE TABLE "titles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "therapeutic_approaches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "therapeutic_approaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seminars" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATE,
    "expert_profile_id" INTEGER NOT NULL,

    CONSTRAINT "seminars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sign_language_words" (
    "word" VARCHAR(100) NOT NULL,
    "video_url" VARCHAR(500),
    "category" VARCHAR(50),
    "has_video" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "sign_language_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpertApproaches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExpertApproaches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "titles_name_key" ON "titles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "therapeutic_approaches_name_key" ON "therapeutic_approaches"("name");

-- CreateIndex
CREATE INDEX "seminars_expert_profile_id_idx" ON "seminars"("expert_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "sign_language_words_word_key" ON "sign_language_words"("word");

-- CreateIndex
CREATE INDEX "sign_language_words_word_idx" ON "sign_language_words"("word");

-- CreateIndex
CREATE INDEX "_ExpertApproaches_B_index" ON "_ExpertApproaches"("B");

-- AddForeignKey
ALTER TABLE "seminars" ADD CONSTRAINT "seminars_expert_profile_id_fkey" FOREIGN KEY ("expert_profile_id") REFERENCES "expert_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_profiles" ADD CONSTRAINT "expert_profiles_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpertApproaches" ADD CONSTRAINT "_ExpertApproaches_A_fkey" FOREIGN KEY ("A") REFERENCES "expert_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpertApproaches" ADD CONSTRAINT "_ExpertApproaches_B_fkey" FOREIGN KEY ("B") REFERENCES "therapeutic_approaches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
