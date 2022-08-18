package dev.andrewjfei.service.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CryptoUtil {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String encryptPassword(String password) {
        return encoder.encode(password);
    }

    public static boolean isPasswordValid(String password, String encryptedPassword) {
        return encoder.matches(password, encryptedPassword);
    }

}
