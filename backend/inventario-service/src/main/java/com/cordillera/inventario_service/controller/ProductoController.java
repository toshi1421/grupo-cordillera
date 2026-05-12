package com.cordillera.inventario_service.controller;

import com.cordillera.inventario_service.dto.ProductoDTO;
import com.cordillera.inventario_service.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping("/crear")
    public ResponseEntity<ProductoDTO> crearProducto(@RequestBody ProductoDTO productoDTO) {
        ProductoDTO nuevoProducto = productoService.crearProducto(productoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerProductoPorId(@PathVariable Long id) {
        ProductoDTO producto = productoService.obtenerProductoPorId(id);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodosLosProductos() {
        List<ProductoDTO> productos = productoService.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDTO>> buscarProductosPorNombre(@RequestParam String nombre) {
        List<ProductoDTO> productos = productoService.buscarProductosPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
        ProductoDTO productoActualizado = productoService.actualizarProducto(id, productoDTO);
        if (productoActualizado != null) {
            return ResponseEntity.ok(productoActualizado);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/{id}/descontar")
    public ResponseEntity<String> descontarStock(@PathVariable Long id, @RequestParam Integer cantidad) {
        productoService.descontarStock(id, cantidad);
        return ResponseEntity.ok("Stock actualizado correctamente.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        boolean eliminado = productoService.eliminarProducto(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}