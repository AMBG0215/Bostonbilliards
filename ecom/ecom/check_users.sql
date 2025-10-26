-- Check if admin user exists and verify password hash
USE ecombs;

-- Check all users
SELECT 'All users in database:' as Info;
SELECT id, firstname, lastname, email, role, enabled, password FROM customer_data ORDER BY role, email;

-- Check specifically for admin
SELECT 'Admin user check:' as Info;
SELECT id, firstname, lastname, email, role, enabled, password 
FROM customer_data 
WHERE email = 'admin@bostonbilliards.com';

-- Check if any users exist at all
SELECT 'Total users:' as Info;
SELECT COUNT(*) as user_count FROM customer_data;
