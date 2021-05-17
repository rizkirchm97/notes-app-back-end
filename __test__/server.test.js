const server = require('../src/server');

test('Should success with server connection', async () => {
  const option = {
    method: 'GET',
    url: '/',
  };
  const data = await server.inject(option);
  expect(data.statusCode).toBe(200);
});
