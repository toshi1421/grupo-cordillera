package com.cordillera.usuario_service.service;

import com.cordillera.usuario_service.model.Usuario;
import com.cordillera.usuario_service.repository.UsuarioRepository;
import com.cordillera.usuario_service.config.JwtUtil;
import com.cordillera.usuario_service.exception.UsuarioNotFoundException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repositorio;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encriptador;

    public UsuarioService(UsuarioRepository repositorio, JwtUtil jwtUtil, BCryptPasswordEncoder encriptador) {
        this.repositorio = repositorio;
        this.jwtUtil = jwtUtil;
        this.encriptador = encriptador;
    }

    public Usuario guardarUsuario(Usuario usuario) {
        if (usuario.getNombreUsuario() == null || usuario.getNombreUsuario().isBlank()) {
            throw new IllegalArgumentException("El nombre de usuario es obligatorio");
        }
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }
        if (usuario.getContrasena() == null || usuario.getContrasena().isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria");
        }
        if (repositorio.existsByNombreUsuario(usuario.getNombreUsuario())) {
            throw new IllegalArgumentException("El nombre de usuario ya está registrado");
        }
        if (repositorio.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        if (usuario.getRol() == null || usuario.getRol().isBlank()) {
            usuario.setRol("USER");
        }
        usuario.setContrasena(encriptador.encode(usuario.getContrasena()));
        return repositorio.save(usuario);
    }

    public List<Usuario> obtenerUsuarios() {
        return repositorio.findAll();
    }

    public Usuario obtenerPorId(Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }

    public String login(String email, String password) {
        Usuario usuario = repositorio.findByEmail(email);
      
        if (usuario == null || !encriptador.matches(password, usuario.getContrasena())) {
            throw new BadCredentialsException("Credenciales incorrectas");
        }
        return jwtUtil.generarToken(usuario.getEmail(), usuario.getRol());
    }

    public Usuario actualizarUsuario(Long id, Usuario usuarioActualizado) {
        Optional<Usuario> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new UsuarioNotFoundException(id);
        }
        Usuario usuario = opt.get();
        if (usuarioActualizado.getNombreUsuario() != null && !usuarioActualizado.getNombreUsuario().isBlank()) {
            usuario.setNombreUsuario(usuarioActualizado.getNombreUsuario());
        }
        if (usuarioActualizado.getEmail() != null && !usuarioActualizado.getEmail().isBlank()) {
            usuario.setEmail(usuarioActualizado.getEmail());
        }
        if (usuarioActualizado.getContrasena() != null && !usuarioActualizado.getContrasena().isBlank()) {
            usuario.setContrasena(encriptador.encode(usuarioActualizado.getContrasena()));
        }
        return repositorio.save(usuario);
    }

    public void eliminarUsuario(Long id) {
        if (!repositorio.existsById(id)) {
            throw new UsuarioNotFoundException(id);
        }
        repositorio.deleteById(id);
    }

    public Usuario actualizarRol(Long id, String rol) {
        Optional<Usuario> opt = repositorio.findById(id);
        if (opt.isEmpty()) {
            throw new UsuarioNotFoundException(id);
        }
        Usuario usuario = opt.get();
        usuario.setRol(rol);
        return repositorio.save(usuario);
    }

    public Usuario obtenerPorEmail(String email) {
        Usuario usuario = repositorio.findByEmail(email);
        if (usuario == null) {
            throw new com.cordillera.usuario_service.exception.UsuarioNotFoundException(email);
        }
        return usuario;
    }
}