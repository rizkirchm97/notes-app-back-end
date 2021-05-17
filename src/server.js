/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 5000,
  host: 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});

server.route(routes);

const init = async () => {
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

init();

module.exports = server;
