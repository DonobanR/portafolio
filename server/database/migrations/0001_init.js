import { projects } from '../../../shared/projects.js';

export const id = '0001_init';
export const name = 'Initial schema with projects and contact messages';

export async function up(orm) {
  const existingProjects = await orm.findMany('projects');
  if (existingProjects.length === 0) {
    for (const project of projects) {
      await orm.create('projects', {
        title: project.title,
        image: project.image ?? null,
        link: project.link,
        type: project.type
      });
    }
  }

  await orm.ready();
  if (!Array.isArray(orm.state.contactMessages)) {
    orm.state.contactMessages = [];
  }

  await orm.persist();
}
