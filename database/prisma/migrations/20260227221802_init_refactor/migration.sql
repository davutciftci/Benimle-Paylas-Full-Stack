/*
  Warnings:

  - The primary key for the `appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `expertId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `meetingLink` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `sessionType` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `appointments` table. All the data in the column will be lost.
  - The `id` column on the `appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `blog_posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `blog_posts` table. All the data in the column will be lost.
  - The `id` column on the `blog_posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `contact_messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `contact_messages` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `contact_messages` table. All the data in the column will be lost.
  - The `id` column on the `contact_messages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `faqs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `faqs` table. All the data in the column will be lost.
  - The `id` column on the `faqs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `password_reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `password_reset_tokens` table. All the data in the column will be lost.
  - The `id` column on the `password_reset_tokens` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `psychologist_applications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `psychologist_applications` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `psychologist_applications` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `psychologist_applications` table. All the data in the column will be lost.
  - The `id` column on the `psychologist_applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `expertId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `reviews` table. All the data in the column will be lost.
  - The `id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `phone` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointment_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `experts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `password_reset_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expert_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduled_at` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expert_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "appointment_profiles" DROP CONSTRAINT "appointment_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_expertId_fkey";

-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_userId_fkey";

-- DropForeignKey
ALTER TABLE "experts" DROP CONSTRAINT "experts_userId_fkey";

-- DropForeignKey
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_expertId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- DropIndex
DROP INDEX "password_reset_tokens_userId_key";

-- AlterTable
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "endTime",
DROP COLUMN "expertId",
DROP COLUMN "meetingLink",
DROP COLUMN "sessionType",
DROP COLUMN "startTime",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration_minutes" SMALLINT NOT NULL DEFAULT 50,
ADD COLUMN     "expert_id" INTEGER NOT NULL,
ADD COLUMN     "scheduled_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "status_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "appointments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "publishedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "published_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "contact_messages" DROP CONSTRAINT "contact_messages_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "isRead",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_id" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "faqs" DROP CONSTRAINT "faqs_pkey",
DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "password_reset_tokens_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "psychologist_applications" DROP CONSTRAINT "psychologist_applications_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status_name" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "psychologist_applications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "expertId",
DROP COLUMN "userId",
DROP COLUMN "userName",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expert_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "password",
DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(255) NOT NULL,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "appointment_profiles";

-- DropTable
DROP TABLE "experts";

-- DropEnum
DROP TYPE "ApplicationStatus";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degree_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "degree_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_statuses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "appointment_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "bio" TEXT,
    "university" VARCHAR(255),
    "field_of_study" VARCHAR(255),
    "degree_id" INTEGER,
    "graduation_year" SMALLINT,
    "license_number" VARCHAR(100),
    "years_of_experience" SMALLINT,
    "profile_photo_url" VARCHAR(255),
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expert_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "degree_types_name_key" ON "degree_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_statuses_name_key" ON "appointment_statuses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "expert_profiles_user_id_key" ON "expert_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "expert_profiles_license_number_key" ON "expert_profiles"("license_number");

-- CreateIndex
CREATE INDEX "expert_profiles_degree_id_idx" ON "expert_profiles"("degree_id");

-- CreateIndex
CREATE INDEX "appointments_client_id_idx" ON "appointments"("client_id");

-- CreateIndex
CREATE INDEX "appointments_expert_id_idx" ON "appointments"("expert_id");

-- CreateIndex
CREATE INDEX "appointments_status_id_idx" ON "appointments"("status_id");

-- CreateIndex
CREATE INDEX "appointments_scheduled_at_idx" ON "appointments"("scheduled_at");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_user_id_key" ON "password_reset_tokens"("user_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_id_idx" ON "users"("role_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_profiles" ADD CONSTRAINT "expert_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expert_profiles" ADD CONSTRAINT "expert_profiles_degree_id_fkey" FOREIGN KEY ("degree_id") REFERENCES "degree_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_expert_id_fkey" FOREIGN KEY ("expert_id") REFERENCES "expert_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "appointment_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_expert_id_fkey" FOREIGN KEY ("expert_id") REFERENCES "expert_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_messages" ADD CONSTRAINT "contact_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
