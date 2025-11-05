package com.projetoconclusaocedup.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoder {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String encrypt(String password) {
        return encoder.encode(password);
    }

    public boolean verify(String writtenPassword, String encryptedPassword) {
        return encoder.matches(writtenPassword, encryptedPassword);
    }
}