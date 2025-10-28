import { Router } from 'express';
import os from 'node:os';
import { getEnvironment } from '../config/environment.js';
import { getMetricsSnapshot } from '../observability/metrics.js';

export function registerHealthEndpoints(app) {
  const router = Router();

  router.get('/', (request, response) => {
    const environment = getEnvironment();
    response.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: environment.nodeEnv,
      metrics: getMetricsSnapshot(),
      system: {
        memory: {
          free: os.freemem(),
          total: os.totalmem()
        },
        loadAverage: os.loadavg()
      }
    });
  });

  app.use('/health', router);
}
