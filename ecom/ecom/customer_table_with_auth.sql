-- Complete customer_data table setup with authentication fields
USE ecombs;

-- Drop table if exists
DROP TABLE IF EXISTS customer_data;

-- Create customer_data table with authentication fields
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

-- Insert sample customers with proper password hashes
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) VALUES
('John', 'Michael', 'Smith', 'john.smith@email.com', '123-456-7890', '123 Main St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Maria', NULL, 'Garcia', 'maria.garcia@email.com', '234-567-8901', '456 Oak Ave', 'Cambridge', 'MA', '02138', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('David', 'James', 'Wilson', 'david.wilson@email.com', '345-678-9012', '789 Elm St', 'Somerville', 'MA', '02143', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Jennifer', NULL, 'Brown', 'jennifer.brown@email.com', '456-789-0123', '321 Pine St', 'Brookline', 'MA', '02445', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Michael', 'Robert', 'Davis', 'michael.davis@email.com', '567-890-1234', '654 Maple Dr', 'Newton', 'MA', '02458', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW());

-- Create admin user
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES ('Admin', NULL, 'User', 'admin@bostonbilliards.com', '555-000-0000', '123 Admin St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN', TRUE, NOW(), NOW());

SELECT 'Customer table created successfully with authentication fields!' as Status;
SELECT COUNT(*) as 'Total Customers' FROM customer_data;
SELECT role, COUNT(*) as 'Count' FROM customer_data GROUP BY role;

-- Show the admin credentials
SELECT 'Admin Login Credentials:' as Info;
SELECT 'Email: admin@bostonbilliards.com' as Email;
SELECT 'Password: admin123' as Password;
