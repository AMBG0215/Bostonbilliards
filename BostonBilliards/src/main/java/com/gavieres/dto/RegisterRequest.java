package com.gavieres.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstname;
    private String middlename;
    private String lastname;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
}
