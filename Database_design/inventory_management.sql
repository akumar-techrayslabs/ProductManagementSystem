DROP DATABASE IF EXISTS INVENTORY_MANAGEMENT_SYSTEM;

CREATE DATABASE INVENTORY_MANAGEMENT_SYSTEM;

USE INVENTORY_MANAGEMENT_SYSTEM;





-- created this table to support multiple organizations 
CREATE TABLE ORGANIZATIONS(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(200) NOT NULL,
code VARCHAR(50) NOT NULL UNIQUE,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT current_timestamp);

-- STATUS MASTER TABLE

CREATE TABLE STATUS_MASTER(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
status_name VARCHAR(100) NOT NULL,
status_code VARCHAR(50),
is_final BOOLEAN DEFAULT FALSE,
is_editable BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
UNIQUE KEY unique_status_code ( status_code,status_name) -- it is used so that no any two status can have same code like active - 100 and inactive -100 can be present 
); 







CREATE TABLE PERMISSIONS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL
);


-- users 
ALTER TABLE USERS
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
CREATE TABLE USERS(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
organization_id BIGINT NOT NULL, 
full_name VARCHAR(200),
email VARCHAR(20),
phone_no VARCHAR(20) ,
password_hash VARCHAR(255) NOT NULL,
status_id BIGINT ,
is_verified BOOLEAN DEFAULT FALSE,
last_login TIMESTAMP NULL DEFAULT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NULL,
deleted_at TIMESTAMP NULL,

UNIQUE(organization_id , email), -- to make it unique like if we write only unique email then other organization can't use admin@gmail.com but now org can use the

FOREIGN KEY(organization_id) REFERENCES ORGANIZATIONS(id) ON DELETE CASCADE,
 
FOREIGN KEY (status_id) REFERENCES STATUS_MASTER (id) ON DELETE SET NULL
);





-- ROLES 

CREATE TABLE ROLES(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
organization_id BIGINT NOT NULL, 
description TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (organization_id) REFERENCES ORGANIZATIONS(id) ON DELETE CASCADE

);



-- PERMISSIONS

CREATE TABLE PERMISSIONS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name
);


-- USER_ROLES

CREATE TABLE USER_ROLES (
    user_id BIGINT,
    role_id BIGINT,
    PRIMARY KEY (user_id, role_id),

    FOREIGN KEY (user_id)
        REFERENCES USERS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (role_id)
        REFERENCES ROLES(id)
        ON DELETE CASCADE
);

-- ROLE_PERMISSIONS

CREATE TABLE ROLE_PERMISSIONS (
    role_id BIGINT,
    permission_id BIGINT,
    PRIMARY KEY (role_id, permission_id),

    FOREIGN KEY (role_id)
        REFERENCES ROLES(id)
        ON DELETE CASCADE,

    FOREIGN KEY (permission_id)
        REFERENCES PERMISSIONS(id)
        ON DELETE CASCADE
);

-- CATEGORIES

CREATE TABLE CATEGORIES (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT,
    name VARCHAR(255),
    parent_id BIGINT NULL,

    FOREIGN KEY (organization_id)
        REFERENCES ORGANIZATIONS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (parent_id)
        REFERENCES CATEGORIES(id)
        ON DELETE SET NULL
);

-- UNIT MASTER SO THAT WE CAN'T ENTER TYPOS 


CREATE TABLE UNIT_MASTER (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    symbol VARCHAR(20),
    is_decimal_allowed BOOLEAN DEFAULT TRUE
);

-- PRODUCTS

CREATE TABLE PRODUCTS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT,
    name VARCHAR(255),
    sku VARCHAR(100),
    category_id BIGINT,
    unit_id BIGINT,
    reorder_level INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,

    UNIQUE (organization_id, sku),

    FOREIGN KEY (organization_id)
        REFERENCES ORGANIZATIONS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES CATEGORIES(id)
        ON DELETE SET NULL,

    FOREIGN KEY (unit_id)
        REFERENCES UNIT_MASTER(id)
        ON DELETE RESTRICT
);


-- PRODUCT_VARIANTS



CREATE TABLE PRODUCT_VARIETIES (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
	product_variant_name VARCHAR(100),
    product_id BIGINT,

    sku VARCHAR(100) UNIQUE,
    price DECIMAL(12,2),

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE CASCADE
);
-- PRODUCT_IMAGES

CREATE TABLE PRODUCT_IMAGES (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    image_url TEXT,
    is_primary BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE CASCADE
);

-- WAREHOUSES

CREATE TABLE WAREHOUSES (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT,
    name VARCHAR(255),
    location VARCHAR(255),
    status_id BIGINT,
    manager_id  BIGINT NULL,

    FOREIGN KEY (organization_id)
        REFERENCES ORGANIZATIONS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (status_id)
        REFERENCES STATUS_MASTER(id)
        ON DELETE SET NULL,
	
     FOREIGN KEY (manager_id)
        REFERENCES USERS(id)
        ON DELETE SET NULL
        
);


-- INVENTORY

CREATE TABLE INVENTORY (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    warehouse_id BIGINT,
    quantity INT DEFAULT 0,
    reserved_quantity INT DEFAULT 0,

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (warehouse_id)
        REFERENCES WAREHOUSES(id)
        ON DELETE CASCADE
);

-- STOCK_MOVEMENTS

