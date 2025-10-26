-- Create database
CREATE DATABASE IF NOT EXISTS ecombs;
USE ecombs;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS order_item_data;
DROP TABLE IF EXISTS product_data;
DROP TABLE IF EXISTS menu_data;
DROP TABLE IF EXISTS hibernate_sequence;

-- Menu data table (for navigation)
CREATE TABLE menu_data (
   id int NOT NULL,
   categoryName varchar(255) DEFAULT NULL,
   description varchar(255) DEFAULT NULL,
   icon varchar(255) DEFAULT NULL,
   name varchar(255) DEFAULT NULL,
   routerPath varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Product data table (billiards products)
CREATE TABLE product_data (
   id int NOT NULL,
   categoryName varchar(255) DEFAULT NULL,
   description varchar(255) DEFAULT NULL,
   imageFile varchar(255) DEFAULT NULL,
   name varchar(255) DEFAULT NULL,
   price varchar(255) DEFAULT NULL,
   unitOfMeasure varchar(255) DEFAULT NULL,
   created datetime DEFAULT NULL,
   customerId int NOT NULL,
   customerName varchar(255) DEFAULT NULL,
   lastUpdated datetime DEFAULT NULL,
   orderId int NOT NULL,
   productCategoryName varchar(255) DEFAULT NULL,
   productDescription varchar(255) DEFAULT NULL,
   productId int NOT NULL,
   productImageFile varchar(255) DEFAULT NULL,
   productName varchar(255) DEFAULT NULL,
   productUnitOfMeasure varchar(255) DEFAULT NULL,
   quantity double NOT NULL,
   status int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Order item data table
CREATE TABLE order_item_data (
   id int NOT NULL,
   created datetime DEFAULT NULL,
   customerId int NOT NULL,
   customerName varchar(255) DEFAULT NULL,
   lastUpdated datetime DEFAULT NULL,
   orderId int NOT NULL,
   price double NOT NULL,
   productCategoryName varchar(255) DEFAULT NULL,
   productDescription varchar(255) DEFAULT NULL,
   productId int NOT NULL,
   productImageFile varchar(255) DEFAULT NULL,
   productName varchar(255) DEFAULT NULL,
   productUnitOfMeasure varchar(255) DEFAULT NULL,
   quantity double NOT NULL,
   status int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Hibernate sequence table
CREATE TABLE  hibernate_sequence (
   next_val bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert menu data (billiards store navigation)
INSERT INTO menu_data VALUES
(20,'main','About us','home.svg','Home',''),
(21,'main','Billiard products','product.svg','Products','product'),
(22,'main','Profile','customer.svg','Customer','customer'),
(23,'main','Cart','cart.svg','Cart','cart'),
(24,'main','Order','order.svg','Orders','order'),
(25,'main','Location','contact.svg','Contact Us','contact');

-- Insert product data (billiards products)
INSERT INTO product_data VALUES
-- Insert product data with swapped name and description
INSERT INTO product_data VALUES
(1,'Pool Cues','Stainless Steel Collar and crown-shaped Buttcape','throne.jpg','Predator Throne 3-3 Pool Cue','10,599.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(2,'Pool Cues','Micarta Joint Collar and Butt Cap','predator_black.jpg','Predator SP4 Black/Blue No Wrap Pool Cue','7,999.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(3,'Pool Cues','A+ grade kiln-dried Canadian Maple Core','cuetec_cynergy.jpg','Cuetec Cynergy Truewood II Ebony 12.5mm - Leather Wrap','33,799.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(4,'Pool Cues','C4+ Construction with Pearl White Collar & Butt Cap','predator_revo.jpg','Predator SP2 Revo Tuxedo 2 Pool Cue','25,299.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(5,'Pool Cues','Kiln dried vacuum-sealed Canadian Maple','cuetec_chroma.jpg','Cuetec Chroma Series Pool Cue - Bordeaux','22,231.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(6,'Pool Cues','Super straight taper','cuetec_avid.jpg','Cuetec Avid Era Sneaky Pete 4PT Natural No Wrap Pool Cue','25,892.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(7,'Pool Cues','Purpleheart Forearm with Solid Maple Core for Extra Stability','predator_aspire.jpg','Predator Aspire 1-9 Pool Cue','12,789.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(8,'Pool Cues','Uni-Loc weight cartridge system','predator_onyx.jpg','Predator P3 Onyx No Wrap Limited Edition','45,560.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(9,'Billiard Balls','Aramith Tournament Pool Ball','aramith_set2.jpg','Aramith Tournament Black Pool Ball Set 2','6,840.00','set',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(10,'Billiard Balls','Aramith Premium Pool Ball','aramith_set.jpg','Aramith Premium Pool Ball Set 2 1/4 inch','8,900.00','set',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(11,'Billiard Balls','Raptor Pool Ball','raptor.jpg','Raptor Phenolic Pool Ball Set 2 1/4 inch','4,160.00','set',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(12,'Billiard Balls','GR8 Pool Ball','GR8.jpg','GR8 Billiards Pool Ball Set 2 1/4 inch','3,500.00','set',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(13,'Pool Tables','MR-SUNG Hero','black_table.jpg','Rasson Black Pool Table 9ft','30,200.00','table',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(14,'Pool Tables','9 ft pool table','wolf_table.jpg','Rasson Wolf Pool Table 9ft Black','27,510.00','table',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(15,'Pool Tables','8 ft pool table','diamond_cherry.jpg','Diamond Billiard Pro-Am Cherry Oak Pool Table 8ft','13,100.00','table',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(16,'Pool Tables','8ft pool table','diamond_table.jpg','Diamond Pro-Am Black PRC Pool Table 8ft','16,660.00','table',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(17,'Accessories','CPBA Glove Left Hand Powder Pink Size XS - M','pink.jpg','CPBA Glove Left Hand Powder Pink','1,399.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(18,'Accessories','CPBA Glove Left Hand Powder Blue Size S - L','blue.jpg','CPBA Glove Left Hand Powder Blue','1,399.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(19,'Accessories','Cuetec Axis Navy Glove Left Hand Size S - XL','darkblue.jpg','Cuetec Axis Navy Glove','1,875.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL),
(20,'Accessories','Cuetec Axis Grey Glove Left Hand Size S - XL','grey.jpg','Cuetec Axis Grey Glove','1,875.00','piece',NULL,0,NULL,NULL,0,NULL,NULL,0,NULL,NULL,NULL,0,NULL);

-- Insert sample order items
INSERT INTO order_item_data VALUES
(1,'2024-10-16 14:30:53',1,'John Smith','2024-10-16 14:30:53',1,7600.76,'Pool Cues','Cuetec Avid Era Sneaky Pete 4PT Brown Linen Wrap Pool Cue',1,'predator_cue.jpg','Cuetec Avid Era Sneaky Pete','piece',1,1),
(2,'2024-10-16 14:33:29',2,'Maria Garcia','2024-10-16 14:33:29',2,32942.84,'Pool Cues','Predator Roadline SP6ON Pool Cue',2,'mcdermott_cue.jpg','Predator Roadline SP6ON','piece',1,1),
(3,'2024-10-16 14:57:38',3,'David Wilson','2024-10-16 14:57:38',3,15699.99,'Pool Cues','Predator SP2 Revo Tembaga 1 Pool Cue',3,'viking_cue.jpg','Predator SP2 Revo Tembaga','piece',1,1),
(4,'2024-10-23 10:30:22',4,'Jennifer Brown','2024-10-23 10:30:22',4,1999.99,'Billiard Balls','Budget Billiard Ball Set 2 inch',4,'aramith_balls.jpg','Budget Billiard Ball Set 2','set',1,1),
(5,'2024-10-23 10:34:41',5,'Michael Davis','2024-10-23 10:34:41',5,999.99,'Billiard Balls','Billiard Ball Set 1',5,'aramith_premium.jpg','Billiard Ball Set 1','set',1,1);

-- Insert hibernate sequence
INSERT INTO hibernate_sequence VALUES (40);

-- Display summary
SELECT 'Simple Billiards Store Database (ecombs) Setup Complete!' as Status;
SELECT COUNT(*) as 'Menu Items' FROM menu_data;
SELECT COUNT(*) as 'Products' FROM product_data;
SELECT COUNT(*) as 'Order Items' FROM order_item_data;