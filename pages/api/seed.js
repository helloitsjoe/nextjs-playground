const { PrismaClient } = require('@prisma/client');
const { getSortedPostsData } = require('../../lib/posts');

const prisma = new PrismaClient();

const seedDB = async () => {
  await prisma.profile.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Hi There',
      email: 'foo@test.com',
    },
  });

  const posts = await getSortedPostsData();
  console.log(`posts:`, posts);

  for (const { id, date, title, content } of posts) {
    await prisma.post.create({
      data: {
        slug: id,
        createdAt: new Date(date),
        title,
        content,
        author: {
          connect: {
            email: 'foo@test.com',
          },
        },
      },
    });
  }
  // await prisma.post.create({
  //   data: {
  //     title: 'Test Title',
  //     content: 'This is some test content',
  //     author: {
  //       connect: {
  //         email: 'foo@test.com',
  //       },
  //     },
  //   },
  // });
};

module.exports = { seedDB };
