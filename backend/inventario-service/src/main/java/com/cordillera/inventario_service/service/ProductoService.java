package com.cordillera.inventario_service.service;

import com.cordillera.inventario_service.dto.ProductoDTO;
import com.cordillera.inventario_service.model.Producto;
import com.cordillera.inventario_service.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {

	@Autowired
	private ProductoRepository productoRepository;

	public ProductoDTO crearProducto(ProductoDTO productoDTO) {
		Producto producto = new Producto(
				productoDTO.getNombre(),
				productoDTO.getPrecio(),
				productoDTO.getCantidad(),
				productoDTO.getDescripcion()
		);
		Producto productoGuardado = productoRepository.save(producto);
		return convertirADTO(productoGuardado);
	}

	public ProductoDTO obtenerProductoPorId(Long id) {
		Optional<Producto> producto = productoRepository.findById(id);
		return producto.map(this::convertirADTO).orElse(null);
	}

	public List<ProductoDTO> obtenerTodosLosProductos() {
		return productoRepository.findAll()
				.stream()
				.map(this::convertirADTO)
				.collect(Collectors.toList());
	}

	public List<ProductoDTO> buscarProductosPorNombre(String nombre) {
		return productoRepository.findByNombreContainingIgnoreCase(nombre)
				.stream()
				.map(this::convertirADTO)
				.collect(Collectors.toList());
	}

	public ProductoDTO actualizarProducto(Long id, ProductoDTO productoDTO) {
		Optional<Producto> productoOptional = productoRepository.findById(id);
		if (productoOptional.isPresent()) {
			Producto producto = productoOptional.get();
			producto.setNombre(productoDTO.getNombre());
			producto.setPrecio(productoDTO.getPrecio());
			producto.setCantidad(productoDTO.getCantidad());
			producto.setDescripcion(productoDTO.getDescripcion());
			Producto productoActualizado = productoRepository.save(producto);
			return convertirADTO(productoActualizado);
		}
		return null;
	}

	public boolean eliminarProducto(Long id) {
		if (productoRepository.existsById(id)) {
			productoRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Transactional
	public void descontarStock(Long id, Integer cantidad) {
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Producto no encontrado"));

		if (producto.getCantidad() < cantidad) {
			throw new RuntimeException("Stock insuficiente para el producto: " + id);
		}

		producto.setCantidad(producto.getCantidad() - cantidad);
		productoRepository.save(producto);
	}

	private ProductoDTO convertirADTO(Producto producto) {
		return new ProductoDTO(
				producto.getId(),
				producto.getNombre(),
				producto.getPrecio(),
				producto.getCantidad(),
				producto.getDescripcion()
		);
	}
}
