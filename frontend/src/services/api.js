import axios from 'axios';

const API_URLS = import.meta.env.VITE_API_URL
  ? [import.meta.env.VITE_API_URL]
  : Array.from({ length: 10 }, (_, index) => `http://localhost:${5001 + index}/api`);

let activeApiUrl = API_URLS[0];

const requestWithFallback = async (config) => {
  const urlsToTry = [activeApiUrl, ...API_URLS.filter((url) => url !== activeApiUrl)];

  let lastError;
  for (const baseURL of urlsToTry) {
    try {
      const response = await axios({
        baseURL,
        timeout: 1200,
        ...config
      });
      activeApiUrl = baseURL;
      return response;
    } catch (error) {
      lastError = error;
      if (error.response) {
        throw error;
      }
    }
  }

  throw lastError;
};

export const getProducts = (search = '') =>
  requestWithFallback({
    method: 'get',
    url: '/products',
    params: search ? { search } : {}
  });

export const getProductById = (id) =>
  requestWithFallback({
    method: 'get',
    url: `/products/${id}`
  });

export const createProduct = (product) =>
  requestWithFallback({
    method: 'post',
    url: '/products',
    data: product
  });

export default requestWithFallback;
