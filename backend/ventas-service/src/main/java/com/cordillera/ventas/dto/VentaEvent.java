package com.cordillera.ventas.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VentaEvent {
    private Long idVenta;
    private Long idUsuario;
    private Long idProducto;
    private Integer cantidad;
    private BigDecimal total;
    private LocalDateTime fecha;
}