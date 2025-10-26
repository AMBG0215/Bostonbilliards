package com.gavieres.controller;

import com.gavieres.model.Customer;
import com.gavieres.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/api/customer")
    public ResponseEntity<?> getAllCustomers() {
        ResponseEntity<?> response;
        try {
            List<Customer> customers = customerService.getAll();
            log.info("Retrieved {} billiards store customers", customers.size());
            response = ResponseEntity.ok(customers);
        } catch (Exception ex) {
            log.error("Failed to retrieve customers: {}", ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }

    @GetMapping("/api/customer/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable final Integer id) {
        log.info("Getting customer with id: " + id);
        ResponseEntity<?> response;
        try {
            Customer customer = customerService.get(id);
            response = ResponseEntity.ok(customer);
        } catch (Exception ex) {
            log.error("Failed to retrieve customer with id {}: {}", id, ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }

    @PutMapping("/api/customer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) {
        log.info("Adding new customer: " + customer.toString());
        ResponseEntity<?> response;
        try {
            Customer newCustomer = customerService.create(customer);
            log.info("Created customer: " + newCustomer.toString());
            response = ResponseEntity.ok(newCustomer);
        } catch (Exception ex) {
            log.error("Failed to create customer: {}", ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }

    @PostMapping("/api/customer")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer customer) {
        log.info("Updating customer: " + customer.toString());
        ResponseEntity<?> response;
        try {
            Customer updatedCustomer = customerService.update(customer);
            response = ResponseEntity.ok(updatedCustomer);
        } catch (Exception ex) {
            log.error("Failed to update customer: {}", ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }

    @DeleteMapping("/api/customer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable final Integer id) {
        log.info("Deleting customer with id: " + id);
        ResponseEntity<?> response;
        try {
            customerService.delete(id);
            response = ResponseEntity.ok("Customer deleted successfully");
        } catch (Exception ex) {
            log.error("Failed to delete customer with id {}: {}", id, ex.getMessage(), ex);
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
        }
        return response;
    }
}
