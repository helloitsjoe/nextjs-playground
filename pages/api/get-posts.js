const { getDB } = require('../../lib/db');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const db = await getDB();

  // const posts = await db.query('SELECT * FROM posts');

  const posts = await prisma.post.findMany();

  // await prisma.user.create({
  //   data: {
  //     name: 'Joe',
  //     email: 'foo@bar.com',
  //     posts: {
  //       create: {
  //         title: 'A Whole New Post',
  //         content: 'Just learning to do a few new things!',
  //         // slug: 'a-whole-new-post',
  //       },
  //     },
  //   },
  // });
  res.status(200).send({ posts });
}
