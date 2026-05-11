package com.cordillera.ventas.service.impl;

import com.cordillera.ventas.clients.InventarioClient;
import com.cordillera.ventas.clients.UsuarioClient;
import com.cordillera.ventas.config.RabbitMQConfig;
import com.cordillera.ventas.dto.VentaSolicitud;
import com.cordillera.ventas.model.Venta;
import com.cordillera.ventas.repository.VentaRepository;
import com.cordillera.ventas.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VentaServiceImpl implements VentaService {

    private final VentaRepository ventaRepository;
    private final InventarioClient inventarioClient;
    private final UsuarioClient usuarioClient;
    private final RabbitTemplate rabbitTemplate;

    @Override
    @Transactional
    public Venta crearVenta(Venta venta) {
      
        boolean tieneStock = inventarioClient.verificarStock(venta.getIdProducto(), venta.getCantidad());
        
        if (!tieneStock) {
            throw new RuntimeException("No hay stock suficiente para realizar la venta");
        }

     
        venta.setFecha(LocalDateTime.now());
        Venta nuevaVenta = ventaRepository.save(venta);

      
        enviarEventoRabbit(nuevaVenta);

        return nuevaVenta;
    }

    @Override
    @Transactional
    public Venta procesarVenta(VentaSolicitud solicitud) {
       
        usuarioClient.obtenerUsuarioPorId(solicitud.getIdUsuario());

        Venta venta = new Venta();
        venta.setIdUsuario(solicitud.getIdUsuario());
        venta.setIdProducto(solicitud.getIdProducto());
        venta.setCantidad(solicitud.getCantidad());
        venta.setTotal(solicitud.getTotal());
        venta.setFecha(LocalDateTime.now());

        Venta ventaGuardada = ventaRepository.save(venta);

        enviarEventoRabbit(ventaGuardada);

        return ventaGuardada;
    }

    private void enviarEventoRabbit(Venta venta) {
        String mensaje = venta.getIdProducto() + ":" + venta.getCantidad();

        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            RabbitMQConfig.ROUTING_KEY,
            mensaje
        );
    }

    @Override
    public List<Venta> listarTodasLasVentas() {
        return ventaRepository.findAll();
    }

    @Override
    public Optional<Venta> obtenerVentaPorId(Long id) {
        return ventaRepository.findById(id);
    }

    @Override
    public List<Venta> obtenerVentasPorUsuario(Long idUsuario) {
        return ventaRepository.findByIdUsuario(idUsuario);
    }
}