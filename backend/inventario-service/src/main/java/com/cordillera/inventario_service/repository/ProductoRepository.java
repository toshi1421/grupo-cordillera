package com.cordillera.inventario_service.repository;

import com.cordillera.inventario_service.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

	List<Producto> findByNombreContainingIgnoreCase(String nombre);

	Optional<Producto> findByNombre(String nombre);

}
