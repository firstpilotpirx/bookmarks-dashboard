import { FastifyServerService } from './primary-adapters/fastify-server.service';

const main = async () => {
  const server = new FastifyServerService();
  return server.start();
};

main()
  .then((server) => {
    console.log(`Server started: ${server.host}:${server.port}/`);
  })
  .catch((error) => {
    console.log(error);
  });
