package com.cordillera.inventario_service.mq;

import com.cordillera.inventario_service.config.RabbitMQConfig;
import com.cordillera.inventario_service.service.ProductoService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "inventario.rabbitmq.enabled", havingValue = "true")
public class VentaListener {

    @Autowired
    private ProductoService productoService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void procesarDescuentoStock(String mensaje) {
        try {
          
            String[] partes = mensaje.split(":");
            Long productoId = Long.parseLong(partes[0]);
            Integer cantidad = Integer.parseInt(partes[1]);

            productoService.descontarStock(productoId, cantidad);

            System.out.println(">>> [RabbitMQ] Stock actualizado para el producto ID: " + productoId);
        } catch (Exception e) {
            System.err.println("Error procesando mensaje de RabbitMQ: " + e.getMessage());
        }
    }
}
