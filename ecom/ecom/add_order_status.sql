-- Add order status management to the database
USE ecombs;

-- Add status column to order_item_data table
ALTER TABLE order_item_data 
ADD COLUMN order_status VARCHAR(50) DEFAULT 'PENDING';

-- Add admin_notes column for admin comments
ALTER TABLE order_item_data 
ADD COLUMN admin_notes TEXT;

-- Update existing orders to have PENDING status
UPDATE order_item_data SET order_status = 'PENDING' WHERE order_status IS NULL;

-- Show the updated table structure
DESCRIBE order_item_data;

-- Show current orders with their status
SELECT 'Current orders with status:' as Info;
SELECT id, orderId, customerName, productName, quantity, price, status, order_status, admin_notes, created 
FROM order_item_data 
ORDER BY created DESC;
