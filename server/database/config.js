import { getEnvironment } from '../config/environment.js';

export function getDatabaseFilePath() {
  const { databaseFile } = getEnvironment();
  return databaseFile;
}
