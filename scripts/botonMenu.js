const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const menuItems = document.querySelectorAll('.nav-list li'); // Selecciona las opciones del menú

// Mostrar / Ocultar el menú al hacer clic en el botón
menuToggle.addEventListener('click', (event) => {
  navList.classList.toggle('active');
  event.stopPropagation(); // Evita que el clic en el botón cierre el menú
});

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (event) => {
  if (navList.classList.contains('active') && !navList.contains(event.target)) {
    navList.classList.remove('active');
  }
});

// Cerrar el menú al seleccionar una opción del menú
menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    navList.classList.remove('active');
  });
});