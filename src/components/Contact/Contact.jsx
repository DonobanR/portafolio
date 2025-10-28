import { useState } from 'react';
import styles from './Contact.module.css';

const contactMethods = [
  {
    title: 'Correo electrónico',
    description: 'Para propuestas laborales o colaboraciones directas.',
    href: 'mailto:donobanramon.dev@gmail.com',
    label: 'donobanramon.dev@gmail.com'
  },
  {
    title: 'LinkedIn',
    description: 'Conversemos sobre experiencia profesional y oportunidades.',
    href: 'https://www.linkedin.com/in/donoban-ramón-219ab5275/',
    label: 'Perfil de LinkedIn'
  },
  {
    title: 'GitHub',
    description: 'Explora repositorios y contribuciones de código abierto.',
    href: 'https://github.com/DonobanR',
    label: 'Perfil de GitHub'
  }
];

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');

    setStatus(`Gracias ${name || 'por tu mensaje'} ✨. Te responderé pronto.`);
    form.reset();
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <header className={styles.header}>
        <h2 id="contact-heading" className={styles.title}>
          Construyamos algo juntos
        </h2>
        <p className={styles.description}>
          ¿Tienes una idea o un reto técnico en mente? Estoy abierto a conversar sobre nuevos proyectos y colaboraciones.
        </p>
      </header>
      <div className={styles.grid}>
        {contactMethods.map((method) => (
          <article key={method.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{method.title}</h3>
            <p className={styles.cardDescription}>{method.description}</p>
            <a className={styles.contactLink} href={method.href} target="_blank" rel="noreferrer">
              {method.label}
            </a>
          </article>
        ))}
      </div>
      <form className={styles.form} onSubmit={handleSubmit} aria-label="Formulario de contacto">
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Nombre
          </label>
          <input className={styles.input} type="text" id="name" name="name" autoComplete="name" placeholder="Tu nombre" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Correo electrónico
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="tu@email.com"
            required
            aria-required="true"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="message">
            Mensaje
          </label>
          <textarea
            className={styles.textarea}
            id="message"
            name="message"
            rows="4"
            placeholder="¿En qué puedo ayudarte?"
            required
            aria-required="true"
          />
        </div>
        <button className={styles.submit} type="submit">
          Enviar mensaje
        </button>
        <span role="status" aria-live="polite">
          {status}
        </span>
      </form>
    </section>
  );
}
