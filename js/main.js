import { loadImages } from './api.js';

async function renderImages(query = '') {
  const images = await loadImages(query);
  const gallery = document.querySelector('.gallery-grid');
  gallery.innerHTML = '';
  images.forEach(img => {
    const imgElem = document.createElement('img');
    imgElem.src = img.urls.small;
    gallery.appendChild(imgElem);
  });
}

window.onload = () => renderImages();

document.querySelector('.search').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.querySelector('.search-input').value.trim();
  renderImages(query);
});