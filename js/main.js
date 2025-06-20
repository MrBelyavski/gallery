import { loadImages } from './api.js';

async function renderImages(query = '') {
  const gallery = document.querySelector('.gallery-grid');
  const status = document.querySelector('.gallery-status');
  gallery.innerHTML = '';

  const images = await loadImages(query);

  gallery.innerHTML = '';
  if (images.length === 0) {
    if (status) status.textContent = 'Изображения не найдены или произошла ошибка.';
    return;
  }

  if (status) status.textContent = '';
  images.forEach(img => {
    const imgElem = document.createElement('img');
    imgElem.src = img.urls.small;
    imgElem.alt = img.alt_description;
    imgElem.onerror = () => {
      const textElem = document.createElement('div');
      textElem.textContent = 'Изображение не загрузилось';
      textElem.className = 'image-error';
      imgElem.replaceWith(textElem);
    };
    gallery.appendChild(imgElem);
  });
}

window.onload = () => renderImages();

document.querySelector('.search').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.querySelector('.search-input').value.trim();
  renderImages(query);
});