import api from './api';

const productoService = {

  getProductos: async (page = 0, size = 10) => {
    const response = await api.get('/productos', {
      params: { page, size },
    });
    return response.data;
  },


  getProductoById: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  createProducto: async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  updateProducto: async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  deleteProducto: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },

  getStock: async (id) => {
    const response = await api.get(`/productos/${id}/stock`);
    return response.data;
  },
};

export default productoService;
