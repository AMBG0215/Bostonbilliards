-- Add customer_notes column to order_item_data table
USE ecombs;

-- Add customer_notes column (for customer questions/messages about their order)
ALTER TABLE order_item_data 
ADD COLUMN customer_notes TEXT DEFAULT NULL;

-- Show the updated table structure
SELECT 'customer_notes column added successfully!' AS Status;
DESCRIBE order_item_data;

-- Show example of how it looks
SELECT id, orderId, customerName, order_status, customer_notes, admin_notes 
FROM order_item_data 
LIMIT 5;

