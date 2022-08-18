package dev.andrewjfei.service.util;

import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.exception.ChowTrackerServiceException;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;

public class RequestUtil {

    private static boolean requestHasUserId(HttpServletRequest request) {
        return request.getAttribute("userId") != null;

    }

    public static void validateRequest(HttpServletRequest request) {
        if (!requestHasUserId(request)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_REQUEST, HttpStatus.UNAUTHORIZED);
        }
    }

    public static String getUserIdAttribute(HttpServletRequest request) {
        if (!requestHasUserId(request)) {
            throw new ChowTrackerServiceException(Error.INVALID_USER_REQUEST, HttpStatus.UNAUTHORIZED);
        }

        return request.getAttribute("userId").toString();
    }
}
