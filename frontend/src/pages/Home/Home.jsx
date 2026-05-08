import React, { useState, useEffect } from 'react';
import productoService from '../../services/productoService';
import './Home.css';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await productoService.getProductos();
        setProductos(data.content || data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);
  
  if (loading) {
    return <div className="home"><p>Cargando productos...</p></div>;
  }

  if (error) {
    return <div className="home"><p className="error">{error}</p></div>;
  }

  return (
    <div className="home">
      <h1>Catálogo de Productos</h1>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <div className="producto-imagen">
              <img src={producto.imagen || '/placeholder.jpg'} alt={producto.nombre} />
            </div>
            <div className="producto-info">
              <h2>{producto.nombre}</h2>
              <p className="descripcion">{producto.descripcion}</p>
              <div className="producto-footer">
                <span className="precio">${producto.precio}</span>
                <span className={`stock ${producto.stock > 0 ? 'disponible' : 'agotado'}`}>
                  {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                </span>
              </div>
              <button className="btn-agregar" disabled={producto.stock === 0}>
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
