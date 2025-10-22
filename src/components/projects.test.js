import { beforeEach, describe, expect, it } from 'vitest';
import { initProjects } from './projects.js';
import { projects } from '../../shared/projects.js';

describe('initProjects', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="proyecto-personal"></div>
      <div id="proyecto-participe"></div>
    `;
  });

  it('renderiza los proyectos en las secciones correctas', () => {
    initProjects();

    const personalProjects = document.querySelectorAll('#proyecto-personal .proyecto');
    const participationProjects = document.querySelectorAll('#proyecto-participe .proyecto');

    const expectedPersonal = projects.filter((project) => project.type === 'personal').length;
    const expectedParticipation = projects.filter((project) => project.type !== 'personal').length;

    expect(personalProjects).toHaveLength(expectedPersonal);
    expect(participationProjects).toHaveLength(expectedParticipation);
  });

  it('limpia el contenido previo antes de renderizar nuevamente', () => {
    const personalContainer = document.getElementById('proyecto-personal');
    const participationContainer = document.getElementById('proyecto-participe');

    personalContainer.innerHTML = '<p>contenido previo</p>';
    participationContainer.innerHTML = '<p>contenido previo</p>';

    initProjects();

    expect(personalContainer.querySelector('p')).toBeNull();
    expect(participationContainer.querySelector('p')).toBeNull();
  });
});
