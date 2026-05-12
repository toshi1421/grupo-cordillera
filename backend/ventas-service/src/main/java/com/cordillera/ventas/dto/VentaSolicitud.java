package com.cordillera.ventas.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class VentaSolicitud {
    @NotNull(message = "El ID de usuario es obligatorio")
    private Long idUsuario;

    @NotNull(message = "El ID de producto es obligatorio")
    private Long idProducto;

    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    @Positive(message = "El total debe ser un número positivo")
    private BigDecimal total;
}
