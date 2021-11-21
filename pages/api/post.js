const { getDB } = require('../../lib/db');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { author, title, date, content, slug } = req.body;
    console.log('posting...');
    const db = await getDB();

    await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: 'foo@bar.com',
          },
        },
      },
    });

    // const query =
    //   'INSERT INTO posts(author, title, date, content, slug) VALUES($1, $2, $3, $4, $5) RETURNING *';
    // const values = [author, title, date, content, slug];
    // console.log(`values:`, values);
    // const posts = await db.query(query, values);
    // console.log(`posts:`, posts);
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ message: 'Not supported' });
  }
}
