const accessKey = '';

async function loadImages(query = '') {
  let url = '';
  if (query) {
    url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&client_id=${accessKey}`;
  } else {
    url = `https://api.unsplash.com/photos/random?count=12&client_id=${accessKey}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  const images = query ? data.results : data;

  const gallery = document.querySelector('.gallery-grid');
  gallery.innerHTML = '';
  images.forEach(img => {
    const imgElem = document.createElement('img');
    imgElem.src = img.urls.small;
    gallery.appendChild(imgElem);
  });
}

window.onload = () => loadImages();

document.getElementById('search').addEventListener('submit', function(e) {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  loadImages(query);
});