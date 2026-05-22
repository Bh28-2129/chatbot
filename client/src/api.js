import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password })
};

// Chat endpoints
export const chatAPI = {
  sendMessage: (conversationId, message) =>
    api.post('/chat/message', { conversationId, message })
};

// Conversation endpoints
export const conversationAPI = {
  createConversation: (title) =>
    api.post('/conversations/create', { title }),
  getConversations: () =>
    api.get('/conversations'),
  getConversation: (id) =>
    api.get(`/conversations/${id}`),
  deleteConversation: (id) =>
    api.delete(`/conversations/${id}`)
};

export default api;
