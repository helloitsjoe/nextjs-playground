// Taken from https://dev.to/metamas/testing-next-js-api-routes-55g3
const { createServer } = require('http');
import { apiResolver } from 'next-server/dist/server/api-utils';
const { createHandler } = require('../get-posts');
const { seedDB } = require('../seed');
const axios = require('axios');

jest.mock('@prisma/client');

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

beforeEach(() => {
  server = null;
});

afterEach(done => {
  server.close(done);
});

describe('get-posts', () => {
  it('gets all posts (mocked)', async () => {
    const prisma = {
      post: {
        findMany: jest.fn().mockResolvedValue([{ title: 'foo' }]),
      },
    };
    server = createServer(createTestHandler(createHandler(prisma)));
    const url = await listen(server);
    const { data } = await axios.get(url);
    expect(data.posts).toEqual([{ title: 'foo' }]);
  });
});
