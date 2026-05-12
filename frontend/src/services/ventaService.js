import api from './api';

const ventaService = {
  getVentas: async (page = 0, size = 10) => {
    const response = await api.get('/ventas/crear', {
      params: { page, size },
    });
    return response.data;
  },

  getVentaById: async (id) => {
    const response = await api.get(`/ventas/crear/${id}`);
    return response.data;
  },

  createVenta: async (venta) => {
    const response = await api.post('/ventas/crear', venta);
    return response.data;
  },

  updateVenta: async (id, venta) => {
    const response = await api.put(`/ventas/crear/${id}`, venta);
    return response.data;
  },

  cancelVenta: async (id) => {
    const response = await api.post(`/ventas/crear/${id}/cancelar`);
    return response.data;
  },

  getMisVentas: async () => {
    const response = await api.get('/ventas/usuario/');
    return response.data;
  },
};

export default ventaService;
