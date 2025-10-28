import { ZodError } from '../validation/zod.js';

export function notFoundHandler(request, response) {
  response.status(404).json({ error: 'Recurso no encontrado' });
}

export function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: 'Solicitud inválida',
      details: error.issues
    });
    return;
  }

  const statusCode = error.statusCode ?? error.status ?? 500;
  const body = {
    error: statusCode >= 500 ? 'Error interno del servidor' : error.message ?? 'Error inesperado'
  };

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json(body);
}
