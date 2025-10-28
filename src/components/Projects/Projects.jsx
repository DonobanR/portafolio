import { useEffect, useMemo, useState } from 'react';
import styles from './Projects.module.css';
import { projects } from '@shared/projects.js';

const projectImages = import.meta.glob('../../assets/proyectos/*.webp');

function ProjectCard({ project }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const key = `../../assets/proyectos/${project.image}`;
    const importImage = projectImages[key];

    if (importImage) {
      importImage()
        .then((module) => {
          if (isMounted) {
            setImageSrc(module.default);
          }
        })
        .catch(() => {
          if (isMounted) {
            setImageSrc(null);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [project.image]);

  return (
    <li className={styles.card}>
      <div className={styles.cardImageWrapper}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={project.title}
            className={styles.cardImage}
            loading="lazy"
            width="480"
            height="300"
          />
        )}
      </div>
      <div className={styles.cardContent}>
        <span className={styles.tag} aria-label={`Tipo de proyecto: ${project.type}`}>
          {project.type === 'personal' ? 'Personal' : 'Colaborativo'}
        </span>
        <h4 className={styles.cardTitle}>{project.title}</h4>
        <a className={styles.cardLink} href={project.link} target="_blank" rel="noreferrer">
          Ver en GitHub
        </a>
      </div>
    </li>
  );
}

export default function Projects() {
  const groups = useMemo(
    () => [
      {
        key: 'personal',
        title: 'Proyectos personales',
        description: 'Ideas que nacen de la curiosidad y que evolucionan con cada iteración.',
        filter: (project) => project.type === 'personal'
      },
      {
        key: 'collaboration',
        title: 'Proyectos colaborativos',
        description: 'Iniciativas donde el trabajo en equipo se transforma en soluciones escalables.',
        filter: (project) => project.type !== 'personal'
      }
    ],
    []
  );

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-heading">
      <header className={styles.header}>
        <h2 id="projects-heading" className={styles.title}>
          Proyectos destacados
        </h2>
        <p className={styles.description}>
          Una selección de experiencias construidas con React, Node.js, bases de datos modernas y las mejores prácticas de
          accesibilidad.
        </p>
      </header>
      <div className={styles.projectsWrapper}>
        {groups.map((group) => {
          const scopedProjects = projects.filter(group.filter);

          if (scopedProjects.length === 0) {
            return null;
          }

          return (
            <section key={group.key} className={styles.group} aria-labelledby={`${group.key}-projects-title`}>
              <div className={styles.groupHeader}>
                <h3 id={`${group.key}-projects-title`} className={styles.groupTitle}>
                  {group.title}
                </h3>
                <p className={styles.groupDescription}>{group.description}</p>
              </div>
              <ul className={styles.cardList} aria-label={group.title}>
                {scopedProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
