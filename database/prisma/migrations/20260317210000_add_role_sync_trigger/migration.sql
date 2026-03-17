-- Trigger: users tablosunda role değiştiğinde ilgili tablolara otomatik kayıt oluştur

CREATE OR REPLACE FUNCTION sync_role_related_tables()
RETURNS trigger AS $$
BEGIN
  -- Eski rol expert idi, yeni rol expert değilse: expert_profiles kaydını sil
  IF OLD.role = 'expert' AND NEW.role != 'expert' THEN
    DELETE FROM "expert_profiles" WHERE "user_id" = NEW.id;
  END IF;

  -- Eski rol admin idi, yeni rol admin değilse: admins kaydını sil
  IF OLD.role = 'admin' AND NEW.role != 'admin' THEN
    DELETE FROM "admins" WHERE "user_id" = NEW.id;
  END IF;

  -- Yeni rol expert ise: expert_profiles kaydı yoksa oluştur
  IF NEW.role = 'expert' THEN
    INSERT INTO "expert_profiles" ("user_id")
    SELECT NEW.id
    WHERE NOT EXISTS (
      SELECT 1 FROM "expert_profiles" WHERE "user_id" = NEW.id
    );
  END IF;

  -- Yeni rol admin ise: admins kaydı yoksa oluştur
  IF NEW.role = 'admin' THEN
    INSERT INTO "admins" ("user_id")
    SELECT NEW.id
    WHERE NOT EXISTS (
      SELECT 1 FROM "admins" WHERE "user_id" = NEW.id
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_role_sync ON "users";

CREATE TRIGGER users_role_sync
AFTER UPDATE OF "role" ON "users"
FOR EACH ROW
EXECUTE FUNCTION sync_role_related_tables();
