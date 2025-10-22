import express from 'express';
import { registerProjectEndpoints } from './endpoints/projects.js';

export function createServer() {
  const app = express();
  app.use(express.json());

  registerProjectEndpoints(app);

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT ?? 3000;
  const app = createServer();
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}
