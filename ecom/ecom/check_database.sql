-- Check if customer_data table has authentication fields
USE ecombs;

-- Check if the table exists
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Table customer_data exists'
        ELSE 'Table customer_data does not exist'
    END as table_status
FROM information_schema.tables 
WHERE table_schema = 'ecombs' 
AND table_name = 'customer_data';

-- Check if authentication columns exist
SELECT 
    CASE 
        WHEN COUNT(*) >= 3 THEN 'Authentication fields exist (password, role, enabled)'
        ELSE 'Authentication fields missing - need to run update script'
    END as auth_status
FROM information_schema.columns 
WHERE table_schema = 'ecombs' 
AND table_name = 'customer_data' 
AND column_name IN ('password', 'role', 'enabled');

-- Show current table structure
DESCRIBE customer_data;
