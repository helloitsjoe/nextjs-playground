const { createServer } = require('http');
import { apiResolver } from 'next-server/dist/server/api-utils';
const { createHandler } = require('../get-posts');
const { seedDB } = require('../seed');
const { getDB } = require('../../../lib/db');
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
let db;

beforeEach(async () => {
  // TODO: Avoid this singleton?
  db = await getDB();
  server = null;
});

afterEach(async () => {
  await db.end();
  server.close();
});

describe('integration tests', () => {
  it('gets all posts (DB)', async () => {
    // TODO: Create test DB with .env.test
    await seedDB();
    server = createServer(createTestHandler(createHandler()));
    const url = await listen(server);
    const { data } = await axios.get(url);
    expect(data.posts).toEqual([
      {
        authorId: expect.any(Number),
        content: 'This is some test content',
        createdAt: expect.any(String),
        id: expect.any(Number),
        published: false,
        title: 'Test Title',
        updatedAt: expect.any(String),
      },
    ]);
  });
});
