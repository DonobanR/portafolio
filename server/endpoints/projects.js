import { Router } from 'express';
import { listProjects } from '../services/projectsService.js';

export function registerProjectEndpoints(app) {
  const router = Router();

  router.get('/', async (request, response, next) => {
    try {
      const projects = await listProjects();
      response.json({ projects });
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/projects', router);
}
