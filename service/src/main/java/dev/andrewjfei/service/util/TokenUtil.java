package dev.andrewjfei.service.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import dev.andrewjfei.service.dao.UserDao;
import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.exception.ChowTrackerServiceException;
import org.springframework.http.HttpStatus;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.time.Instant;

public class TokenUtil {

    private static final RSAPublicKey rsaPublicKey = KeyGenerator.getRSAPublicKey();
    private static final RSAPrivateKey rsaPrivateKey = KeyGenerator.getRSAPrivateKey();
    private static final String issuer = "auth0";

    public static String generateUserAuthToken(UserDao userDAO) {
        try {
            Algorithm algorithm = Algorithm.RSA256(rsaPublicKey, rsaPrivateKey);
            return JWT.create()
                    .withIssuer(issuer)
                    .withClaim("id", userDAO.getId())
                    .withClaim("username", userDAO.getUsername())
                    .withClaim("firstName", userDAO.getFirstName())
                    .withClaim("lastName", userDAO.getLastName())
                    .withClaim("email", userDAO.getEmail())
                    .withExpiresAt(Instant.now().plusSeconds(3600)) // Token valid for 1 hour
                    .sign(algorithm);
        } catch (JWTCreationException jwtCreationException) {
            throw new ChowTrackerServiceException(Error.JWT_CREATION_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static DecodedJWT validateUserAuthToken(String token) {
        try {
            Algorithm algorithm = Algorithm.RSA256(rsaPublicKey, rsaPrivateKey);
            JWTVerifier tokenVerifier = JWT.require(algorithm).withIssuer(issuer).build();
            return tokenVerifier.verify(token);
        } catch (SignatureVerificationException signatureVerificationException) {
            throw new ChowTrackerServiceException(Error.JWT_VERIFICATION_FAILURE, HttpStatus.UNAUTHORIZED);
        } catch (TokenExpiredException tokenExpiredException) {
            throw new ChowTrackerServiceException(Error.JWT_TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
        }
    }
}
