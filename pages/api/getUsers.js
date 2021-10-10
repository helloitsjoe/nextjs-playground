const { getDB } = require('../../lib/db');

export default async function handler(req, res) {
  const db = getDB();
  if (!db) {
    console.log('DB not ready...');
    res.status(500).send({});
    return;
  }
  const users = await db.query('SELECT * FROM users');
  res.status(200).send({ users });
}
