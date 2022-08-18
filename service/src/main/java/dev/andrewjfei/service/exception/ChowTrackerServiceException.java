package dev.andrewjfei.service.exception;

import dev.andrewjfei.service.enumeration.Error;
import org.springframework.http.HttpStatus;

public class ChowTrackerServiceException extends RuntimeException {

    private final Error error;
    private final HttpStatus httpStatus;

    public ChowTrackerServiceException(Error error, HttpStatus httpStatus) {
        this.error = error;
        this.httpStatus = httpStatus;
    }

    public Error getError() {
        return error;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
