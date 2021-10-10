const { getDB } = require('../../lib/db');

export default async function handler(req, res) {
  const db = await getDB();
  const posts = await db.query('SELECT * FROM posts');
  res.status(200).send({ posts });
}
