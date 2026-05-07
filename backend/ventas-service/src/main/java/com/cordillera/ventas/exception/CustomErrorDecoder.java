package com.cordillera.ventas.exception;

import feign.Response;
import feign.codec.ErrorDecoder;

public class CustomErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        if (response.status() == 404) {
            return new RuntimeException("Error: El usuario o producto solicitado no existe en el sistema.");
        }
        return new Default().decode(methodKey, response);
    }
}