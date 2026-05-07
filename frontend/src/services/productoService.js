import api from './api';

const productoService = {
  // Obtener todos los productos
  getProductos: async (page = 0, size = 10) => {
    const response = await api.get('/inventario/productos', {
      params: { page, size },
    });
    return response.data;
  },

  // Obtener un producto por ID
  getProductoById: async (id) => {
    const response = await api.get(`/inventario/productos/${id}`);
    return response.data;
  },

  // Crear un producto (Admin)
  createProducto: async (producto) => {
    const response = await api.post('/inventario/productos', producto);
    return response.data;
  },

  // Actualizar un producto (Admin)
  updateProducto: async (id, producto) => {
    const response = await api.put(`/inventario/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar un producto (Admin)
  deleteProducto: async (id) => {
    const response = await api.delete(`/inventario/productos/${id}`);
    return response.data;
  },

  // Obtener stock de un producto
  getStock: async (id) => {
    const response = await api.get(`/inventario/productos/${id}/stock`);
    return response.data;
  },
};

export default productoService;
