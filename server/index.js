import express from 'express';
import { registerProjectEndpoints } from './endpoints/projects.js';
import { registerContactEndpoints } from './endpoints/contact.js';
import { registerHealthEndpoints } from './endpoints/health.js';
import { applyMigrations } from './database/migrator.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './observability/requestLogger.js';
import { getEnvironment } from './config/environment.js';
import { logger } from './observability/logger.js';

export async function createServer() {
  await applyMigrations();

  const app = express();
  app.use(express.json());
  app.use(requestLogger());

  registerHealthEndpoints(app);
  registerProjectEndpoints(app);
  registerContactEndpoints(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

if (process.env.NODE_ENV !== 'test') {
  const environment = getEnvironment();
  const app = await createServer();
  app.listen(environment.port, () => {
    logger.info(`Servidor escuchando en el puerto ${environment.port}`, {
      environment: environment.nodeEnv
    });
  });
}
