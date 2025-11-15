// /api/_db.js
const { Client } = require('pg');

function createClient() {
  return new Client({
    connectionString: process.env['webudget_POSTGRES_URL'],
    ssl: { rejectUnauthorized: false },
  });
}

module.exports = { createClient };