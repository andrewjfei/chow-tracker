package dev.andrewjfei.service.util;

import dev.andrewjfei.service.enumeration.Error;
import dev.andrewjfei.service.exception.ChowTrackerServiceException;
import org.springframework.http.HttpStatus;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public class KeyGenerator {

    private static KeyPairGenerator keyPairGenerator;
    private static final Integer keySize = 2048;
    private static KeyPair rsaKeyPair;

    private static void generateRSAKeyPair() {
        try {
            keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(keySize);
            rsaKeyPair = keyPairGenerator.generateKeyPair();
        } catch (NoSuchAlgorithmException noSuchAlgorithmException) {
            throw new ChowTrackerServiceException(Error.JWT_CREATION_FAILURE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public static RSAPublicKey getRSAPublicKey() {
        if (rsaKeyPair == null) {
            generateRSAKeyPair();
        }

        return (RSAPublicKey) rsaKeyPair.getPublic();
    }

    static public RSAPrivateKey getRSAPrivateKey() {
        if (rsaKeyPair == null) {
            generateRSAKeyPair();
        }

        return (RSAPrivateKey) rsaKeyPair.getPrivate();
    }
}
