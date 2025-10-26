-- Update customer_data table to include authentication fields
USE ecombs;

-- Add new columns for authentication
ALTER TABLE customer_data 
ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT 'temp_password',
ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN enabled BOOLEAN NOT NULL DEFAULT TRUE;

-- Update existing customers with temporary passwords (they'll need to reset)
UPDATE customer_data SET password = '$2a$10$temp.password.hash.for.existing.users' WHERE password = 'temp_password';

-- Create an admin user
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES ('Admin', NULL, 'User', 'admin@bostonbilliards.com', '555-000-0000', '123 Admin St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN', TRUE, NOW(), NOW());

SELECT 'Customer table updated successfully with authentication fields!' as Status;
SELECT COUNT(*) as 'Total Customers' FROM customer_data;
SELECT role, COUNT(*) as 'Count' FROM customer_data GROUP BY role;
