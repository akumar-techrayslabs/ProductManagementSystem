# UI Architecture and Component Thinking

## This project follows a simple and clean UI architecture.

This is a frontend-based Inventory Management System using:

- HTML

- TypeScript

- Tailwind CSS

- LocalStorage (for data storage)

# Overview



- The UI is structured in a way that each feature has:

- A separate HTML page

- A separate TypeScript file 


- Reusable components (like sidebar and navbar)

- Have rendered the components using javaScript to improve code reusability 
# Folder Structure 

This project has this kind of folder structure 



#### database/

- SQL schema file

- Database diagram



#### docs/

- API documentation

- Ui Architecture 
 
- Auth and Authorization 



#### frontend/



- components (navbar, sidebar)

- pages 

- script (TypeScript  files including src and dist folder )

- style (Tailwind CSS input/output files)





# Core Modules

##  Dashboard

### Purpose
Displays system summary.

### Shows
- Total Products
- Total Categories
- Total Users
- Latest Orders

### Data Source
Data is calculated dynamically from LocalStorage.

---

##  Product Management

### Features
- Add Product
- Edit Product
- Delete Product
- View stock per warehouse

### Logic File

Handles stock calculations and retrieval.

---

## Purchase Orders

### Purpose
Increase stock in selected warehouse.

### Features
- Warehouse selection
- Multi-product support
- Automatic stock update

### Stock Update Logic

- addStockEntry(product_id, warehouse_id,"IN",quantity)


---

Stock increases.

---

##  Customer Orders (Sales)

### Purpose
Reduce stock.

### Features
- Stock validation before saving
- Prevent insufficient stock

### Validation Logic
getCurrentStock(product_id, warehouse_id)


If sufficient stock:
addStockEntry(product_id, warehouse_id, "OUT", quantity)


Stock decreases.

---

##  Warehouse Management

### Features
- Add warehouses
- Multi-warehouse stock tracking

---

##  Role & Permission System

### Features
- Add roles
- Assign permissions
- Role-based UI access control

### Authorization Logic


Permission check:
if (!hasPermission("DELETE_PRODUCT")) { alert("Not authorized"); }


### Token Structure (LocalStorage)
{ role_id, role_name }


UI features are dynamically restricted based on permissions.

---

# Data Flow

The project uses **LocalStorage as a temporary database**.

## Data Flow Process

1. User submits form
2. Data stored in LocalStorage
3. Page re-renders table
4. Stock entries updated
5. UI reflects changes automatically

---

# Stock Flow

## Purchase Flow
addStockEntry(product_id, warehouse_id, "IN", quantity)


Stock increases.

## Sales Flow
getCurrentStock()


If sufficient:
addStockEntry(product_id, warehouse_id, "OUT", quantity)


Stock decreases.

---

# Authorization Flow

1. User logs in
2. Token stored in LocalStorage
3. Token contains:
   - role_id
   - role_name
4. `hasPermission("PERMISSION_NAME")` validates access
5. UI features are restricted accordingly

---

#  Reusable Components

## Navbar
- Shared across pages
- Dynamically loaded
- Contains navigation links

## Sidebar
- Shared layout component
- Displays module links
- Controlled by permission system

---

# Scalability

This architecture can be easily upgraded to:

- Node.js / Express backend
- MySQL / PostgreSQL database
- JWT authentication
- React frontend
- REST APIs

Business logic is already modular and cleanly separated.

---



#  Final Summary

This Inventory Management System follows:

- Page-based UI architecture
- Modular TypeScript logic
- Centralized stock management
- Role-based authorization system
- Reusable layout components
- LocalStorage data layer

It is designed to be simple, structured, and scalable — making it ideal for learning and portfolio demonstration.


