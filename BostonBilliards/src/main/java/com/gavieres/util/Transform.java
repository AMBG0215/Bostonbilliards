package com.gavieres.util;

import com.gavieres.entity.ProductData;
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
}
