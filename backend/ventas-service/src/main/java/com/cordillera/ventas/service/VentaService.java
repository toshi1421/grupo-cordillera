package com.cordillera.ventas.service;

import com.cordillera.ventas.model.Venta;
import com.cordillera.ventas.dto.VentaSolicitud;
import java.util.List;
import java.util.Optional;

public interface VentaService {

    Venta crearVenta(Venta venta);

    Venta procesarVenta(VentaSolicitud solicitud);

    List<Venta> listarTodasLasVentas();

    Optional<Venta> obtenerVentaPorId(Long id);

    List<Venta> obtenerVentasPorUsuario(Long idUsuario);
}