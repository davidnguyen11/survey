import express from 'express';
import next from 'next';

import routes from '../src/routes';

const port = parseInt(process.env.PORT || '3002', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  server.use(handle);
  server.listen(port);

  // tslint:disable-next-line:no-console
  console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
