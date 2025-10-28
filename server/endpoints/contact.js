import { Router } from 'express';
import { createContactMessage } from '../services/contactService.js';
import { contactMessageSchema } from '../validation/contactSchemas.js';

export function registerContactEndpoints(app) {
  const router = Router();

  router.post('/', async (request, response, next) => {
    try {
      const payload = contactMessageSchema.parse(request.body ?? {});
      const contactMessage = await createContactMessage(payload);
      response.status(201).json({ contactMessage });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/contact', router);
}
