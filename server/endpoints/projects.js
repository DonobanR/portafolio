import { Router } from 'express';
import { listProjects } from '../services/projectsService.js';

export function registerProjectEndpoints(app) {
  const router = Router();

  router.get('/', (request, response) => {
    response.json({ projects: listProjects() });
  });

  app.use('/api/projects', router);
}
