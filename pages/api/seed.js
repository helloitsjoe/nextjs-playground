const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const seedDB = async () => {
  await prisma.profile.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: 'Hi There',
      email: 'foo@test.com',
    },
  });

  await prisma.post.create({
    data: {
      title: 'Test Title',
      content: 'This is some test content',
      author: {
        connect: {
          email: 'foo@test.com',
        },
      },
    },
  });
};
