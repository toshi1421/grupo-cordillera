import api from './api';

const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(payload);
  } catch (error) {
    return null;
  }
};

const persistSession = (token, email, backendUser) => {
  localStorage.setItem('authToken', token);

  const claims = decodeJwtPayload(token);
  const userData = backendUser || {
    email: claims?.sub || email,
    rol: claims?.rol || 'USER',
  };

  localStorage.setItem('user', JSON.stringify(userData));
  return userData;
};

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/usuarios/auth/login', {
        email,
        password,
      });

      if (response.data.token) {
       
        persistSession(response.data.token, email, response.data.usuario || response.data.user);

        
        try {
          const profileResp = await api.get('/usuarios/me');
          const userData = persistSession(response.data.token, email, profileResp.data);
          return { ...response.data, usuario: userData };
        } catch (profileErr) {
          
          const userData = persistSession(response.data.token, email, response.data.usuario || response.data.user);
          return { ...response.data, usuario: userData };
        }
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  register: async (nombreUsuario, email, password, rol = 'USER') => {
    const response = await api.post('/usuarios/auth/registro', {
      nombreUsuario,
      email,
      contrasena: password,
      rol,
    });
    return response.data;
  },

  getToken: () => localStorage.getItem('authToken'),

  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token; 
  },

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