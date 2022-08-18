package dev.andrewjfei.service.exception;

import com.auth0.jwt.exceptions.JWTDecodeException;
import dev.andrewjfei.service.dto.ErrorDto;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.util.MapperUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorDto> handleException(Exception exception) {
        if (exception instanceof ChowTrackerServiceException) {
            ChowTrackerServiceException chowTrackerServiceException = (ChowTrackerServiceException) exception;
            return new ResponseEntity<>(MapperUtil.toDto(chowTrackerServiceException.getError()), chowTrackerServiceException.getHttpStatus());
        } else if (exception instanceof JWTDecodeException) {
            return new ResponseEntity<>(MapperUtil.toDto(Error.JWT_VERIFICATION_FAILURE), HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            System.out.println(exception);
            return new ResponseEntity<>(MapperUtil.toDto(Error.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
