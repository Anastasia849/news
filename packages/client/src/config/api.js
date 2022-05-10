export const API_KEY = "38cf625a791e45e680d30775b5eb3dce"
export const endpointPath = (country, category, page, pageSize) => `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
export const endpointPath2 = (domains, page, pageSize) => `https://newsapi.org/v2/everything?domains=${domains}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
