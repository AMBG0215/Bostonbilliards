package com.gavieres.util;

import com.gavieres.entity.CustomerData;
import com.gavieres.entity.ProductData;
import com.gavieres.model.Customer;
import com.gavieres.model.Product;

public class Transform {
    
    public static Product toModel(ProductData entity) {
        if (entity == null) {
            return null;
        }
        
        Product model = new Product();
        model.setId(entity.getId().intValue());
        model.setName(entity.getName());
        model.setDescription(entity.getDescription());
        model.setCategoryName(entity.getCategoryName());
        model.setImageFile(entity.getImageFile());
        model.setPrice(entity.getPrice());
        model.setUnitOfMeasure(entity.getUnitOfMeasure());
        
        return model;
    }

    public static Customer toCustomer(CustomerData entity) {
        if (entity == null) {
            return null;
        }
        
        Customer customer = new Customer();
        customer.setId(entity.getId().intValue());
        customer.setFirstname(entity.getFirstname());
        customer.setMiddlename(entity.getMiddlename());
        customer.setLastname(entity.getLastname());
        customer.setEmail(entity.getEmail());
        customer.setPhone(entity.getPhone());
        customer.setAddress(entity.getAddress());
        customer.setCity(entity.getCity());
        customer.setState(entity.getState());
        customer.setZipCode(entity.getZipCode());
        
        return customer;
    }

    public static CustomerData toCustomerData(Customer customer) {
        if (customer == null) {
            return null;
        }
        
        CustomerData customerData = new CustomerData();
        if (customer.getId() != 0) {
            customerData.setId((long) customer.getId());
        }
        customerData.setFirstname(customer.getFirstname());
        customerData.setMiddlename(customer.getMiddlename());
        customerData.setLastname(customer.getLastname());
        customerData.setEmail(customer.getEmail());
        customerData.setPhone(customer.getPhone());
        customerData.setAddress(customer.getAddress());
        customerData.setCity(customer.getCity());
        customerData.setState(customer.getState());
        customerData.setZipCode(customer.getZipCode());
        
        return customerData;
    }
}
