package com.cordillera.usuario_service.controller;

import com.cordillera.usuario_service.dto.LoginRequest;
import com.cordillera.usuario_service.dto.RoleUpdateRequest;
import com.cordillera.usuario_service.model.Usuario;
import com.cordillera.usuario_service.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    public Usuario crearUsuario(@Valid @RequestBody Usuario usuario) {
        return service.guardarUsuario(usuario);
    }

    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return service.obtenerUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long id) {
        Usuario usuario = service.obtenerPorId(id);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @PostMapping("/api/autenticacion/registro")
    public Usuario registrar(@Valid @RequestBody Usuario usuario) {
        return service.guardarUsuario(usuario);
    }

    @PostMapping("/login")
    public Map<String, String> login(@Valid @RequestBody LoginRequest request) {
        String token = service.login(request.getEmail(), request.getPassword());
        return Map.of("token", token);
    }

    @PutMapping("/{id}/rol")
    public Usuario actualizarRol(@PathVariable Long id, @Valid @RequestBody RoleUpdateRequest request) {
        return service.actualizarRol(id, request.getRol());
    }
}