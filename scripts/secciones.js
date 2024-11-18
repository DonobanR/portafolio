document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.display = 'none'; // Ocultar todas las secciones
    });
    document.getElementById('about-me').style.display = ''; // Mostrar solo "home"

    // Manejar clics en los enlaces
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');

            // Ocultar todas las secciones
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Mostrar la sección correspondiente
            document.getElementById(target).style.display = '';
        });
    });
});
