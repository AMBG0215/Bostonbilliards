package com.gavieres.controller;

import com.gavieres.dto.AuthResponse;
import com.gavieres.dto.LoginRequest;
import com.gavieres.dto.RegisterRequest;
import com.gavieres.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            log.info("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error("Registration failed for email {}: {}", request.getEmail(), ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            log.info("Login successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error("Login failed for email {}: {}", request.getEmail(), ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        }
    }
}
