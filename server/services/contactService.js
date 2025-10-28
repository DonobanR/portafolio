import { JsonORM } from '../database/orm.js';
import { getDatabaseFilePath } from '../database/config.js';

let ormInstance;

function getOrm() {
  if (!ormInstance) {
    ormInstance = new JsonORM({ filePath: getDatabaseFilePath() });
  }
  return ormInstance;
}

export async function createContactMessage(data) {
  const orm = getOrm();
  return orm.create('contactMessages', data);
}
