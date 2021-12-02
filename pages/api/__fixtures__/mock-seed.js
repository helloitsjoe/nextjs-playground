const { PrismaClient } = require('@prisma/client');
const { users, posts } = require('./mock-data');

const prisma = new PrismaClient();

const seedDB = async () => {
  await prisma.profile.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await Promise.all(
    users.map(async ({ name, email }) => {
      await prisma.user.create({
        data: {
          name,
          email,
        },
      });
    })
  );

  await Promise.all(
    posts.map(async ({ id, slug, date, title, content }) => {
      await prisma.post.create({
        data: {
          slug,
          title,
          content,
          author: {
            connect: {
              email: users[0].email,
            },
          },
        },
      });
    })
  );

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
