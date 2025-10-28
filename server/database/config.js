import path from 'node:path';

const DEFAULT_DATABASE_FILE = path.resolve('data', 'database.json');

export function getDatabaseFilePath() {
  const customPath = process.env.DATABASE_FILE;
  if (customPath) {
    return path.isAbsolute(customPath)
      ? customPath
      : path.resolve(process.cwd(), customPath);
  }

  return DEFAULT_DATABASE_FILE;
}
