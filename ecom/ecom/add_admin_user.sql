-- Add admin user with correct password hash for 'admin123'
USE ecombs;

-- First, check if admin already exists
SELECT 'Checking if admin exists...' as Status;
SELECT COUNT(*) as admin_count FROM customer_data WHERE email = 'admin@bostonbilliards.com';

-- Delete existing admin if exists (to avoid duplicates)
DELETE FROM customer_data WHERE email = 'admin@bostonbilliards.com';

-- Insert admin user with correct password hash
-- Password: admin123
-- Hash: $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES ('Admin', NULL, 'User', 'admin@bostonbilliards.com', '555-000-0000', '123 Admin St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN', TRUE, NOW(), NOW());

-- Verify admin was created
SELECT 'Admin user created successfully!' as Status;
SELECT id, firstname, lastname, email, role, enabled FROM customer_data WHERE email = 'admin@bostonbilliards.com';

-- Also add a test customer with same password
INSERT INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES ('John', NULL, 'Smith', 'john.smith@email.com', '123-456-7890', '123 Main St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW());

-- Show all users
SELECT 'All users in database:' as Info;
SELECT id, firstname, lastname, email, role, enabled FROM customer_data ORDER BY role, email;
