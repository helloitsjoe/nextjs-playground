const { createServer } = require('http');
const { apiResolver } = require('next-server/dist/server/api-utils');
const { createHandler } = require('../get-posts');
const { seedDB } = require('../__fixtures__/mock-seed');
const axios = require('axios');

const listen = server => {
  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(0, 'localhost', () => {
      const { port } = server.address();
      resolve(`http://localhost:${port}`);
    });
  });
};

const createTestHandler = handler => (req, res) => {
  return apiResolver(req, res, undefined, handler);
};

let server;

beforeEach(async () => {
  server = null;
});

afterEach(async () => {
  server.close();
});

describe('integration tests', () => {
  it('gets all posts (DB)', async () => {
    await seedDB();
    server = createServer(createTestHandler(createHandler()));
    const url = await listen(server);
    const { data } = await axios.get(url);
    expect(data.posts).toContainEqual({
      authorId: expect.any(Number),
      content: 'Autobots are the best.',
      createdAt: expect.any(String),
      id: expect.any(Number),
      slug: 'transformers-rule',
      published: false,
      title: 'Transformers rule!',
      updatedAt: expect.any(String),
    });
    expect(data.posts).toContainEqual({
      authorId: expect.any(Number),
      content: 'A post about apples',
      createdAt: expect.any(String),
      id: expect.any(Number),
      slug: 'apples-are-yum',
      published: false,
      title: 'Apples are yum',
      updatedAt: expect.any(String),
    });
  });
});
