package com.cordillera.ventas.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.http.ResponseEntity;

@FeignClient(name = "inventario-service", url = "http://localhost:8082/productos")
public interface InventarioClient {

    @GetMapping("/{id}")
    ResponseEntity<?> obtenerProductoPorId(@PathVariable("id") Long id);

    @PutMapping("/{id}/descontar")
    void descontarStock(@PathVariable("id") Long id, @RequestParam("cantidad") Integer cantidad);
}