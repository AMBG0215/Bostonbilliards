    -- Create new admin with CUSTOM PASSWORD
-- CHANGE THE PASSWORD BELOW TO YOUR DESIRED PASSWORD
USE ecombs;

-- Temporarily disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Delete ALL existing admin users first
DELETE FROM customer_data WHERE role = 'ADMIN';
SELECT 'All existing admins have been deleted' AS 'Status';

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

-- Insert new admin user
-- Email: newadmin@bostonbilliards.com
-- Password: admin123 (CHANGE THE HASH BELOW IF YOU WANT A DIFFERENT PASSWORD)
INSERT INTO customer_data (
    firstname, 
    middlename, 
    lastname, 
    email, 
    phone, 
    address, 
    city, 
    state, 
    zipCode, 
    password, 
    role, 
    enabled, 
    created, 
    lastUpdated
) VALUES (
    'New',
    NULL,
    'Admin',
    'bostonbilliards@gmail.com',
    '555-111-2222',
    '100 Admin Street',
    'Boston',
    'MA',
    '02101',
    '$2a$10$Z/Ie1mqq7kcpUDkuA7S5Le73h.nMu3HQxh2feqgBn5bC2ggiF7LOa',  -- This is VERIFIED BCrypt hash for "admin123"
    'ADMIN',
    TRUE,
    NOW(),
    NOW()
);

