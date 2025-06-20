const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const IMAGES_PER_PAGE = 12;

async function loadImages(query = '', page = 1) {
  let url = '';
  if (query) {
    url = `${API_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${IMAGES_PER_PAGE}&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`;
  } else {
    url = `${API_BASE_URL}/photos?per_page=${IMAGES_PER_PAGE}&page=${page}&client_id=${UNSPLASH_ACCESS_KEY}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return query ? data.results : data;
  } catch (error) {
    console.error('Ошибка при загрузке изображений:', error);
    return [];
  }
}

export { loadImages, IMAGES_PER_PAGE };