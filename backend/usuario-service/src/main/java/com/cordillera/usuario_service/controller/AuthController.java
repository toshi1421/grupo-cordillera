package com.cordillera.usuario_service.controller;

import com.cordillera.usuario_service.dto.LoginRequest;
import com.cordillera.usuario_service.model.Usuario;
import com.cordillera.usuario_service.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/autenticacion")
public class AuthController {

    private final UsuarioService servicio;

    public AuthController(UsuarioService servicio) {
        this.servicio = servicio;
    }
    
    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return servicio.guardarUsuario(usuario);
    }

   
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return servicio.login(request.getEmail(), request.getPassword());
    }
}