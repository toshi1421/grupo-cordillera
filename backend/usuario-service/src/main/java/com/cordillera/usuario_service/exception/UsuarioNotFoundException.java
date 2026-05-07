package com.cordillera.usuario_service.exception;

public class UsuarioNotFoundException extends RuntimeException {
    public UsuarioNotFoundException(Long id) {
        super("El usuario con ID " + id + " no existe en los registros del Grupo Cordillera.");
    }
}
