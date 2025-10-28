import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import heroVideo from '../../assets/cabecera/cabecera.mp4';

const navigation = [
  { href: '#about', label: 'Acerca de mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#contact', label: 'Contacto' }
];

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    let observer;

    const loadVideoSource = () => {
      if (video.dataset.loaded === 'true') {
        return;
      }

      video.src = heroVideo;
      video.load();
      video.dataset.loaded = 'true';
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadVideoSource();
              observer?.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(video);
    } else {
      loadVideoSource();
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return (
    <header className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.backgroundVideo}
        playsInline
        autoPlay
        muted
        loop
        preload="metadata"
        aria-hidden="true"
      />
      <div className={styles.overlay}>
        <nav className={styles.nav} aria-label="Navegación principal">
          <span className={styles.brand}>Donoban Ramón</span>
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a className={styles.navLink} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.content}>
          <p className={styles.lead}>Desarrollador de software especializado en experiencias web envolventes.</p>
          <h1 className={styles.title}>Construyendo soluciones digitales con intención y accesibilidad</h1>
          <p className={styles.subtitle}>
            Cada proyecto es una oportunidad para crear interfaces elegantes, optimizadas y pensadas para las personas.
          </p>
          <div className={styles.ctaGroup}>
            <a className={styles.primaryCta} href="#projects">
              Ver proyectos
            </a>
            <a className={styles.secondaryCta} href="#contact" aria-label="Ir a la sección de contacto">
              Hablemos
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
