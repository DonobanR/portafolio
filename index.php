<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Portafolio</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Mi Portafolio</h1>
    <nav>
      <ul>
        <li><a href="#acerca-de-mi">Acerca de mí</a></li>
        <li><a href="#proyectos">Proyectos</a></li>
        <li><a href="#certificaciones">Certificaciones</a></li>
      </ul>
    </nav>
  </header>

  <section id="acerca-de-mi">
    <h2>Acerca de mí</h2>
    <p> Soy Donoban Ramon, estudiante en ingeniería de software en la Escuela Politécnica
        Nacional de Ecuador, aporto una sólida base en habilidades
        técnicas y analíticas. Mi formación incluye la graduación como
        técnico en servicios contables en la Escuela Augusto Arias, lo
        que me ha dotado de habilidades versátiles y la capacidad de
        gestionar múltiples tareas de manera eficiente. Tengo
        experiencia en entornos de trabajo dinámicos que valoran el
        compromiso y el trabajo en equipo, y soy reconocido por mi
        proactividad y entusiasmo.</p>
  </section>

  <section id="proyectos">
    <h2>Proyectos</h2>
    <p>Aquí puedes ver algunos de los proyectos en los que he trabajado. Los proyectos se extraen directamente desde mi repositorio en GitHub:</p>
    <ul id="repos"></ul>
  </section>

  <section id="certificaciones">
    <h2>Certificaciones</h2>
    <ul>
      <li>Certificación en Desarrollo Web - [Plataforma]</li>
      <li>Introducción a DevOps - [Plataforma]</li>
      <li>Fundamentos de Programación - [Plataforma]</li>
    </ul>
  </section>

  <footer>
    <p>&copy; 2024 Mi Portafolio. Todos los derechos reservados.</p>
  </footer>

  <script>
    // Reemplaza 'tu-usuario' con tu nombre de usuario de GitHub
    const githubUser = 'tu-usuario';

    fetch(`https://api.github.com/users/${githubUser}/repos`)
      .then(response => response.json())
      .then(data => {
        const reposList = document.getElementById('repos');
        data.forEach(repo => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
          reposList.appendChild(li);
        });
      })
      .catch(error => console.error('Error al obtener los repositorios:', error));
  </script>
</body>
</html>
