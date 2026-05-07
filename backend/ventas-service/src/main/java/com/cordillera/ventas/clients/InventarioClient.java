package com.cordillera.ventas.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@FeignClient(name = "inventario-service", url = "http://localhost:8082/api/productos")
public interface InventarioClient {

    @GetMapping("/verificar-stock")
    boolean verificarStock(@RequestParam("id") Long id, @RequestParam("cantidad") Integer cantidad);
}