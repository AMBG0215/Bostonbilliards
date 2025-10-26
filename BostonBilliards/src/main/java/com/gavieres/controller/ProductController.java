package com.gavieres.controller;

import com.gavieres.entity.ProductData;
import com.gavieres.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<ProductData>> getAllProducts() {
        List<ProductData> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductData> getProductById(@PathVariable Long id) {
        Optional<ProductData> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ProductData>> getProductsByCategory(@PathVariable String categoryName) {
        List<ProductData> products = productService.getProductsByCategory(categoryName);
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ProductData>> searchProducts(@RequestParam String name) {
        List<ProductData> products = productService.searchProducts(name);
        return ResponseEntity.ok(products);
    }
    
    @PostMapping
    public ResponseEntity<ProductData> createProduct(@RequestBody ProductData product) {
        ProductData savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductData> updateProduct(@PathVariable Long id, @RequestBody ProductData product) {
        product.setId(id);
        ProductData updatedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(updatedProduct);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}