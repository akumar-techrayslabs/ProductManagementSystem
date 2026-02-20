# Inventory Management System Databse and Backend API Design 

### ADMIN USER-ID AND PASSWORD TO ACCESS THE ADMIN PANEL 
### Email : super@admin.com
### password: Super@123 

## Overview 

### This repository includes 
- Database Design 
    - EER Model 
- Authentication and Authorization 

- 
- REST API Design 
- FRONTEND USING HTML CSS TYPESCRIPT 


## This system is designed to support:

1. Secure Authentication & Authorization
2. Role-Based Access Control (RBAC)
3. Multiple Organizations
4. Multi-Warehouse Inventory Management
5. Stock Movement History Tracking
6. Scalable and Dynamic Master Tables
7. Clean Modular Frontend Structure



## API DESIGN APPROACH 

- Have Designed the APIs using Role based Access Control using middlewares which checks whether the user has the authorization or not 
- Designed the APIs to support All the HTTP methods 
    - POST 
    - GET
    - PUT 
    - DELETE 
- Designed the APIs 

# Database Design Approach



## Key Design Decisions

 ### Master Tables

Instead of using hardcoded ENUMs, we used master tables such as:

    - roles

    - permissions

    - movement_types

    - document_types



- This allows:

  - Dynamic updates
   
  - Future scalability
   
  - No schema change when new types are added







# Role-Based Access Control (RBAC)

## We implemented RBAC using four core tables:

- users

- roles

- permissions

- role_permissions



This ensures:

- Flexible access management

- No hardcoded access logic

- Easy permission updates without code changes










# Authentication & Authorization

## Authentication Strategy

- We implemented JWT-based authentication:

- Passwords are hashed using bcrypt
 
- On login, server generates access token

### Token contains:

- user_id

- role_id

- permissions



users  sends token in Authorization header



### Example:

Authorization: Bearer <token>





# Authorization Strategy (RBAC)

## Authorization is enforced via middleware.

- Flow:

1. User logs in



2. Role permissions are fetched



3. Permissions embedded inside JWT



4. Middleware checks if required permission exists



5. If yes → allow



6. If not → return 403 Forbidden





# Example restricted route:

- DELETE /api/products/:id

# Requires:

DELETE_PRODUCT permission





# Complete Login Flow

 Login Flow

User -> POST /login
      ->
Verify credentials
      ->
Fetch role
      ->
Fetch permissions
      ->
Generate JWT
      ->
Send token to client





# Protected API Flow

Client -> Sends request with JWT
        ->
Authentication Middleware verifies token
        ->
Authorization Middleware checks permission
        ->
Controller executes logic
        ->
Database operation
        ->
Response returned

# API Documentation

## Swagger yaml  is used for API documentation.

- Documentation includes:

- Request body schema

- Response schema

- Authentication requirement

- Error responses

- Bearer token security scheme


