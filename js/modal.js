const MODAL = document.querySelector('.modal');
const MODAL_IMAGE = document.querySelector('.modal-image');
const MODAL_OVERLAY = document.querySelector('.modal-overlay');
const MODAL_CLOSE = document.querySelector('.modal-close');
const GALLERY = document.querySelector('.gallery-grid');
const GALLERY_SECTION = document.getElementById('gallery');

function openModal(img) {
    MODAL_IMAGE.src = img.src;
    MODAL_IMAGE.alt = img.alt;
    MODAL.style.display = 'block';
    GALLERY_SECTION.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    MODAL.style.display = 'none';
    GALLERY_SECTION.removeAttribute('inert');
    document.body.style.overflow = '';
}

GALLERY.addEventListener('click', (e) => {
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