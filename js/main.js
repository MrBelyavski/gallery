import { loadImages, IMAGES_PER_PAGE } from './api.js';
import { validateInput } from './validation.js';

let currentPage = 1;
let currentQuery = '';
let isLastPage = false;
let isLoading = false;

async function renderImages(query = '', page = 1, append = false) {
  if (isLoading) return;
  isLoading = true;
  
  const gallery = document.querySelector('.gallery-grid');
  const status = document.querySelector('.gallery-status');
  const moreBtn = document.querySelector('.gallery-more');
  
  if (!append) gallery.innerHTML = '';

  let images;
  try {
    images = await loadImages(query, page);
  } catch (error) {
    if (status) status.textContent = 'Ошибка загрузки изображений';
    if (moreBtn) moreBtn.style.display = 'none';
    isLoading = false;
    return;
  }

  if (!append && images.length === 0) {
    if (status) status.textContent = 'Изображения не найдены';
    if (moreBtn) moreBtn.style.display = 'none';
    isLoading = false;
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
  
  isLoading = false;
}

window.onload = () => {
  currentPage = 1;
  currentQuery = '';
  renderImages(currentQuery, currentPage);
};

document.querySelector('.search').addEventListener('submit', function(e) {
  e.preventDefault();
  const inputElement = document.querySelector('.search-input');
  const inputVal = inputElement.value;
  const validation = validateInput(inputVal);
  if (!validation.valid) {
    alert(validation.message);
    return;
  }
  currentQuery = inputVal.trim();
  currentPage = 1;
  renderImages(currentQuery, currentPage);
});

document.querySelector('.gallery-more').addEventListener('click', function() {
  if (isLastPage || isLoading) return;
  currentPage += 1;
  renderImages(currentQuery, currentPage, true);
});
