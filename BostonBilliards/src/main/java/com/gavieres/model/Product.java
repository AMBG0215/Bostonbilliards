package com.gavieres.model;

import lombok.Data;

@Data
public class Product {
    private int id;
    private String name;
    private String description;
    private String categoryName;
    private String price;
    private String unitOfMeasure;
    private String imageFile;
}
