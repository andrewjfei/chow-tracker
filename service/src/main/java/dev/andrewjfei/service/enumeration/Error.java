package dev.andrewjfei.service.enumeration;

public enum Error {
    INTERNAL_SERVER_ERROR(0, "An unexpected error has occurred."),
    UNSUCCESSFUL_AUTHENTICATION(1, "Authentication failed due to incorrect credentials."),
    INVALID_USER_ID(2, "The supplied user ID does not exist."),
    INVALID_CHOW_ID(3, "The supplied chow ID does not exist."),
    JWT_CREATION_FAILURE(4, "Failed to create authentication JSON web token."),
    JWT_VERIFICATION_FAILURE(5, "Failed to verify authentication JSON web token."),
    JWT_TOKEN_EXPIRED(6, "The supplied authentication token has expired."),
    INVALID_USER_REQUEST(7, "User does not have the right permissions to make this request."),
    INVALID_REQUEST_BODY(8, "Missing required properties in request body."),
    USERNAME_EXISTS(9, "Username already exists."),
    EMAIL_EXISTS(10, "Email already exists."),
    PASSWORD_MISMATCH(11, "Password and confirmed password do not match."),
    CHOW_NAME_EXISTS(12,"Chow name already exists.");

    public final Integer errorCode;
    public final String description;

    Error(Integer errorCode, String description) {
        this.errorCode = errorCode;
        this.description = description;
    }
}
