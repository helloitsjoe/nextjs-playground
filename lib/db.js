const { Client } = require('pg');

let db;

export const getDB = () => db;

async function main() {
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
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(64) NOT NULL,
      hash VARCHAR(64) NOT NULL,
      token VARCHAR(64),
      expiration BIGINT
    );
  `);

  db = client;
  // const clientWithTable = await makeTable(client);
  // return makePgApi(clientWithTable);
  // console.log(`client:`, client);
}

main();
