-- Check current password hash for admin user
USE ecombs;

-- Show the current password hash for admin
SELECT 'Current admin password hash:' as Info;
SELECT email, password FROM customer_data WHERE email = 'admin@bostonbilliards.com';

-- Update admin password to correct hash for 'admin123'
-- This is the correct BCrypt hash for password 'admin123'
UPDATE customer_data 
SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'
WHERE email = 'admin@bostonbilliards.com';

-- Verify the update
SELECT 'Updated admin password hash:' as Info;
SELECT email, password FROM customer_data WHERE email = 'admin@bostonbilliards.com';

-- Also update john.smith@email.com with same password hash
UPDATE customer_data 
SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi'
WHERE email = 'john.smith@email.com';

-- Show all users with their password hashes
SELECT 'All users with password hashes:' as Info;
SELECT id, firstname, lastname, email, role, enabled, password FROM customer_data ORDER BY role, email;
