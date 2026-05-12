package com.cordillera.ventas.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockRequest {
    @NotNull(message = "El ID de producto es obligatorio")
    private Long idProducto;

    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;
}
