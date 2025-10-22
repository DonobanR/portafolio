export function initMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (!menuToggle || !navList) {
    return;
  }

  const closeMenu = () => {
    navList.classList.remove('active');
  };

  menuToggle.addEventListener('click', (event) => {
    navList.classList.toggle('active');
    event.stopPropagation();
  });

  navList.addEventListener('click', (event) => {
    if (event.target.matches('.nav-link')) {
      closeMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navList.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });
}
