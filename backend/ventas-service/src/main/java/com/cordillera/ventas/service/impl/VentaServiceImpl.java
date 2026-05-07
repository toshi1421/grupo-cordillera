package com.cordillera.ventas.service.impl;

import com.cordillera.ventas.clients.InventarioClient;
import com.cordillera.ventas.clients.UsuarioClient;
import com.cordillera.ventas.config.RabbitMQConfig;
import com.cordillera.ventas.dto.VentaEvent;
import com.cordillera.ventas.dto.VentaSolicitud;
import com.cordillera.ventas.model.Venta;
import com.cordillera.ventas.repository.VentaRepository;
import com.cordillera.ventas.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${spring.rabbitmq.listener.simple.auto-startup:false}")
    private boolean rabbitEnabled;

    @Override
    @Transactional
    public Venta crearVenta(Venta venta) {
      
        boolean tieneStock = inventarioClient.verificarStock(venta.getIdProducto(), venta.getCantidad());
        
        if (!tieneStock) {
            throw new RuntimeException("No hay stock suficiente para realizar la venta");
        }

        venta.setFecha(LocalDateTime.now());
        Venta nuevaVenta = ventaRepository.save(venta);

        VentaEvent evento = new VentaEvent(
            nuevaVenta.getId(),
            nuevaVenta.getIdUsuario(),
            nuevaVenta.getIdProducto(),
            nuevaVenta.getCantidad(),
            nuevaVenta.getTotal(),
            nuevaVenta.getFecha()
        );

        rabbitTemplate.convertAndSend("inventario.exchange", "inventario.routing.key", evento);

        return nuevaVenta;
    }

    @Override
    @Transactional
    public Venta procesarVenta(VentaSolicitud solicitud) {
        usuarioClient.obtenerUsuarioPorId(solicitud.getIdUsuario());

        Venta nuevaVenta = new Venta();
        nuevaVenta.setIdUsuario(solicitud.getIdUsuario());
        nuevaVenta.setIdProducto(solicitud.getIdProducto());
        nuevaVenta.setCantidad(solicitud.getCantidad());
        nuevaVenta.setTotal(solicitud.getTotal());

        Venta ventaGuardada = ventaRepository.save(nuevaVenta);

        if (rabbitEnabled) {
            String mensaje = solicitud.getIdProducto() + ":" + solicitud.getCantidad();
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.ROUTING_KEY, mensaje);
        }

        return ventaGuardada;
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
