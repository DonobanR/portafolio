import path from 'node:path';

const LOG_LEVELS = new Set(['error', 'warn', 'info', 'debug']);

function resolvePort(value) {
  const parsed = Number.parseInt(value ?? '', 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return 3000;
  }
  return parsed;
}

function resolveLogLevel(value) {
  const normalized = (value ?? 'info').toLowerCase();
  if (!LOG_LEVELS.has(normalized)) {
    return 'info';
  }
  return normalized;
}

function resolveDatabaseFile(value) {
  if (!value) {
    return path.resolve('data', 'database.json');
  }

  return path.isAbsolute(value) ? value : path.resolve(process.cwd(), value);
}

export function getEnvironment() {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const port = resolvePort(process.env.PORT);
  const logLevel = resolveLogLevel(process.env.LOG_LEVEL);
  const databaseFile = resolveDatabaseFile(process.env.DATABASE_FILE);
  const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL ?? '';

  return {
    nodeEnv,
    port,
    logLevel,
    databaseFile,
    contactWebhookUrl
  };
}
