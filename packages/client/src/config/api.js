export const API_DOMAIN = "https://newsapi.org/v2/top-headlines?country="
export const API_KEY = "38cf625a791e45e680d30775b5eb3dce"
export const endpointPath = (country, category, page, pageSize) => `${API_DOMAIN}${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
