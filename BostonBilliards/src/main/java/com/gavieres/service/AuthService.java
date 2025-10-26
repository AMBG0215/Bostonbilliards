package com.gavieres.service;

import com.gavieres.dto.AuthResponse;
import com.gavieres.dto.LoginRequest;
import com.gavieres.dto.RegisterRequest;
import com.gavieres.entity.CustomerData;
import com.gavieres.repository.CustomerDataRepository;
import com.gavieres.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private CustomerDataRepository customerDataRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        log.info("Registering new customer with email: {}", request.getEmail());
        
        // Check if email already exists
        Optional<CustomerData> existingCustomer = customerDataRepository.findByEmail(request.getEmail());
        if (existingCustomer.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new customer
        CustomerData customer = new CustomerData();
        customer.setFirstname(request.getFirstname());
        customer.setMiddlename(request.getMiddlename());
        customer.setLastname(request.getLastname());
        customer.setEmail(request.getEmail());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setZipCode(request.getZipCode());
        customer.setRole("CUSTOMER");
        customer.setEnabled(true);

        CustomerData savedCustomer = customerDataRepository.save(customer);
        log.info("Customer registered successfully with ID: {}", savedCustomer.getId());

        // Generate JWT token
        String token = jwtUtil.generateToken(savedCustomer.getEmail(), savedCustomer.getRole(), savedCustomer.getId());

        return new AuthResponse() {{
            setToken(token);
            setEmail(savedCustomer.getEmail());
            setRole(savedCustomer.getRole());
            setFullName(savedCustomer.getFullName());
            setUserId(savedCustomer.getId());
        }};
    }

    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for email: {}", request.getEmail());
        
        Optional<CustomerData> customerOpt = customerDataRepository.findByEmail(request.getEmail());
        if (customerOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        CustomerData customer = customerOpt.get();
        if (!customer.getEnabled()) {
            throw new RuntimeException("Account is disabled");
        }

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        log.info("Login successful for customer: {}", customer.getEmail());

        // Generate JWT token
        String token = jwtUtil.generateToken(customer.getEmail(), customer.getRole(), customer.getId());

        return new AuthResponse() {{
            setToken(token);
            setEmail(customer.getEmail());
            setRole(customer.getRole());
            setFullName(customer.getFullName());
            setUserId(customer.getId());
        }};
    }

    public CustomerData getCustomerByEmail(String email) {
        return customerDataRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}
