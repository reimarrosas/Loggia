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

CREATE TABLE IF NOT EXISTS logs (
  log_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  log_date TEXT NOT NULL,
  log_title TEXT,
  logbook_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT LOCALTIMESTAMP,
  updated_at TIMESTAMP DEFAULT LOCALTIMESTAMP,
  FOREIGN KEY (logbook_id) REFERENCES logbooks (logbook_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS entries (
  entry_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  entry_time TIME NOT NULL,
  entry_text TEXT NOT NULL,
  entry_type TEXT CHECK (entry_type IN ('decision', 'event')),
  log_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT LOCALTIMESTAMP,
  updated_at TIMESTAMP DEFAULT LOCALTIMESTAMP,
  FOREIGN KEY (log_id) REFERENCES logs (log_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS share_links (
  share_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  logbook_id BIGINT NOT NULL,

  FOREIGN KEY (logbook_id) REFERENCES logbooks (logbook_id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX idx_users_email ON users (user_email);

COMMIT;