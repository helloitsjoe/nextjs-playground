const { Client } = require('pg');

let db;

export async function getDB() {
  await initDB();
  return db;
}

async function initDB() {
  if (db) {
    return db;
  }
  const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;
  const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}`;
  const client = new Client({ connectionString });
  await client.connect();
  console.log(`Connected to DB...`);

  const dbCheck = await client.query(
    `SELECT FROM pg_database WHERE datname = 'nextjs'`
  );

  if (!dbCheck.rowCount) {
    console.log('Creating DB...');
    await client.query(`CREATE DATABASE nextjs;`);
  }

  await client.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      author VARCHAR(64) NOT NULL,
      content VARCHAR(64),
      title VARCHAR(64),
      date VARCHAR(64)
    );
  `);

  db = client;
}
