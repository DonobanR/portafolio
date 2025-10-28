import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from './Projects.jsx';
import { projects } from '@shared/projects.js';

describe('Projects component', () => {
  it('agrupa proyectos personales y colaborativos', async () => {
    render(<Projects />);

    const personalList = await screen.findByRole('list', { name: /proyectos personales/i });
    const collaborationList = await screen.findByRole('list', { name: /proyectos colaborativos/i });

    const personalCards = within(personalList).getAllByRole('listitem');
    const collaborativeCards = within(collaborationList).getAllByRole('listitem');

    const expectedPersonal = projects.filter((project) => project.type === 'personal').length;
    const expectedCollaborative = projects.filter((project) => project.type !== 'personal').length;

    expect(personalCards).toHaveLength(expectedPersonal);
    expect(collaborativeCards).toHaveLength(expectedCollaborative);
  });

  it('muestra el encabezado principal accesible', () => {
    render(<Projects />);

    const heading = screen.getByRole('heading', { name: /proyectos destacados/i });
    expect(heading).toBeInTheDocument();
  });
});
