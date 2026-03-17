-- AlterTable: profile_photo_url supports long values (e.g. base64 data URLs)
ALTER TABLE "expert_profiles" ALTER COLUMN "profile_photo_url" SET DATA TYPE TEXT;