CREATE TABLE STOCK_MOVEMENTS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    warehouse_id BIGINT,
    movement_type_id BIGINT,
    quantity INT,
    stock_after INT,
    performed_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (warehouse_id)
        REFERENCES WAREHOUSE(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (movement_type_id)
        REFERENCES MOVEMENT_TYPE_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (performed_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- SUPPLIERS

CREATE TABLE SUPPLIERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT,
    name VARCHAR(255),
    email VARCHAR(255),
    status_id BIGINT,

    FOREIGN KEY (organization_id)
        REFERENCES ORGANIZATIONS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (status_id)
        REFERENCES STATUS_MASTER(id)
        ON DELETE SET NULL
);

-- PURCHASE_ORDERS

CREATE TABLE PURCHASE_ORDERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    supplier_id BIGINT,
    warehouse_id BIGINT,
    status_id BIGINT,
    total_amount DECIMAL(12,2),
    created_by BIGINT,
    approved_by BIGINT,
    created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP, 
    apporved_at TIMESTAMP NULL,

    FOREIGN KEY (supplier_id)
        REFERENCES SUPPLIERS(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (warehouse_id)
        REFERENCES WAREHOUSES(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (status_id)
        REFERENCES STATUS_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (created_by)
        REFERENCES USERS(id)
        ON DELETE SET NULL,
        
	FOREIGN KEY (approved_by)
        REFERENCES USERS(id)
        ON DELETE SET NULL
);

-- PURCHASE_ORDER_ITEMS

CREATE TABLE PURCHASE_ORDER_ITEMS(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    purchase_order_id BIGINT,
    product_id BIGINT,
    quantity INT,
    unit_price DECIMAL(12,2),
    total_amount DECIMAL(12,2),
	tax_amount DECIMAL(12,2),

    FOREIGN KEY (purchase_order_id)
        REFERENCES PURCHASE_ORDERS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE RESTRICT
);

-- CUSTOMERS
ALTER TABLE CUSTOMERS
ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
CREATE TABLE CUSTOMERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    organization_id BIGINT,
    name VARCHAR(255),
    email VARCHAR(255),
    status_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    company_name VARCHAR(200),
    deleted_at TIMESTAMP NULL,
    

    FOREIGN KEY (organization_id)
        REFERENCES ORGANIZATIONS(id)
        ON DELETE CASCADE,
        
	    FOREIGN KEY (status_id)
        REFERENCES STATUS_MASTER(id)
        ON DELETE SET NULL
);

-- CUSTOMERS_ORDERS

CREATE TABLE CUSTOMERS_ORDERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT,
    warehouse_id BIGINT,
    status_id BIGINT,
    total_amount DECIMAL(12,2),
    created_by BIGINT,

    FOREIGN KEY (customer_id)
        REFERENCES CUSTOMERS(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (warehouse_id)
        REFERENCES WAREHOUSES(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (status_id)
        REFERENCES STATUS_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (created_by)
        REFERENCES USERS(id)
        ON DELETE SET NULL
);

-- CUSTOMERS_ORDER_ITEMS

CREATE TABLE CUSTOMERS_ORDER_ITEMS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customers_order_id BIGINT,
    product_id BIGINT,
    quantity INT,
    unit_price DECIMAL(12,2),
    total_amount DECIMAL(12,2),

    FOREIGN KEY (customers_order_id)
        REFERENCES CUSTOMERS_ORDERS(id)
        ON DELETE CASCADE,

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE RESTRICT
);


-- PAYMENT_METHOD_MASTER
ALTER TABLE payment_method_master
RENAME TO PAYMENT_METHOD_MASTER;
CREATE TABLE payment_method_master (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    is_online BOOLEAN DEFAULT FALSE
);




-- PAYMENT_DIRECTION_MASTER
ALTER TABLE payment_direction_master
RENAME TO PAYMENT_DIRECTION_MASTER;
CREATE TABLE payment_direction_master (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) -- IN / OUT
);
CREATE TABLE PAYMENTS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    reference_id BIGINT,
    reference_table VARCHAR(100),
    payment_direction_id BIGINT,
    payment_method_id BIGINT,
    amount DECIMAL(12,2),
    status_id BIGINT,
    paid_by BIGINT,
    payment_date DATE,

    FOREIGN KEY (payment_direction_id)
        REFERENCES PAYMENT_DIRECTION_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (payment_method_id)
        REFERENCES PAYMENT_METHOD_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (status_id)
        REFERENCES STATUS_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (paid_by)
        REFERENCES USERS(id)
        ON DELETE SET NULL
);

-- STOCK_MOVEMENTS

-- MOVEMENT_TYPE_MASTER
DROP TABLE movement_type_master;
CREATE TABLE MOVEMENT_TYPE_MASTER(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    direction VARCHAR(20), -- IN / OUT / TRANSFER
    affects_inventory BOOLEAN DEFAULT TRUE
);
CREATE TABLE STOCK_MANAGEMENT (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT,
    warehouse_id BIGINT,
    movement_type_id BIGINT,
    quantity INT,
    stock_after INT,
    performed_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES PRODUCTS(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (warehouse_id)
        REFERENCES WAREHOUSES(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (movement_type_id)
        REFERENCES MOVEMENT_TYPE_MASTER(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (performed_by)
        REFERENCES USERS(id)
        ON DELETE SET NULL
);





