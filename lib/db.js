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

  // await client.query('DROP TABLE posts');

  await client.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      author VARCHAR(64) NOT NULL,
      content VARCHAR NOT NULL,
      title VARCHAR(64) NOT NULL,
      date VARCHAR(64) NOT NULL,
      slug VARCHAR(64) NOT NULL
    );
  `);

  db = client;
}
