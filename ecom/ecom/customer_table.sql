-- Add customer_data table to the ecombs database
USE ecombs;

-- Drop table if exists
DROP TABLE IF EXISTS customer_data;

-- Create customer_data table
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
   created DATETIME DEFAULT NULL,
   lastUpdated DATETIME DEFAULT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample customers
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, created, lastUpdated) VALUES
('John', 'Michael', 'Smith', 'john.smith@email.com', '123-456-7890', '123 Main St', 'Boston', 'MA', '02101', NOW(), NOW()),
('Maria', NULL, 'Garcia', 'maria.garcia@email.com', '234-567-8901', '456 Oak Ave', 'Cambridge', 'MA', '02138', NOW(), NOW()),
('David', 'James', 'Wilson', 'david.wilson@email.com', '345-678-9012', '789 Elm St', 'Somerville', 'MA', '02143', NOW(), NOW()),
('Jennifer', NULL, 'Brown', 'jennifer.brown@email.com', '456-789-0123', '321 Pine St', 'Brookline', 'MA', '02445', NOW(), NOW()),
('Michael', 'Robert', 'Davis', 'michael.davis@email.com', '567-890-1234', '654 Maple Dr', 'Newton', 'MA', '02458', NOW(), NOW());

SELECT 'Customer table created successfully!' as Status;
SELECT COUNT(*) as 'Total Customers' FROM customer_data;

