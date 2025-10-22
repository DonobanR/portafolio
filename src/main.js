import './estilos/styles.css';
import heroVideoSource from './assets/cabecera/cabecera.mp4';
import profilePhoto from './assets/myPhoto/foto.webp';
import { initMenuToggle } from './components/menu.js';
import { initProjects } from './components/projects.js';
import { initSectionNavigation } from './components/sections.js';

function hydrateMediaAssets() {
  const videoSource = document.getElementById('hero-video-source');
  if (videoSource) {
    videoSource.src = heroVideoSource;
    const video = videoSource.closest('video');
    if (video) {
      video.load();
    }
  }

  const profileImage = document.getElementById('profile-photo');
  if (profileImage) {
    profileImage.src = profilePhoto;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateMediaAssets();
  initMenuToggle();
  initSectionNavigation();
  initProjects();
});
