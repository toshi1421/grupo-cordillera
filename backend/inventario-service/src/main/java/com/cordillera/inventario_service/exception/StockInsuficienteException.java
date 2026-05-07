package com.cordillera.inventario_service.exception;

public class StockInsuficienteException extends RuntimeException {
    public StockInsuficienteException(String producto, Integer solicitado, Integer disponible) {
        super("Stock insuficiente para '" + producto + "'. Solicitaste " + solicitado + " pero solo quedan " + disponible + " unidades.");
    }
}
