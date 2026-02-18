import { logoutAdmin } from "./Auth.js";


export function logout(){

    const logoutbtn = document.getElementById("logout") as HTMLButtonElement;

   
logoutbtn.addEventListener("click",()=>{
 logoutAdmin()

window.location.reload();

   

})
}

