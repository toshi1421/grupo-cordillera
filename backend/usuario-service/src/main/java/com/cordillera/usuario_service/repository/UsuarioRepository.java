package com.cordillera.usuario_service.repository;

import com.cordillera.usuario_service.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Usuario findByEmail(String email);
	boolean existsByEmail(String email);
}
