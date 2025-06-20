import { loadImages, IMAGES_PER_PAGE } from './api.js';

let currentPage = 1;
let currentQuery = '';
let isLastPage = false;

async function renderImages(query = '', page = 1, append = false) {
  const gallery = document.querySelector('.gallery-grid');
  const status = document.querySelector('.gallery-status');
  const moreBtn = document.querySelector('.gallery-more');
  if (!append) gallery.innerHTML = '';

  const images = await loadImages(query, page);

  if (!append && images.length === 0) {
    if (status) status.textContent = 'Изображения не найдены или произошла ошибка.';
    if (moreBtn) moreBtn.style.display = 'none';
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

  if (images.length === IMAGES_PER_PAGE) {
    if (moreBtn) moreBtn.style.display = '';
    isLastPage = false;
  } else {
    if (moreBtn) moreBtn.style.display = 'none';
    isLastPage = true;
  }
}

window.onload = () => {
  currentPage = 1;
  currentQuery = '';
  renderImages(currentQuery, currentPage);
};

document.querySelector('.search').addEventListener('submit', function(e) {
  e.preventDefault();
  currentQuery = document.querySelector('.search-input').value.trim();
  currentPage = 1;
  renderImages(currentQuery, currentPage);
});

document.querySelector('.gallery-more').addEventListener('click', function() {
  if (isLastPage) return;
  currentPage += 1;
  renderImages(currentQuery, currentPage, true);
});