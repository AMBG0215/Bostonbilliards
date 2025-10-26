package com.gavieres.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String email;
    private String role;
    private String fullName;
    private Long userId;
}
