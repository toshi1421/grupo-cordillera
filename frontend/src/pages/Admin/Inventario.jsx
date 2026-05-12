import React, { useState, useEffect } from 'react';
import productoService from '../../services/productoService';
import './Inventario.css';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.getProductos(0, 100);
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingId(null);
    setFormData({ nombre: '', descripcion: '', precio: '', stock: '' });
  };

  const handleEditClick = (producto) => {
    setEditingId(producto.id);
    setShowForm(true);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productoService.updateProducto(editingId, formData);
      } else {
        await productoService.createProducto(formData);
      }
      fetchProductos();
      setShowForm(false);
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '' });
    } catch (err) {
      setError('Error al guardar el producto');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      try {
        await productoService.deleteProducto(id);
        fetchProductos();
      } catch (err) {
        setError('Error al eliminar el producto');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="inventario"><p>Cargando inventario...</p></div>;
  }

  return (
    <div className="inventario">
      <div className="header">
        <h1>Gestionar Inventario</h1>
        <button className="btn-primary" onClick={handleAddClick}>
          + Agregar Producto
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>{editingId ? 'Editar' : 'Nuevo'} Producto</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              required
            />
            <textarea
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows="3"
            />
            <input
              type="number"
              placeholder="Precio"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              step="0.01"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />
            <div className="form-buttons">
              <button type="submit" className="btn-success">
                Guardar
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="productos-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion?.substring(0, 50)}...</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditClick(producto)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;
