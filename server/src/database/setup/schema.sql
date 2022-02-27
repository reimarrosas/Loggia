BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS citext;

CREATE DOMAIN email AS citext CHECK (
  value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
);

CREATE TABLE IF NOT EXISTS users (
  user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email email UNIQUE NOT NULL,
  user_password TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS logbooks (
  logbook_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  logbook_name TEXT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT LOCALTIMESTAMP,
  updated_at TIMESTAMP DEFAULT LOCALTIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_users_email ON users (user_email);

COMMIT;