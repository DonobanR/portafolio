import { projects } from '../../shared/projects.js';

function resolveProjectImage(imageFileName) {
  return new URL(`../assets/proyectos/${imageFileName}`, import.meta.url).href;
}

function createProjectCard(project) {
  const container = document.createElement('article');
  container.classList.add('proyecto');

  const image = document.createElement('img');
  image.src = resolveProjectImage(project.image);
  image.alt = `Imagen del proyecto ${project.title}`;

  const title = document.createElement('h3');
  title.textContent = project.title;

  const link = document.createElement('a');
  link.href = project.link;
  link.textContent = 'Abrir';
  link.classList.add('btn-abrir');
  link.target = '_blank';
  link.rel = 'noreferrer noopener';

  container.append(image, title, link);
  return container;
}

export function initProjects() {
  const personalContainer = document.getElementById('proyecto-personal');
  const participationContainer = document.getElementById('proyecto-participe');

  if (!personalContainer || !participationContainer) {
    return;
  }

  personalContainer.innerHTML = '';
  participationContainer.innerHTML = '';

  projects.forEach((project) => {
    const projectCard = createProjectCard(project);
    if (project.type === 'personal') {
      personalContainer.append(projectCard);
    } else {
      participationContainer.append(projectCard);
    }
  });
}
