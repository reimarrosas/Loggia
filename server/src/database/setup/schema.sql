BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS citext;

SELECT uuid_generate_v4();

COMMIT;