-- Profil fotoğrafı base64 data URL olarak saklanabiliyor; VARCHAR(255) yetersiz.
ALTER TABLE "expert_profiles" ALTER COLUMN "profile_photo_url" SET DATA TYPE TEXT;
