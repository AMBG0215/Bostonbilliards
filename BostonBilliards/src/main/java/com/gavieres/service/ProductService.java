package com.gavieres.service;

import com.gavieres.entity.ProductData;
import com.gavieres.repository.ProductDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductDataRepository productDataRepository;
    
    public List<ProductData> getAllProducts() {
        return productDataRepository.findAll();
    }
    
    public Optional<ProductData> getProductById(Long id) {
        return productDataRepository.findById(id);
    }
    
    public List<ProductData> getProductsByCategory(String categoryName) {
        return productDataRepository.findByCategoryName(categoryName);
    }
    
    public List<ProductData> searchProducts(String name) {
        return productDataRepository.findByNameContainingIgnoreCase(name);
    }
    
    public ProductData saveProduct(ProductData product) {
        return productDataRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        productDataRepository.deleteById(id);
    }
}