import fs from 'node:fs/promises';
import path from 'node:path';
import { getDatabaseFilePath } from './config.js';

const DEFAULT_STATE = {
  _meta: {
    appliedMigrations: [],
    sequences: {}
  }
};

export class JsonORM {
  constructor({ filePath } = {}) {
    this.filePath = filePath ?? getDatabaseFilePath();
    this.state = structuredClone(DEFAULT_STATE);
    this.loaded = false;
    this.loadPromise = null;
  }

  async load() {
    if (this.loaded) {
      return;
    }

    await fs.mkdir(path.dirname(this.filePath), { recursive: true });

    try {
      const raw = await fs.readFile(this.filePath, 'utf8');
      this.state = JSON.parse(raw);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.persist();
      } else {
        throw error;
      }
    }

    this.loaded = true;
  }

  async ready() {
    if (!this.loadPromise) {
      this.loadPromise = this.load();
    }
    await this.loadPromise;
  }

  async persist() {
    await fs.writeFile(this.filePath, JSON.stringify(this.state, null, 2));
  }

  async findMany(collectionName) {
    await this.ready();
    const collection = this.state[collectionName];
    if (!Array.isArray(collection)) {
      return [];
    }
    return collection.map((item) => ({ ...item }));
  }

  async create(collectionName, data) {
    await this.ready();
    if (!Array.isArray(this.state[collectionName])) {
      this.state[collectionName] = [];
    }

    const sequences = this.state._meta.sequences;
    const sequenceKey = `${collectionName}Id`;
    const nextId = (sequences[sequenceKey] ?? 0) + 1;
    sequences[sequenceKey] = nextId;

    const now = new Date().toISOString();
    const record = {
      id: nextId,
      createdAt: now,
      updatedAt: now,
      ...data
    };

    this.state[collectionName].push(record);
    await this.persist();

    return { ...record };
  }

  async upsert(collectionName, predicate, data) {
    await this.ready();
    if (!Array.isArray(this.state[collectionName])) {
      this.state[collectionName] = [];
    }

    const index = this.state[collectionName].findIndex(predicate);
    if (index === -1) {
      return this.create(collectionName, data);
    }

    const existing = this.state[collectionName][index];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.state[collectionName][index] = updated;
    await this.persist();
    return { ...updated };
  }

  async deleteMany(collectionName, predicate) {
    await this.ready();
    if (!Array.isArray(this.state[collectionName])) {
      return 0;
    }

    const original = this.state[collectionName];
    const remaining = original.filter((item) => !predicate(item));
    const removed = original.length - remaining.length;
    if (removed > 0) {
      this.state[collectionName] = remaining;
      await this.persist();
    }
    return removed;
  }

  async close() {
    this.loaded = false;
    this.loadPromise = null;
  }
}

export function structuredClone(value) {
  return JSON.parse(JSON.stringify(value));
}
