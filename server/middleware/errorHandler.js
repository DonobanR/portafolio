import { ZodError } from '../validation/zod.js';
import { logger } from '../observability/logger.js';
import { recordError } from '../observability/metrics.js';

export function notFoundHandler(request, response) {
  logger.warn('Ruta no encontrada', {
    method: request.method,
    path: request.originalUrl
  });
  response.status(404).json({ error: 'Recurso no encontrado' });
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    const statusCode = 400;
    logger.warn('Error de validación al procesar la solicitud', {
      method: request.method,
      path: request.originalUrl,
      issues: error.issues
    });
    recordError(error, {
      statusCode,
      context: { method: request.method, path: request.originalUrl }
    });

    response.status(statusCode).json({
      error: 'Solicitud inválida',
      details: error.issues
    });
    return;
  }

  const statusCode = error.statusCode ?? error.status ?? 500;
  const isCritical = statusCode >= 500;
  const body = {
    error: isCritical ? 'Error interno del servidor' : error.message ?? 'Error inesperado'
  };

  recordError(error, {
    statusCode,
    context: { method: request.method, path: request.originalUrl }
  });

  if (isCritical) {
    logger.error('Error inesperado al procesar la solicitud', {
      method: request.method,
      path: request.originalUrl,
      statusCode,
      error: error.message,
      stack: error.stack
    });
  } else {
    logger.warn('Solicitud fallida', {
      method: request.method,
      path: request.originalUrl,
      statusCode,
      error: error.message
    });
  }

  response.status(statusCode).json(body);
}
