package com.gavieres.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "product_data")
public class ProductData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoryName")
    private String categoryName;

    @Column(name = "description")
    private String description;

    @Column(name = "imageFile")
    private String imageFile;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private String price;

    @Column(name = "unitOfMeasure")
    private String unitOfMeasure;

    // Constructors
    public ProductData() {}

    public ProductData(String categoryName, String description, String imageFile, String name, String price, String unitOfMeasure) {
        this.categoryName = categoryName;
        this.description = description;
        this.imageFile = imageFile;
        this.name = name;
        this.price = price;
        this.unitOfMeasure = unitOfMeasure;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageFile() {
        return imageFile;
    }

    public void setImageFile(String imageFile) {
        this.imageFile = imageFile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getUnitOfMeasure() {
        return unitOfMeasure;
    }

    public void setUnitOfMeasure(String unitOfMeasure) {
        this.unitOfMeasure = unitOfMeasure;
    }
}
