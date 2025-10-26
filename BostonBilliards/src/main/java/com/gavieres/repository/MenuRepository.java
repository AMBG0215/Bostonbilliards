package com.gavieres.repository;

import com.gavieres.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByCategoryName(String categoryName);
}