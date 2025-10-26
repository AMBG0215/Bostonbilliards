package com.gavieres.model;

import lombok.Data;

@Data
public class Menu {
    private int id;
    private String name;
    private String description;
    private String routerPath;
    private String categoryName;
    private String icon;
}
