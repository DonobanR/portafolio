import { getEnvironment } from '../config/environment.js';

const LEVEL_PRIORITY = new Map([
  ['error', 0],
  ['warn', 1],
  ['info', 2],
  ['debug', 3]
]);

function shouldLog(level) {
  const { logLevel } = getEnvironment();
  const activeLevelPriority = LEVEL_PRIORITY.get(logLevel) ?? LEVEL_PRIORITY.get('info');
  const messagePriority = LEVEL_PRIORITY.get(level) ?? LEVEL_PRIORITY.get('info');
  return messagePriority <= activeLevelPriority;
}

function emit(level, message, metadata) {
  if (!shouldLog(level)) {
    return;
  }

  const timestamp = new Date().toISOString();
  const payload = { level, timestamp, message, ...normalizeMetadata(metadata) };
  const serialized = JSON.stringify(payload);

  if (level === 'error') {
    console.error(serialized);
  } else if (level === 'warn') {
    console.warn(serialized);
  } else {
    console.log(serialized);
  }
}

function normalizeMetadata(metadata) {
  if (!metadata) {
    return {};
  }

  if (metadata instanceof Error) {
    return { error: metadata.message, stack: metadata.stack };
  }

  if (typeof metadata === 'object') {
    return { metadata };
  }

  return { metadata };
}

export const logger = {
  error(message, metadata) {
    emit('error', message, metadata);
  },
  warn(message, metadata) {
    emit('warn', message, metadata);
  },
  info(message, metadata) {
    emit('info', message, metadata);
  },
  debug(message, metadata) {
    emit('debug', message, metadata);
  }
};
