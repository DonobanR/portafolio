import { JsonORM } from '../database/orm.js';
import { getDatabaseFilePath } from '../database/config.js';
import { logger } from '../observability/logger.js';
import { notifyContactMessage } from './notificationService.js';

let ormInstance;

function getOrm() {
  if (!ormInstance) {
    ormInstance = new JsonORM({ filePath: getDatabaseFilePath() });
  }
  return ormInstance;
}

export async function createContactMessage(data) {
  const orm = getOrm();
  const contactMessage = await orm.create('contactMessages', data);

  logger.info('Nuevo mensaje de contacto recibido', {
    email: contactMessage.email,
    contactId: contactMessage.id
  });

  await notifyContactMessage(contactMessage);

  return contactMessage;
}
