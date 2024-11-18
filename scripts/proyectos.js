const proyectos = [
    {
      titulo: 'Sistema punto de venta',
      imagen: 'multimedia/proyectos/SistemaPuntoVenta.webp',
      link: 'https://github.com/DonobanR/Sistema-punto-de-venta',
      tipo: 'participacion'
    },
    {
      titulo: 'Nodo venta de electrodomésticos',
      imagen: 'multimedia/proyectos/nodoVentaSur.webp',
      link: 'https://github.com/DonobanR/AplicacionNodoSur_EjemploBDD',
      tipo: 'personal'
    },
    {
      titulo: 'Portafolio personal',
      imagen: 'multimedia/proyectos/myPortafolio.webp',
      link: 'https://github.com/DonobanR/Pagina',
      tipo: 'personal'
    },
    {
      titulo: 'Sokoban',
      imagen: 'multimedia/proyectos/sokoban.webp',
      link: 'https://github.com/DonobanR/Sokoban_In_JAVA',
      tipo: 'personal'
    },
    {
      titulo: 'SharpShooter',
      imagen: 'multimedia/proyectos/SharpShooter.webp',
      link: 'https://github.com/DonobanR/OpenGL_SharpShooter_2024A_GR1SW_GR5',
      tipo: 'participacion'
    },
    {
      titulo: 'Traductor Braille to Text y viceversa',
      imagen: 'multimedia/proyectos/brailleToText.webp',
      link: 'https://github.com/JoelPiuri/TraductorBrailleATexto',
      tipo: 'participacion'
    }
  ];

  // Logica para la demostracion de los proyectos personales o que participé
  document.addEventListener('DOMContentLoaded', () => {
    const contenedorPersonales = document.getElementById('proyecto-personal');
    const contenedorParticipacion = document.getElementById('proyecto-participe');

    proyectos.forEach(proyecto => {
      const div = document.createElement('div');
      div.classList.add('proyecto');
      div.innerHTML = `
      <img src="${proyecto.imagen}" alt="Imagen del proyecto">
      <h3>${proyecto.titulo}</h3>
      <a href="${proyecto.link}" target="_blank" class="btn-abrir">Abrir</a>
    `;

      if (proyecto.tipo === 'personal') {
        contenedorPersonales.appendChild(div);
      } else {
        contenedorParticipacion.appendChild(div);
      }
    });
  });