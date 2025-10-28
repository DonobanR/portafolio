import { Suspense, lazy } from 'react';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import styles from './App.module.css';

const Projects = lazy(() => import('./components/Projects/Projects.jsx'));
const Contact = lazy(() => import('./components/Contact/Contact.jsx'));

function SectionFallback({ title }) {
  return (
    <section className={styles.sectionFallback} aria-busy="true" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p>Cargando {title}…</p>
    </section>
  );
}

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.app}>
      <Hero />
      <main id="main-content" className={styles.main}>
        <About />
        <Suspense fallback={<SectionFallback title="proyectos" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback title="la sección de contacto" />}>
          <Contact />
        </Suspense>
      </main>
      <footer className={styles.footer}>
        <p>© {currentYear} Donoban Ramón. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
