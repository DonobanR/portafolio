import express from 'express';
import { registerProjectEndpoints } from './endpoints/projects.js';
import { registerContactEndpoints } from './endpoints/contact.js';
import { applyMigrations } from './database/migrator.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export async function createServer() {
  await applyMigrations();

  const app = express();
  app.use(express.json());

  registerProjectEndpoints(app);
  registerContactEndpoints(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT ?? 3000;
  const app = await createServer();
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}
