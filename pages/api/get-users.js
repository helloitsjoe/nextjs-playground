// const { getDB } = require('../../lib/db');
const { PrismaClient } = require('@prisma/client');

export const createHandler = (prisma = new PrismaClient()) => {
  return async (req, res) => {
    // const db = await getOrCreateDB();

    // const posts = await db.query('SELECT * FROM posts');

    const users = await prisma.user.findMany();

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
    res.status(200).send({ users });
  };
};

export default createHandler();
