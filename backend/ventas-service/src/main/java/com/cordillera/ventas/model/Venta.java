package com.cordillera.ventas.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    
    private Long idUsuario;
    private Long idProducto;
    private Integer cantidad;

    @Column(precision = 12, scale = 2)
    private BigDecimal total;

    private LocalDateTime fecha;

    @PrePersist
    public void antesDeGuardar() {
        if (this.fecha == null) {
            this.fecha = LocalDateTime.now();
        }
    }
}