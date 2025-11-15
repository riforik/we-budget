// /api/_db.js
import { Client } from 'pg';

export function createClient() {
  return new Client({
    connectionString: process.env['webudget_POSTGRES_URL'],
  });
}
