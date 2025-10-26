-- Complete SQL script for Boston Billiards Admin Order Management System
-- Run this on your other device to set up the same functionality

USE ecombs;

-- ============================================
-- 1. ADD ORDER STATUS MANAGEMENT COLUMNS
-- ============================================

-- Add order_status column (skip if already exists)
ALTER TABLE order_item_data 
ADD COLUMN IF NOT EXISTS order_status VARCHAR(50) DEFAULT 'PENDING';

-- Add admin_notes column (skip if already exists)  
ALTER TABLE order_item_data 
ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Update existing orders to have PENDING status
UPDATE order_item_data 
SET order_status = 'PENDING' 
WHERE order_status IS NULL OR order_status = '';

-- ============================================
-- 2. CREATE ADMIN USER (if needed)
-- ============================================

-- Check if admin user exists
SELECT 'Checking for admin user...' as Status;
SELECT COUNT(*) as admin_count FROM customer_data WHERE email = 'admin@bostonbilliards.com';

-- Create admin user if it doesn't exist
INSERT IGNORE INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES ('Admin', NULL, 'User', 'admin@bostonbilliards.com', '555-000-0000', '123 Admin St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'ADMIN', TRUE, NOW(), NOW());

-- ============================================
-- 3. CREATE SAMPLE CUSTOMER ACCOUNTS
-- ============================================

-- Create sample customers with known password (admin123)
INSERT IGNORE INTO customer_data (firstname, middlename, lastname, email, phone, address, city, state, zipCode, password, role, enabled, created, lastUpdated) 
VALUES 
('John', NULL, 'Smith', 'john.smith@email.com', '123-456-7890', '123 Main St', 'Boston', 'MA', '02101', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Maria', NULL, 'Garcia', 'maria.garcia@email.com', '234-567-8901', '456 Oak Ave', 'Cambridge', 'MA', '02139', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('David', NULL, 'Wilson', 'david.wilson@email.com', '345-678-9012', '789 Pine St', 'Somerville', 'MA', '02144', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Jennifer', NULL, 'Brown', 'jennifer.brown@email.com', '456-789-0123', '321 Pine St', 'Brookline', 'MA', '02445', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW()),
('Michael', 'Robert', 'Davis', 'michael.davis@email.com', '567-890-1234', '654 Maple Dr', 'Newton', 'MA', '02458', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi', 'CUSTOMER', TRUE, NOW(), NOW());

-- ============================================
-- 4. VERIFY SETUP
-- ============================================

-- Show table structure
SELECT 'Updated table structure:' as Info;
DESCRIBE order_item_data;

-- Show all users
SELECT 'All users in database:' as Info;
SELECT id, firstname, lastname, email, role, enabled FROM customer_data ORDER BY role, email;

-- Show current orders with their status
SELECT 'Current orders with status:' as Info;
SELECT id, orderId, customerName, productName, quantity, price, order_status, admin_notes, created 
FROM order_item_data 
ORDER BY created DESC;

-- Show admin credentials
SELECT 'Admin Login Credentials:' as Info;
SELECT 'Email: admin@bostonbilliards.com' as Email;
SELECT 'Password: admin123' as Password;

-- Show customer credentials
SELECT 'Customer Login Credentials:' as Info;
SELECT 'Email: john.smith@email.com' as Email;
SELECT 'Password: admin123' as Password;

-- ============================================
-- 5. ORDER STATUS REFERENCE
-- ============================================

SELECT 'Available Order Statuses:' as Info;
SELECT 'PENDING - New orders waiting for admin review' as Status1;
SELECT 'ACCEPTED - Admin approved the order' as Status2;
SELECT 'REJECTED - Admin rejected the order' as Status3;
SELECT 'PROCESSING - Order is being prepared' as Status4;
SELECT 'SHIPPED - Order has been shipped' as Status5;
SELECT 'DELIVERED - Order completed' as Status6;

-- ============================================
-- 6. SAMPLE ORDER STATUS UPDATES (Optional)
-- ============================================

-- Example: Accept an order (replace 1 with actual order ID)
-- UPDATE order_item_data SET order_status = 'ACCEPTED', admin_notes = 'Order approved - payment verified' WHERE id = 1;

-- Example: Reject an order (replace 2 with actual order ID)  
-- UPDATE order_item_data SET order_status = 'REJECTED', admin_notes = 'Insufficient inventory' WHERE id = 2;

SELECT 'Database setup complete! Admin order management system is ready.' as Final_Status;