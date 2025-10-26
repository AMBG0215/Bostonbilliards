-- Fix the prices for the two gloves that were entered with wrong decimal separator
USE ecombs;

-- Update Cuetec Axis Navy Glove (ID 19)
UPDATE product_data 
SET price = '1,875.00'
WHERE id = 19 AND name = 'Cuetec Axis Navy Glove';

-- Update Cuetec Axis Grey Glove (ID 20)
UPDATE product_data 
SET price = '1,875.00'
WHERE id = 20 AND name = 'Cuetec Axis Grey Glove';

-- Verify the changes
SELECT id, name, price, unitOfMeasure 
FROM product_data 
WHERE id IN (19, 20);

SELECT 'Glove prices updated successfully!' as Status;

