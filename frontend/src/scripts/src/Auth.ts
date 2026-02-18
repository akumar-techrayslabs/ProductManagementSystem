import { SignJWT,jwtVerify } from "https://cdn.jsdelivr.net/npm/jose@5.2.4/+esm";

// import { SignJWT,jwtVerify } from "../../../node_modules/jose/dist/types/index.js"; \\ this won't work due to 
const SECRET_KEY = new TextEncoder().encode("ABCDEFGHIJKANISHKUMARSECRETAMDIN")

const SUPER_ADMIN = {
    email:"super@admin.com",
    password:"Super@123"
}

export async function loginSuperAdmin(email:string, password:string)
{
    if(email === SUPER_ADMIN.email && password === SUPER_ADMIN.password)
    {
    
        const token = await new  SignJWT({role:"superadmin", email})
        .setProtectedHeader({alg:"HS256"})
        .setExpirationTime("1d")
        .sign(SECRET_KEY);

        localStorage.setItem("token",token);
        return {succcess:true};
       
    }
    else {
        return {success:false, message:"invalid credentials"}
    }
}

export async function verifyToken(){
    const token = localStorage.getItem("token");
    console.log(token);
  
    
    if(token == null)
    {   console.log("token is null");
    
        return false;
    }
    else{
         
        try{
         
        
        await  jwtVerify(token,SECRET_KEY);
        return true;
    }
    catch(error){
        console.log("toke is eeor ");
        console.log(error);
        
        
        return false;
    }
    }
 
}

export function logoutAdmin()
{
    console.log("logout successfully");
    
    localStorage.removeItem("token");
}