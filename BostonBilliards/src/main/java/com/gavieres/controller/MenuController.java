package com.gavieres.controller;

import com.gavieres.entity.Menu;
import com.gavieres.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:4200")
public class MenuController {
    
    @Autowired
    private MenuService menuService;
    
    @GetMapping
    public ResponseEntity<List<Menu>> getAllMenus() {
        List<Menu> menus = menuService.getAllMenus();
        return ResponseEntity.ok(menus);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable Long id) {
        Optional<Menu> menu = menuService.getMenuById(id);
        return menu.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Menu>> getMenusByCategory(@PathVariable String categoryName) {
        List<Menu> menus = menuService.getMenusByCategory(categoryName);
        return ResponseEntity.ok(menus);
    }
    
    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) {
        Menu savedMenu = menuService.saveMenu(menu);
        return ResponseEntity.ok(savedMenu);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Menu> updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        menu.setId(id);
        Menu updatedMenu = menuService.saveMenu(menu);
        return ResponseEntity.ok(updatedMenu);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }
}