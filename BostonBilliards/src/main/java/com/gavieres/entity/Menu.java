package com.gavieres.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "menu_data")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "routerPath")
    private String routerPath;
    
    @Column(name = "categoryName")
    private String categoryName;
    
    @Column(name = "icon")
    private String icon;
    
    // Constructors
    public Menu() {}
    
    public Menu(String name, String description, String routerPath, String categoryName, String icon) {
        this.name = name;
        this.description = description;
        this.routerPath = routerPath;
        this.categoryName = categoryName;
        this.icon = icon;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getRouterPath() {
        return routerPath;
    }
    
    public void setRouterPath(String routerPath) {
        this.routerPath = routerPath;
    }
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
}