package com.gavieres.service;

import com.gavieres.entity.Menu;
import com.gavieres.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    
    @Autowired
    private MenuRepository menuRepository;
    
    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }
    
    public Optional<Menu> getMenuById(Long id) {
        return menuRepository.findById(id);
    }
    
    public List<Menu> getMenusByCategory(String categoryName) {
        return menuRepository.findByCategoryName(categoryName);
    }
    
    public Menu saveMenu(Menu menu) {
        return menuRepository.save(menu);
    }
    
    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
}