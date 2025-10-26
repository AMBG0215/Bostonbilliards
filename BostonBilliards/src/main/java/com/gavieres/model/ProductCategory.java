package com.gavieres.model;

import java.util.List;

public class ProductCategory {
    private String categoryName;
    private List<Product> products;

    public ProductCategory() {}

    public ProductCategory(String categoryName, List<Product> products) {
        this.categoryName = categoryName;
        this.products = products;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
