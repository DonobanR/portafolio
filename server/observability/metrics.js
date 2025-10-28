const metricsState = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalResponseTimeMs: 0,
  handledErrors: 0,
  criticalErrors: 0,
  lastError: null
};

export function recordRequest({ statusCode, durationMs }) {
  metricsState.totalRequests += 1;
  metricsState.totalResponseTimeMs += durationMs;

  if (statusCode >= 500) {
    metricsState.failedRequests += 1;
  } else {
    metricsState.successfulRequests += 1;
  }
}

export function recordError(error, { statusCode, context } = {}) {
  metricsState.handledErrors += 1;
  if (statusCode >= 500) {
    metricsState.criticalErrors += 1;
  }

  metricsState.lastError = {
    message: error?.message ?? 'Error desconocido',
    statusCode,
    context,
    timestamp: new Date().toISOString()
  };
}

export function getMetricsSnapshot() {
  const averageResponseTimeMs =
    metricsState.totalRequests === 0
      ? 0
      : metricsState.totalResponseTimeMs / metricsState.totalRequests;

  return {
    totalRequests: metricsState.totalRequests,
    successfulRequests: metricsState.successfulRequests,
    failedRequests: metricsState.failedRequests,
    handledErrors: metricsState.handledErrors,
    criticalErrors: metricsState.criticalErrors,
    averageResponseTimeMs,
    lastError: metricsState.lastError
  };
}

export function resetMetrics() {
  metricsState.totalRequests = 0;
  metricsState.successfulRequests = 0;
  metricsState.failedRequests = 0;
  metricsState.totalResponseTimeMs = 0;
  metricsState.handledErrors = 0;
  metricsState.criticalErrors = 0;
  metricsState.lastError = null;
}
