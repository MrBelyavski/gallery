const MODAL = document.querySelector('.modal');
const MODAL_IMAGE = document.querySelector('.modal-image');
const GALLERY = document.querySelector('.gallery-grid');
const GALLERY_SECTION = document.getElementById('gallery');

function openModal(img) {
    MODAL_IMAGE.src = img.src;
    MODAL_IMAGE.alt = img.alt;
    MODAL.style.display = 'block';
    GALLERY_SECTION.setAttribute('inert', '');
}

GALLERY.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        openModal(e.target);
    }
});