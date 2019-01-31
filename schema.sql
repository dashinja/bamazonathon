DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50),
price DECIMAL(6,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

ALTER TABLE products
  ADD product_sales DECIMAL(8,2) NOT NULL
  AFTER price;

SELECT * FROM products;

CREATE TABLE departments (
dep_id INT NOT NULL AUTO_INCREMENT,
dep_name VARCHAR(50) NOT NULL,
dep_over_head_cost INT,
PRIMARY KEY (dep_id)
);

SELECT * FROM departments;


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LG 29 inch 21:9 Monitor", "Electronics", 540, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GeForce GTX 1080 ti", "Electronics", 700, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("600W PSU", "Electronics", 219, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1 TB SSD", "Electronics", 500, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASUS 23 inch 16:9 Monitor", "Electronics", 135, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("32 GB 2400 MHZ DDR4 RAM Stick", "Electronics", 280, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Kool ATX Tower", "Electronics", 200, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4 TB USB 3.0 External HDD", "Electronics", 499, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Great 1/4 Inch Pluggable JBL Sound System", "Electronics", 300, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Keyboard", "Electronics", 40, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless Mouse", "Electronics", 32, 10);

-- -- SELECT * FROM products;

-- -- SELECT stock_quantity FROM products WHERE item_id = 2