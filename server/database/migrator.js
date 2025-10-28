import fs from 'node:fs/promises';
import path from 'node:path';
import { getDatabaseFilePath } from './config.js';
import { JsonORM, structuredClone } from './orm.js';

const MIGRATIONS_DIRECTORY = new URL('./migrations/', import.meta.url);

async function loadMigrationModules() {
  const entries = await fs.readdir(MIGRATIONS_DIRECTORY, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
    .map((entry) => entry.name)
    .sort();

  const migrations = [];
  for (const file of files) {
    const module = await import(new URL(file, MIGRATIONS_DIRECTORY));
    if (!module.id || typeof module.up !== 'function') {
      throw new Error(`Migration ${file} is missing required exports`);
    }
    migrations.push({ id: module.id, name: module.name ?? module.id, up: module.up });
  }

  return migrations;
}

export async function applyMigrations({ filePath } = {}) {
  const targetFile = filePath ?? getDatabaseFilePath();
  await fs.mkdir(path.dirname(targetFile), { recursive: true });

  let currentState;
  try {
    const raw = await fs.readFile(targetFile, 'utf8');
    currentState = JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      currentState = { _meta: { appliedMigrations: [], sequences: {} } };
    } else {
      throw error;
    }
  }

  if (!currentState._meta) {
    currentState._meta = { appliedMigrations: [], sequences: {} };
  }
  if (!Array.isArray(currentState._meta.appliedMigrations)) {
    currentState._meta.appliedMigrations = [];
  }
  if (!currentState._meta.sequences) {
    currentState._meta.sequences = {};
  }

  const applied = new Set(currentState._meta.appliedMigrations);
  const migrations = await loadMigrationModules();

  const orm = new JsonORM({ filePath: targetFile });
  orm.state = structuredClone(currentState);
  orm.loaded = true;

  for (const migration of migrations) {
    if (applied.has(migration.id)) {
      continue;
    }
    await migration.up(orm);
    applied.add(migration.id);
  }

  orm.state._meta.appliedMigrations = Array.from(applied);
  await orm.persist();
  await orm.close();
}
