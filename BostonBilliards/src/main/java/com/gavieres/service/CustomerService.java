package com.gavieres.service;

import com.gavieres.entity.CustomerData;
import com.gavieres.model.Customer;
import com.gavieres.repository.CustomerDataRepository;
import com.gavieres.util.Transform;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomerService {

    @Autowired
    private CustomerDataRepository customerDataRepository;

    public List<Customer> getAll() {
        List<CustomerData> customerDataList = customerDataRepository.findAll();
        return customerDataList.stream()
                .map(Transform::toCustomer)
                .collect(Collectors.toList());
    }
    
    public Customer create(Customer customer) {
        CustomerData customerData = Transform.toCustomerData(customer);
        CustomerData savedCustomerData = customerDataRepository.save(customerData);
        return Transform.toCustomer(savedCustomerData);
    }
    
    public Customer update(Customer customer) {
        Optional<CustomerData> existingCustomerOpt = customerDataRepository.findById((long) customer.getId());
        if (existingCustomerOpt.isEmpty()) {
            throw new RuntimeException("Customer not found with id: " + customer.getId());
        }
        
        CustomerData existingCustomer = existingCustomerOpt.get();
        existingCustomer.setFirstname(customer.getFirstname());
        existingCustomer.setMiddlename(customer.getMiddlename());
        existingCustomer.setLastname(customer.getLastname());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());
        existingCustomer.setAddress(customer.getAddress());
        existingCustomer.setCity(customer.getCity());
        existingCustomer.setState(customer.getState());
        existingCustomer.setZipCode(customer.getZipCode());
        
        CustomerData updatedCustomerData = customerDataRepository.save(existingCustomer);
        return Transform.toCustomer(updatedCustomerData);
    }
    
    public void delete(int id) {
        customerDataRepository.deleteById((long) id);
    }
    
    public Customer get(int id) {
        Optional<CustomerData> customerDataOpt = customerDataRepository.findById((long) id);
        if (customerDataOpt.isEmpty()) {
            throw new RuntimeException("Customer not found with id: " + id);
        }
        return Transform.toCustomer(customerDataOpt.get());
    }
}
