

import { SignJWT,jwtVerify } from "https://cdn.jsdelivr.net/npm/jose@5.2.4/+esm";
import { verifyToken } from "./Auth.js";

 let users  = JSON.parse(
  localStorage.getItem("users") || "[]",
);
// import { SignJWT,jwtVerify } from "../../../node_modules/jose/dist/types/index.js"; \\ this won't work due to 
const SECRET_KEY = new TextEncoder().encode("ABCDEFGHIJKANISHKUMARSECRETAMDIN")
declare var Swal:any;
const staffLoginForm = document.querySelector("form") as HTMLFormElement;
async function showAlert(message:string){
    Swal.fire({
        title: 'Warning!',
        text: `${message}`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
}
export let roles = JSON.parse(localStorage.getItem("roles") || "[]");
staffLoginForm.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const email = (document.querySelector("input[type = 'email']") as HTMLInputElement).value;

    
    const password = (document.querySelector("input[type = 'password']") as HTMLInputElement).value;
 
    
    console.log("email",email,": ", "password",password);

  
    const isUserAvailable = users.find((user:any)=>user.email == email)
    console.log("isUserAvailable",isUserAvailable);
    
    if(!isUserAvailable)
    {
        showAlert("User doesn't exist")
    }
   
    if(isUserAvailable?.password == password)
    {
        const role_id = isUserAvailable.role_id
        const role_name = roles.find((role:any)=>role.id == role_id)
        const token = await new SignJWT({role:role_name?.name,role_id, email})
        .setProtectedHeader({alg:"HS256"})
        .setExpirationTime("1d")
        .sign(SECRET_KEY);

        localStorage.setItem("token",token);
        showAlert("Login Successful").then(()=>{
        window.location.href= "./Dashboard.html"
    })
       
    }
    else {
        showAlert("Invalid credentials")
    }
    

})



// export async function verifyTokenStaff(){
//     const token = localStorage.getItem("token");
//     console.log(token);
  
    
//     if(token == null)
//     {   console.log("token is null");
    
//         return false;
//     }
//     else{
         
//         try{
         
        
//         await  jwtVerify(token,SECRET_KEY);
//         return true;
//     }
//     catch(error){
//         console.log("toke is eeor ");
//         console.log(error);
        
        
//         return false;
//     }
//     }
 
// }

// export function logoutAdmin()
// {
//     console.log("logout successfully");
    
//     localStorage.removeItem("token");
    
// }