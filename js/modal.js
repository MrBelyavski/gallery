const MODAL = document.querySelector('.modal');
const MODAL_IMAGE = document.querySelector('.modal-image');
const MODAL_OVERLAY = document.querySelector('.modal-overlay');
const MODAL_CLOSE = document.querySelector('.modal-close');
const MODAL_PREV = document.querySelector('.modal-prev');
const MODAL_NEXT = document.querySelector('.modal-next');
const GALLERY = document.querySelector('.gallery-grid');
const GALLERY_SECTION = document.getElementById('gallery');

let imagesList = [];
let currentIndex = 0;

function updateImagesList() {
  imagesList = Array.from(GALLERY.querySelectorAll('img'));
}

function openModal(img) {
  updateImagesList();
  currentIndex = imagesList.indexOf(img);
  showImage(currentIndex);
  MODAL.classList.add('open');
  GALLERY_SECTION.setAttribute('inert', '');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  MODAL.classList.remove('open');
  GALLERY_SECTION.removeAttribute('inert');
  document.body.style.overflow = '';
}

function showImage(index) {
  if (!imagesList.length) return;
  currentIndex = (index + imagesList.length) % imagesList.length;
  const img = imagesList[currentIndex];
  MODAL_IMAGE.src = img.src;
  MODAL_IMAGE.alt = img.alt;
}

function showPrevImage() {
  showImage(currentIndex - 1);
}

function showNextImage() {
  showImage(currentIndex + 1);
}

GALLERY.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    openModal(e.target);
  }
});

if (MODAL_OVERLAY) {
  MODAL_OVERLAY.addEventListener('click', closeModal);
}
if (MODAL_CLOSE) {
  MODAL_CLOSE.addEventListener('click', closeModal);
}

if (MODAL_PREV) {
  MODAL_PREV.addEventListener('click', showPrevImage);
}
if (MODAL_NEXT) {
  MODAL_NEXT.addEventListener('click', showNextImage);
}

document.addEventListener('keydown', e => {
  if (!MODAL.classList.contains('open')) return;
  if (e.key === 'ArrowLeft') showPrevImage();
  if (e.key === 'ArrowRight') showNextImage();
  if (e.key === 'Escape') closeModal();
});