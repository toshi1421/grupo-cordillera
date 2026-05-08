package com.cordillera.ventas.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "inventario-service", url = "http://localhost:8082")
public interface InventarioClient {
    @GetMapping("/api/productos/verificar-stock")
    boolean verificarStock(@RequestParam Long id, @RequestParam Integer cantidad);

    @PutMapping("/api/productos/{id}/descontar")
    void descontarStock(@PathVariable Long id, @RequestParam Integer cantidad);
}