const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE_URL });

const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return;
  }
  delete api.defaults.headers.common['Authorization'];
};

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const get = <T>(endpoint: string, params: Record<string, unknown> = {}): Promise<T> => (
  handleRequest<T>(api.get(endpoint, { params }))
);

const post = <T>(endpoint: string, data: Record<string, unknown> = {}): Promise<T> => (
  handleRequest<T>(api.post(endpoint, data))
);

const put = <T>(endpoint: string, data: Record<string, unknown> = {}): Promise<T> => (
  handleRequest<T>(api.put(endpoint, data))
);

const patch = <T>(endpoint: string, data: Record<string, unknown> = {}): Promise<T> => (
  handleRequest<T>(api.patch(endpoint, data))
);

const del = <T>(endpoint: string): Promise<T> => (
  handleRequest<T>(api.delete(endpoint))
);

export default {
  setAuthHeader,
  get,
  post,
  put,
  patch,
  delete: del,
};