package com.gavieres.service;

import com.gavieres.model.Customer;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {

    public List<Customer> getAll() {
        // Mock data for now - will be replaced with actual database calls
        List<Customer> customers = new ArrayList<>();
        
        Customer customer1 = new Customer();
        customer1.setId(1);
        customer1.setFirstname("John");
        customer1.setMiddlename("Michael");
        customer1.setLastname("Smith");
        customer1.setEmail("john.smith@email.com");
        customer1.setPhone("123-456-7890");
        customer1.setAddress("123 Main St, Boston, MA");
        customers.add(customer1);
        
        return customers;
    }
    
    public Customer create(Customer customer) {
        // Mock implementation - will be replaced with actual database save
        return customer;
    }
    
    public Customer update(Customer customer) {
        // Mock implementation - will be replaced with actual database update
        return customer;
    }
    
    public void delete(int id) {
        // Mock implementation - will be replaced with actual database delete
    }
    
    public Customer get(int id) {
        // Mock implementation - will be replaced with actual database query
        Customer customer = new Customer();
        customer.setId(id);
        customer.setFirstname("Sample");
        customer.setLastname("Customer");
        customer.setEmail("sample@email.com");
        return customer;
    }
}
