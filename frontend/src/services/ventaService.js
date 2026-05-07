import api from './api';

const ventaService = {
  // Obtener todas las ventas
  getVentas: async (page = 0, size = 10) => {
    const response = await api.get('/ventas/ordenes', {
      params: { page, size },
    });
    return response.data;
  },

  // Obtener una venta por ID
  getVentaById: async (id) => {
    const response = await api.get(`/ventas/ordenes/${id}`);
    return response.data;
  },

  // Crear una venta (realizar compra)
  createVenta: async (venta) => {
    const response = await api.post('/ventas/ordenes', venta);
    return response.data;
  },

  // Actualizar estado de una venta (Admin)
  updateVenta: async (id, venta) => {
    const response = await api.put(`/ventas/ordenes/${id}`, venta);
    return response.data;
  },

  // Cancelar una venta
  cancelVenta: async (id) => {
    const response = await api.post(`/ventas/ordenes/${id}/cancelar`);
    return response.data;
  },

  // Obtener ventas del usuario actual
  getMisVentas: async () => {
    const response = await api.get('/ventas/mis-ordenes');
    return response.data;
  },
};

export default ventaService;
