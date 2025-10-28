import { performance } from 'node:perf_hooks';
import { logger } from './logger.js';
import { recordRequest } from './metrics.js';

export function requestLogger() {
  return (request, response, next) => {
    const start = performance.now();

    response.on('finish', () => {
      const durationMs = performance.now() - start;
      const metadata = {
        method: request.method,
        path: request.originalUrl,
        statusCode: response.statusCode,
        durationMs
      };
      recordRequest({ statusCode: response.statusCode, durationMs });
      logger.info('HTTP request completed', metadata);
    });

    response.on('close', () => {
      if (!response.writableEnded) {
        const durationMs = performance.now() - start;
        logger.warn('HTTP request closed before completing', {
          method: request.method,
          path: request.originalUrl,
          durationMs
        });
      }
    });

    next();
  };
}
