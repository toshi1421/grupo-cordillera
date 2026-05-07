package com.cordillera.ventas.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.cordillera.ventas.dto.UsuarioDTO;

@FeignClient(name = "usuarios-service", url = "http://localhost:8081/usuarios")
public interface UsuarioClient {
    @GetMapping("/{id}")
    UsuarioDTO obtenerUsuarioPorId(@PathVariable("id") Long id);
}