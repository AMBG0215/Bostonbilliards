-- Fixed database schema for Boston Billiards with authentication
-- This script corrects the issues in your current database

-- Create database
CREATE DATABASE IF NOT EXISTS ecombs;
USE ecombs;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS order_item_data;
DROP TABLE IF EXISTS product_data;
DROP TABLE IF EXISTS menu_data;
DROP TABLE IF EXISTS customer_data;
DROP TABLE IF EXISTS hibernate_sequence;

-- Customer data table with authentication fields
CREATE TABLE customer_data (
   id BIGINT NOT NULL AUTO_INCREMENT,
   firstname VARCHAR(100) NOT NULL,
   middlename VARCHAR(100) DEFAULT NULL,
   lastname VARCHAR(100) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   phone VARCHAR(20) DEFAULT NULL,
   address VARCHAR(255) DEFAULT NULL,
   city VARCHAR(100) DEFAULT NULL,
   state VARCHAR(50) DEFAULT NULL,
   zipCode VARCHAR(20) DEFAULT NULL,
   password VARCHAR(255) NOT NULL,
   role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
   enabled BOOLEAN NOT NULL DEFAULT TRUE,
   created DATETIME DEFAULT NULL,
   lastUpdated DATETIME DEFAULT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Menu data table (for navigation)
CREATE TABLE menu_data (
   id INT NOT NULL,
   categoryName VARCHAR(255) DEFAULT NULL,
   description VARCHAR(255) DEFAULT NULL,
   icon VARCHAR(255) DEFAULT NULL,
   name VARCHAR(255) DEFAULT NULL,
   routerPath VARCHAR(255) DEFAULT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Product data table (billiards products) - CLEANED UP
CREATE TABLE product_data (
   id BIGINT NOT NULL AUTO_INCREMENT,
   categoryName VARCHAR(255) DEFAULT NULL,
   description TEXT DEFAULT NULL,
   imageFile VARCHAR(255) DEFAULT NULL,
   name VARCHAR(255) DEFAULT NULL,
   price DECIMAL(10,2) DEFAULT NULL,
   unitOfMeasure VARCHAR(255) DEFAULT NULL,
   created DATETIME DEFAULT NULL,
   lastUpdated DATETIME DEFAULT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Order item data table - CLEANED UP
CREATE TABLE order_item_data (
   id BIGINT NOT NULL AUTO_INCREMENT,
   created DATETIME DEFAULT NULL,
   customerId BIGINT NOT NULL,
   customerName VARCHAR(255) DEFAULT NULL,
   lastUpdated DATETIME DEFAULT NULL,
   orderId BIGINT NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   productCategoryName VARCHAR(255) DEFAULT NULL,
   productDescription TEXT DEFAULT NULL,
   productId BIGINT NOT NULL,
   productImageFile VARCHAR(255) DEFAULT NULL,
   productName VARCHAR(255) DEFAULT NULL,
   productUnitOfMeasure VARCHAR(255) DEFAULT NULL,
   quantity DECIMAL(10,2) NOT NULL,
   status INT DEFAULT 0,
   PRIMARY KEY (id),
   FOREIGN KEY (customerId) REFERENCES customer_data(id),
   FOREIGN KEY (productId) REFERENCES product_data(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Hibernate sequence table
CREATE TABLE hibernate_sequence (
   next_val BIGINT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample customers with authentication
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) VALUES
('John', 'Michael', 'Smith', 'john.smith@email.com', '123-456-7890', '123 Main St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Maria', NULL, 'Garcia', 'maria.garcia@email.com', '234-567-8901', '456 Oak Ave', 'Cambridge', 'MA', '02138', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('David', 'James', 'Wilson', 'david.wilson@email.com', '345-678-9012', '789 Elm St', 'Somerville', 'MA', '02143', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Jennifer', NULL, 'Brown', 'jennifer.brown@email.com', '456-789-0123', '321 Pine St', 'Brookline', 'MA', '02445', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Michael', 'Robert', 'Davis', 'michael.davis@email.com', '567-890-1234', '654 Maple Dr', 'Newton', 'MA', '02458', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW());

-- Create admin user
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES ('Admin', NULL, 'User', 'admin@bostonbilliards.com', '555-000-0000', '123 Admin St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN', TRUE, NOW(), NOW());

-- Insert menu data (billiards store navigation)
INSERT INTO menu_data VALUES
(20,'main','About us','home.svg','Home',''),
(21,'main','Billiard products','product.svg','Products','product'),
(22,'main','Profile','customer.svg','Customer','customer'),
(23,'main','Cart','cart.svg','Cart','cart'),
(24,'main','Order','order.svg','Orders','order'),
(25,'main','Location','contact.svg','Contact Us','contact');

-- Insert product data (billiards products) - CLEANED UP
INSERT INTO product_data (name, description, categoryName, imageFile, price, unitOfMeasure, created, lastUpdated) VALUES
('Predator Throne 3-3 Pool Cue', 'Stainless Steel Collar and crown-shaped Buttcape', 'Pool Cues', 'throne.jpg', 10599.00, 'piece', NOW(), NOW()),
('Predator SP4 Black/Blue No Wrap Pool Cue', 'Micarta Joint Collar and Butt Cap', 'Pool Cues', 'predator_black.jpg', 7999.00, 'piece', NOW(), NOW()),
('Cuetec Cynergy Truewood II Ebony 12.5mm - Leather Wrap', 'A+ grade kiln-dried Canadian Maple Core', 'Pool Cues', 'cuetec_cynergy.jpg', 33799.00, 'piece', NOW(), NOW()),
('Predator SP2 Revo Tuxedo 2 Pool Cue', 'C4+ Construction with Pearl White Collar & Butt Cap', 'Pool Cues', 'predator_revo.jpg', 25299.00, 'piece', NOW(), NOW()),
('Cuetec Chroma Series Pool Cue - Bordeaux', 'Kiln dried vacuum-sealed Canadian Maple', 'Pool Cues', 'cuetec_chroma.jpg', 22231.00, 'piece', NOW(), NOW()),
('Cuetec Avid Era Sneaky Pete 4PT Natural No Wrap Pool Cue', 'Super straight taper', 'Pool Cues', 'cuetec_avid.jpg', 25892.00, 'piece', NOW(), NOW()),
('Predator Aspire 1-9 Pool Cue', 'Purpleheart Forearm with Solid Maple Core for Extra Stability', 'Pool Cues', 'predator_aspire.jpg', 12789.00, 'piece', NOW(), NOW()),
('Predator P3 Onyx No Wrap Limited Edition', 'Uni-Loc weight cartridge system', 'Pool Cues', 'predator_onyx.jpg', 45560.00, 'piece', NOW(), NOW()),
('Aramith Tournament Black Pool Ball Set 2', 'Aramith Tournament Pool Ball', 'Billiard Balls', 'aramith_set2.jpg', 6840.00, 'set', NOW(), NOW()),
('Aramith Premium Pool Ball Set 2 1/4 inch', 'Aramith Premium Pool Ball', 'Billiard Balls', 'aramith_set.jpg', 8900.00, 'set', NOW(), NOW()),
('Raptor Phenolic Pool Ball Set 2 1/4 inch', 'Raptor Pool Ball', 'Billiard Balls', 'raptor.jpg', 4160.00, 'set', NOW(), NOW()),
('GR8 Billiards Pool Ball Set 2 1/4 inch', 'GR8 Pool Ball', 'Billiard Balls', 'GR8.jpg', 3500.00, 'set', NOW(), NOW()),
('Rasson Black Pool Table 9ft', 'MR-SUNG Hero', 'Pool Tables', 'black_table.jpg', 30200.00, 'table', NOW(), NOW()),
('Rasson Wolf Pool Table 9ft Black', '9 ft pool table', 'Pool Tables', 'wolf_table.jpg', 27510.00, 'table', NOW(), NOW()),
('Diamond Billiard Pro-Am Cherry Oak Pool Table 8ft', '8 ft pool table', 'Pool Tables', 'diamond_cherry.jpg', 13100.00, 'table', NOW(), NOW()),
('Diamond Pro-Am Black PRC Pool Table 8ft', '8ft pool table', 'Pool Tables', 'diamond_table.jpg', 16660.00, 'table', NOW(), NOW()),
('CPBA Glove Left Hand Powder Pink', 'CPBA Glove Left Hand Powder Pink Size XS - M', 'Accessories', 'pink.jpg', 1399.00, 'piece', NOW(), NOW()),
('CPBA Glove Left Hand Powder Blue', 'CPBA Glove Left Hand Powder Blue Size S - L', 'Accessories', 'blue.jpg', 1399.00, 'piece', NOW(), NOW()),
('Cuetec Axis Navy Glove', 'Cuetec Axis Navy Glove Left Hand Size S - XL', 'Accessories', 'darkblue.jpg', 1875.00, 'piece', NOW(), NOW()),
('Cuetec Axis Grey Glove', 'Cuetec Axis Grey Glove Left Hand Size S - XL', 'Accessories', 'grey.jpg', 1875.00, 'piece', NOW(), NOW());

-- Insert sample order items with proper foreign keys
INSERT INTO order_item_data (created, customerId, customerName, lastUpdated, orderId, price, productCategoryName, productDescription, productId, productImageFile, productName, productUnitOfMeasure, quantity, status) VALUES
('2024-10-16 14:30:53', 1, 'John Smith', '2024-10-16 14:30:53', 1, 25892.00, 'Pool Cues', 'Cuetec Avid Era Sneaky Pete 4PT Natural No Wrap Pool Cue', 6, 'cuetec_avid.jpg', 'Cuetec Avid Era Sneaky Pete 4PT Natural No Wrap Pool Cue', 'piece', 1, 1),
('2024-10-16 14:33:29', 2, 'Maria Garcia', '2024-10-16 14:33:29', 2, 25299.00, 'Pool Cues', 'Predator SP2 Revo Tuxedo 2 Pool Cue', 4, 'predator_revo.jpg', 'Predator SP2 Revo Tuxedo 2 Pool Cue', 'piece', 1, 1),
('2024-10-16 14:57:38', 3, 'David Wilson', '2024-10-16 14:57:38', 3, 10599.00, 'Pool Cues', 'Predator Throne 3-3 Pool Cue', 1, 'throne.jpg', 'Predator Throne 3-3 Pool Cue', 'piece', 1, 1),
('2024-10-23 10:30:22', 4, 'Jennifer Brown', '2024-10-23 10:30:22', 4, 8900.00, 'Billiard Balls', 'Aramith Premium Pool Ball Set 2 1/4 inch', 10, 'aramith_set.jpg', 'Aramith Premium Pool Ball Set 2 1/4 inch', 'set', 1, 1),
('2024-10-23 10:34:41', 5, 'Michael Davis', '2024-10-23 10:34:41', 5, 6840.00, 'Billiard Balls', 'Aramith Tournament Black Pool Ball Set 2', 9, 'aramith_set2.jpg', 'Aramith Tournament Black Pool Ball Set 2', 'set', 1, 1);

-- Insert hibernate sequence
INSERT INTO hibernate_sequence VALUES (40);

-- Display summary
SELECT 'Boston Billiards Database with Authentication Setup Complete!' as Status;
SELECT COUNT(*) as 'Customers' FROM customer_data;
SELECT COUNT(*) as 'Menu Items' FROM menu_data;
SELECT COUNT(*) as 'Products' FROM product_data;
SELECT COUNT(*) as 'Order Items' FROM order_item_data;
SELECT role, COUNT(*) as 'Count' FROM customer_data GROUP BY role;

-- Show admin credentials
SELECT 'Admin Login Credentials:' as Info;
SELECT 'Email: admin@bostonbilliards.com' as Email;
SELECT 'Password: admin123' as Password;
