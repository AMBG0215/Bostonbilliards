-- Test admin login credentials
USE ecombs;

-- Check if admin user exists
SELECT 'Checking admin user...' as Status;
SELECT id, firstname, lastname, email, role, enabled 
FROM customer_data 
WHERE email = 'admin@bostonbilliards.com';

-- Test password hash (this should match 'admin123')
SELECT 'Password hash for admin123:' as Info;
SELECT '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDi' as Expected_Hash;

-- Check all users
SELECT 'All users in database:' as Info;
SELECT id, firstname, lastname, email, role, enabled FROM customer_data ORDER BY role, email;
