import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/usuarios/login', {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    const response = await api.get('/usuarios/profile');
    return response.data;
  },

  register: async (nombre, email, password) => {
    const response = await api.post('/usuarios/register', {
      nombre,
      email,
      password,
    });
    return response.data;
  },

  getToken: () => localStorage.getItem('authToken'),

  isAuthenticated: () => !!localStorage.getItem('authToken'),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
