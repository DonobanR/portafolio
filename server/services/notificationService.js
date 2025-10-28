import { getEnvironment } from '../config/environment.js';
import { logger } from '../observability/logger.js';

export async function notifyContactMessage(message) {
  const { contactWebhookUrl } = getEnvironment();
  if (!contactWebhookUrl) {
    logger.debug('Contacto recibido sin webhook configurado');
    return;
  }

  try {
    const response = await fetch(contactWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'contact_message.created',
        data: message
      })
    });

    if (!response.ok) {
      logger.warn('El webhook de contacto respondió con un estado no exitoso', {
        status: response.status,
        statusText: response.statusText
      });
    }
  } catch (error) {
    logger.error('No fue posible notificar el mensaje de contacto', {
      error: error.message
    });
  }
}
