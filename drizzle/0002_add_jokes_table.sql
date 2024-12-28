CREATE TABLE IF NOT EXISTS "jokes" (
  "id" SERIAL PRIMARY KEY,
  "setup" TEXT NOT NULL,
  "punchline" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "user_id" UUID NOT NULL
);