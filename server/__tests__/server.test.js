import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from '../index.js';
import { applyMigrations } from '../database/migrator.js';
import { JsonORM } from '../database/orm.js';

const TEST_DATABASE_PATH = path.resolve('data', 'test-database.json');
process.env.DATABASE_FILE = TEST_DATABASE_PATH;

let httpServer;
let baseUrl;

beforeAll(async () => {
  await fs.rm(TEST_DATABASE_PATH, { force: true });
  await applyMigrations({ filePath: TEST_DATABASE_PATH });

  const app = await createServer();
  httpServer = app.listen(0);
  await new Promise((resolve) => httpServer.once('listening', resolve));
  const { port } = httpServer.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  if (httpServer) {
    await new Promise((resolve) => httpServer.close(resolve));
  }
  await fs.rm(TEST_DATABASE_PATH, { force: true });
});

describe('GET /api/projects', () => {
  it('devuelve la lista de proyectos', async () => {
    const response = await fetch(`${baseUrl}/api/projects`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.projects)).toBe(true);
    expect(body.projects.length).toBeGreaterThan(0);
    expect(body.projects[0]).toHaveProperty('title');
  });
});

describe('POST /api/contact', () => {
  it('crea un nuevo mensaje de contacto cuando los datos son válidos', async () => {
    const payload = {
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      message: 'Estoy interesado en colaborar en un nuevo proyecto.'
    };

    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.contactMessage).toMatchObject(payload);

    const verificationOrm = new JsonORM({ filePath: TEST_DATABASE_PATH });
    const messages = await verificationOrm.findMany('contactMessages');
    expect(messages.some((message) => message.email === payload.email)).toBe(true);
  });

  it('retorna un error de validación cuando faltan campos obligatorios', async () => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'correo-no-valido', message: 'hola' })
    });

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('details');
    expect(Array.isArray(body.details)).toBe(true);
  });
});

describe('Rutas no encontradas', () => {
  it('responde con 404 cuando la ruta no existe', async () => {
    const response = await fetch(`${baseUrl}/api/unknown`);
    expect(response.status).toBe(404);
  });
});
