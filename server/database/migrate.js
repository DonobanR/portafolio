#!/usr/bin/env node
import process from 'node:process';
import { applyMigrations } from './migrator.js';
import { JsonORM } from './orm.js';
import { projects } from '../../shared/projects.js';
import { getDatabaseFilePath } from './config.js';

async function seedDatabase(filePath) {
  const orm = new JsonORM({ filePath });
  const existing = await orm.findMany('projects');

  for (const project of projects) {
    await orm.upsert(
      'projects',
      (item) => item.link === project.link,
      {
        title: project.title,
        image: project.image ?? null,
        link: project.link,
        type: project.type
      }
    );
  }

  // Ensure contact message collection exists
  await orm.ready();
  if (!Array.isArray(orm.state.contactMessages)) {
    orm.state.contactMessages = [];
    await orm.persist();
  }

  await orm.close();
}

async function main() {
  const args = process.argv.slice(2);
  const filePath = getDatabaseFilePath();
  await applyMigrations({ filePath });

  if (args.includes('--seed')) {
    await seedDatabase(filePath);
  }
}

main().catch((error) => {
  console.error('Error while running migrations');
  console.error(error);
  process.exitCode = 1;
});
