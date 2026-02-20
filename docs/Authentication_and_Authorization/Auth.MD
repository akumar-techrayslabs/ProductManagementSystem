# Authentication and Authorization for Inventory Management System 

## In our IMS System we are using Authentication using JWT which can generate unique encrypted access and refresh tokens using JWT_SECRET_TOKEN



## For Authorization in our system we are using different Tables of Roles, User-Roles , Permissions, and user-Permissions to assign different roles, access and permissions to different users 


### 1. Authentication 
### User sends Registration or login request

- Registration 
    - Api Endpoint 
        - POST http://ims.com/api/user

    - User Send Registration Request with Request Body to the server

    - ```json

        {

        "organization_id": 0,
        "full_name": "User Kumar",
        "email": "user@example.com",
        "phone_no": "1234567890",
        "password": "string",
        "status_id": 0

        }

        ```
    - Backend
        
        - backend will first validate the data like the format, null values etc.

        -  If validation successfull then backend will encrypt the password using salting with bcrypt etc.
      
        - Then these datas will be getting stored in the specific table in databse 

        - After succesfully storing data into User table  the server sends response in this format with status code 201 

            ```json
             {

             "success": true,
             "message": "User created successfully",
             "data": [
               {
                 "id": 0,
                 "organization_id": "string",
                 "full_name": "string",
                 "email": "user@example.com",
                 "status_id": 0,
                 "is_verfied": true,
                 "createdAt": "2026-02-14T07:36:07.515Z"
               }
             ]
            }

            ```



 
- Login 
    - Ater creation of the users user can now login using their credentials 
     -  Api Endpoint 
         - POST http://ims.com//api/auth/login


    - User Send Login Request with Request Body to the server

        ```json 

        {

        "organization_id": 0,
        "email": "user@example.com",
        "password": "password"

        }

        ```
    
    - Backend 
 
        - backend will first validate the data like the format, null values, email structure  etc.

      
        - it will find whether the email address exists in the database or not.

        - If email id doesn't exist in the database then the server will respond with status code 401 

        ```json 
            {
                
            "success": false,
            "message": "User not found",
             
            }
         
         ```
      
         - If user exists then the Backend will verifies the email + password 

        - password is getting compared using Comparison methods with the hashed password and the user's password  

        - where password is from req.body and hash password is the password stored in the database 

        - If password valid or matches then -> 

        - Using JWT_SECRET_KEY Access and Refresh token will be generated 

        - After that using Using JWT_SECRET_KEY Access and Refresh token will be generated 
         
        - The JWT can contain these values 

        - email 
        - user_id 
        - role_id 
        - expiresIn
        - JWT_SECRET_KEY GENERATION PAYLOAD

            ```json
            {
                
                "email": "user@gmail.com",
                "user_id": 1,
                "role_id": 1,
                "expiresIn":"1h",
                "JWT_SECRET_KEY": "SECRET"
            }

            ```
        - After succesfull generation of the jwt the server sends response in this format with status code 201 

            ```json

             {
             "success": true,
             "message": "Login successfully",
             "access_token": "jwt_token",
             "refresh_token": "refresh_token",
             "data": {
               "id": 0,
               "organization_id": "string",
               "full_name": "string",
               "email": "user@example.com",
               "status_id": 0,
               "is_verfied": true,
               "createdAt": "2026-02-14T08:03:05.526Z"
             }
                }

            ```

### 2. Authorization 

### Using the Role ,Role_user, permissions table we can achieve the Authorization in our system 

### since we can define Roles to different Users with specific permissions we can achieve Role Based Access Control in our system 
- Roles Table 
    - Roles Table have these column names
        ```
        - id 
        - name 
        - organization_id
        - description 
        ```  
    - In which we can assign 

        ```
         1, Admin 
         2, manager
        ```

- Permission Table 
    - Permission Table has these values 

         ```
        - id
        - name

         ```

    - In which we can assign 

        ```
        id          name 
         1       PURCHASE_CREATE,
         2       PURCHASE_APPROVE,
         3       SALES_CREATE,
         4       SALES_CONFIRM;

        ```
- User Roles Table 
    - By which we can assign Roles to different Users 
    - User Roles Table has these values 

         ```
        - user_id
        - role_id

         ```

    - In which we can assign 

        ```
        user_id       role_id 

          1              1
          2              2

        ```
    - means now user 1 is Admin and user 2 is Manager 
    - Like wise we can also assing permission access to the specific role using 
    
- ROLE_PERMISSIONS

    - ROLE_PERMISSIONS Table has these values 

         ```
        - role_id
        - permission_id 

         ```

    - In which we can assign 

        ```
        role_id       permission_id 

          1              1
          1              2
          1              3
          1              4
          2              1
          2              3

        ```

        - means now admin has all the permissions but manager has some specific permissions 



- MiddleWares 
    - We can use Middlewares on specific routes to provide authoriation to this routes
    - When user will send its Bearer token in the header the middleware will
        - Extract the token 
        - Verify JWT 
        - and then using token the middleware will extract the user role or permissions and accoridngly can pass or use next otherwise it will deny the user
   