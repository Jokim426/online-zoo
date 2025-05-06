
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE_URL });

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return;
  }
  delete api.defaults.headers.common['Authorization'];
};

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const get = (endpoint, params = {}) => (
  handleRequest(api.get(endpoint, { params }))
);

const post = (endpoint, data = {}) => (
  handleRequest(api.post(endpoint, data))
);

const put = (endpoint, data = {}) => (
  handleRequest(api.put(endpoint, data))
);

const patch = (endpoint, data = {}) => (
  handleRequest(api.patch(endpoint, data))
);

const del = (endpoint) => (
  handleRequest(api.delete(endpoint))
);

export default {
  setAuthHeader,
  get,
  post,
  put,
  patch,
  delete: del,
};