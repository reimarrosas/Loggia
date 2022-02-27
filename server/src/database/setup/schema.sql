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

INSERT INTO
  users (
    user_name,
    user_email,
    user_password,
    is_verified
  )
VALUES
  (
    'Reimar Rosas',
    'reimarrosas0208@gmail.com',
    '$2a$10$AyaPIa7c4r5XL2eBz9UxFOSPBqRuOWlxCrUx5sN1efpRwIeDOTBdy',
    TRUE
  );

COMMIT;