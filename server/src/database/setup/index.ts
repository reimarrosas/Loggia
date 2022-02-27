import pg from 'pg-promise'

const pgp = pg();

export const db = pgp(process.env['DB_URL'] ?? 'postgres://reimar:reimar@localhost/loggia')
