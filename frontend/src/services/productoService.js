import api from './api';

const productoService = {

  getProductos: async (page = 0, size = 10) => {
    const response = await api.get('/inventario/productos', {
      params: { page, size },
    });
    return response.data;
  },


  getProductoById: async (id) => {
    const response = await api.get(`/inventario/productos/${id}`);
    return response.data;
  },

  createProducto: async (producto) => {
    const response = await api.post('/inventario/productos', producto);
    return response.data;
  },

  updateProducto: async (id, producto) => {
    const response = await api.put(`/inventario/productos/${id}`, producto);
    return response.data;
  },

  deleteProducto: async (id) => {
    const response = await api.delete(`/inventario/productos/${id}`);
    return response.data;
  },

  getStock: async (id) => {
    const response = await api.get(`/inventario/productos/${id}/stock`);
    return response.data;
  },
};

export default productoService;
