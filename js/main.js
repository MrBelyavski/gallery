import { loadImages, IMAGES_PER_PAGE } from './api.js';
import { validateInput } from './validation.js';

const GALLERY = document.querySelector('.gallery-grid');
const STATUS = document.querySelector('.gallery-status');
const MORE_BTN = document.querySelector('.gallery-more');
const LOADER = document.querySelector('.gallery-loader');

const SEARCH_FORM = document.querySelector('.search form');
const INPUT_ELEMENT = SEARCH_FORM.querySelector('.search-input');
const ERROR_CONTAINER = SEARCH_FORM.querySelector('.search-error');

const MESSAGES = {
  LOAD_ERROR: 'Ошибка загрузки изображений',
  NOT_FOUND: 'Изображения не найдены',
  IMAGE_ERROR: 'Изображение не загрузилось'
};

let currentPage = 1;
let currentQuery = '';
let isLastPage = false;
let isLoading = false;

function showStatusMessage(message) {
  if (STATUS) {
    STATUS.textContent = message;
  }
}

function hideStatusMessage() {
  if (STATUS) {
    STATUS.textContent = '';
  }
}

function showMoreButton() {
  if (MORE_BTN) {
    MORE_BTN.style.display = '';
  }
}

function hideMoreButton() {
  if (MORE_BTN) {
    MORE_BTN.style.display = 'none';
  }
}

function clearError() {
  ERROR_CONTAINER.textContent = '';
}

function showError(message) {
  ERROR_CONTAINER.textContent = message;
}

function createImageElement(img) {
  const imgElem = document.createElement('img');

  imgElem.src = img.urls.small;
  imgElem.alt = img.alt_description;
  imgElem.loading = 'lazy';

  imgElem.onerror = () => {
    const textElem = document.createElement('div');
    textElem.textContent = MESSAGES.IMAGE_ERROR;
    textElem.className = 'image-error';
    imgElem.replaceWith(textElem);
  };

  return imgElem;
}

async function fetchImages(query, page) {
  return loadImages(query, page);
}

function renderImagesToGallery(images, append = false) {
  if (!append) {
    GALLERY.textContent = '';
  }

  images.forEach(img => {
    const imgElem = createImageElement(img);
    GALLERY.appendChild(imgElem);
  });
}

function updatePagination(imagesLength) {
  if (imagesLength === IMAGES_PER_PAGE) {
    showMoreButton();
    isLastPage = false;
  } else {
    hideMoreButton();
    isLastPage = true;
  }
}

function showLoader() {
  if (LOADER) {
    LOADER.style.display = '';
  }
}

function hideLoader() {
  if (LOADER) {
    LOADER.style.display = 'none';
  }
}

async function renderImages(query = '', page = 1, append = false) {
  if (isLoading) {
    return;
  }

  isLoading = true;

  showLoader();

  try {
    if (!append) {
      GALLERY.textContent = '';
    }

    const images = await fetchImages(query, page);

    if (!append && images.length === 0) {
      showStatusMessage(MESSAGES.NOT_FOUND);
      hideMoreButton();
      return;
    }

    hideStatusMessage();

    renderImagesToGallery(images, append);

    updatePagination(images.length);

  } catch {
    showStatusMessage(MESSAGES.LOAD_ERROR);
    hideMoreButton();

  } finally {
    hideLoader();
    isLoading = false;
  }
}

function handleSearchSubmit(e) {
  e.preventDefault();

  clearError();

  const inputVal = INPUT_ELEMENT.value;
  const validation = validateInput(inputVal);

  if (!validation.valid) {
    showError(validation.message);
    INPUT_ELEMENT.focus();
    return;
  }

  currentQuery = inputVal.trim();
  currentPage = 1;

  renderImages(currentQuery, currentPage);
}

function handleMoreClick() {
  if (isLastPage || isLoading) {
    return;
  }

  currentPage += 1;

  renderImages(currentQuery, currentPage, true);
}

window.onload = () => {
  currentPage = 1;
  currentQuery = '';

  renderImages(currentQuery, currentPage);
};

SEARCH_FORM.addEventListener('submit', handleSearchSubmit);
MORE_BTN.addEventListener('click', handleMoreClick);
