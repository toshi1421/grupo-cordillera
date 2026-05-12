package com.cordillera.usuario_service.controller;

import com.cordillera.usuario_service.dto.LoginRequest;
import com.cordillera.usuario_service.model.Usuario;
import com.cordillera.usuario_service.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registro")
    public ResponseEntity<Usuario> register(@Valid @RequestBody Usuario usuario) {
        Usuario usuarioCreado = service.guardarUsuario(usuario);
        return ResponseEntity.ok(usuarioCreado);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest request) {
        String token = service.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }
}