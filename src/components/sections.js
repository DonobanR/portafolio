export function initSectionNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section');

  if (!navLinks.length || !sections.length) {
    return;
  }

  const showSection = (targetId) => {
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.removeAttribute('hidden');
      } else {
        section.setAttribute('hidden', '');
      }
    });
  };

  showSection('about-me');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.dataset.target;
      if (targetId) {
        showSection(targetId);
      }
    });
  });
}
