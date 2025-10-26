package com.gavieres.repository;

import com.gavieres.entity.ProductData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductDataRepository extends JpaRepository<ProductData, Long> {
    List<ProductData> findByCategoryName(String categoryName);
    List<ProductData> findByNameContainingIgnoreCase(String name);
}