const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const IMAGES_PER_PAGE = 12;

async function loadImages(query = '') {
  let url = '';
  if (query) {
    url = `${API_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${IMAGES_PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`;
  } else {
    url = `${API_BASE_URL}/photos/random?count=${IMAGES_PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return query ? data.results : data;
}

export { loadImages, IMAGES_PER_PAGE };
