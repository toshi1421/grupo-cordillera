import api from './api';

const authService = {
  // Login
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

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Obtener perfil del usuario
  getProfile: async () => {
    const response = await api.get('/usuarios/profile');
    return response.data;
  },

  // Registrar usuario
  register: async (nombre, email, password) => {
    const response = await api.post('/usuarios/register', {
      nombre,
      email,
      password,
    });
    return response.data;
  },

  // Obtener token actual
  getToken: () => localStorage.getItem('authToken'),

  // Verificar si está autenticado
  isAuthenticated: () => !!localStorage.getItem('authToken'),

  // Obtener datos del usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
