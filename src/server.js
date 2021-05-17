/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const server = Hapi.server({
  port: 5000,
  host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.23.225',
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
