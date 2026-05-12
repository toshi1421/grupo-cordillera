import api from './api';

const authService = {

  login: async (email, password) => {
    const response = await api.post('/usuarios/auth/login', {
      email,
      password,
    });

    if (response.data.token) {

      localStorage.setItem('authToken', response.data.token);
      
      const userData = response.data.usuario || response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  register: async (nombre, email, password) => {
    const response = await api.post('/usuarios/auth/registro', {
      nombre,
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/usuarios/profile');
    return response.data;
  },

  getToken: () => localStorage.getItem('authToken'),

  isAuthenticated: () => !!localStorage.getItem('authToken'),

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },
};

export default authService;