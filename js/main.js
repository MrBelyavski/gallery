async function loadImages() {
  const accessKey = '';
  const response = await fetch(`https://api.unsplash.com/photos/random?count=12&client_id=${accessKey}`);
  const images = await response.json();
  const gallery = document.querySelector('.gallery-grid');
  images.forEach(img => {
    const imgElem = document.createElement('img');
    imgElem.src = img.urls.small;
    gallery.appendChild(imgElem);
  });
}

window.onload = loadImages;