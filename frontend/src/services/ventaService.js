import api from './api';

const ventaService = {
  getVentas: async (page = 0, size = 10) => {
    const response = await api.get('/ventas/ordenes', {
      params: { page, size },
    });
    return response.data;
  },

  getVentaById: async (id) => {
    const response = await api.get(`/ventas/ordenes/${id}`);
    return response.data;
  },

  createVenta: async (venta) => {
    const response = await api.post('/ventas/ordenes', venta);
    return response.data;
  },

  updateVenta: async (id, venta) => {
    const response = await api.put(`/ventas/ordenes/${id}`, venta);
    return response.data;
  },

  cancelVenta: async (id) => {
    const response = await api.post(`/ventas/ordenes/${id}/cancelar`);
    return response.data;
  },

  getMisVentas: async () => {
    const response = await api.get('/ventas/mis-ordenes');
    return response.data;
  },
};

export default ventaService;
