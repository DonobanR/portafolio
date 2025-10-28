import styles from './About.module.css';
import profilePhoto from '../../assets/myPhoto/foto.webp';

const highlights = [
  { emoji: '🌍', label: 'Ubicación', value: 'Ecuador' },
  { emoji: '💼', label: 'Rol', value: 'Desarrollador de software' },
  { emoji: '💡', label: 'Enfoque', value: 'Aplicaciones web accesibles' }
];

const skillGroups = [
  {
    title: 'Lenguajes y frameworks',
    items: ['JavaScript', 'TypeScript', 'Java', 'React', 'Node.js']
  },
  {
    title: 'Bases de datos',
    items: ['PostgreSQL', 'MongoDB', 'MySQL']
  },
  {
    title: 'Herramientas',
    items: ['Docker', 'Git', 'Azure DevOps', 'Linux']
  }
];

export default function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.media}>
        <div className={styles.avatarWrapper}>
          <img
            src={profilePhoto}
            alt="Retrato de Donoban Ramón"
            className={styles.avatar}
            width="320"
            height="320"
            loading="lazy"
          />
        </div>
        <ul className={styles.badgeList}>
          {highlights.map((highlight) => (
            <li key={highlight.label} className={styles.badge}>
              <span aria-hidden="true">{highlight.emoji}</span>
              <span>
                <strong>{highlight.label}:</strong> {highlight.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <h2 id="about-heading" className={styles.heading}>
          Acerca de mí
        </h2>
        <p className={styles.paragraph}>
          Soy estudiante de ingeniería de software y me apasiona construir productos digitales con intención. Creo en
          interfaces inclusivas, escalables y pensadas para las personas, y disfruto liderar proyectos que conectan
          tecnología con experiencias significativas.
        </p>
        <div className={styles.skillsGrid}>
          {skillGroups.map((group) => (
            <div key={group.title} className={styles.skillGroup}>
              <span className={styles.skillTitle}>{group.title}</span>
              <div className={styles.skillChips}>
                {group.items.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
