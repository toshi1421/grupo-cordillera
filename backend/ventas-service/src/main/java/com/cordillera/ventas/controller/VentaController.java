package com.cordillera.ventas.controller;

import com.cordillera.ventas.model.Venta;
import com.cordillera.ventas.service.VentaService;
import com.cordillera.ventas.dto.VentaSolicitud;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    @PostMapping("/crear")
    public ResponseEntity<?> realizarCompra(@Valid @RequestBody VentaSolicitud solicitud) {
        Venta nuevaVenta = ventaService.procesarVenta(solicitud);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
    }

    @GetMapping
    public ResponseEntity<List<Venta>> listarHistorialVentas() {
        List<Venta> ventas = ventaService.listarTodasLasVentas();
        return ResponseEntity.ok(ventas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venta> obtenerDetalleVenta(@PathVariable Long id) {
        Optional<Venta> venta = ventaService.obtenerVentaPorId(id);
        if (venta.isPresent()) {
            return ResponseEntity.ok(venta.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Venta>> obtenerMisCompras(@PathVariable Long idUsuario) {
        List<Venta> ventas = ventaService.obtenerVentasPorUsuario(idUsuario);
        return ResponseEntity.ok(ventas);
    }
}