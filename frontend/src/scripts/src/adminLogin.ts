import { loginSuperAdmin,logoutAdmin } from "../dist/Auth.js";

const adminLoginForm = document.querySelector("form") as HTMLFormElement;
console.log("hello kajri");

adminLoginForm.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const email = (document.querySelector("input[type = 'email']") as HTMLInputElement).value;
    const password = (document.querySelector("input[type = 'password']") as HTMLInputElement).value;
    console.log("email",email,": ", "password",password);

    const result = await loginSuperAdmin(email,password);
    if(result.succcess)
    {
        alert("Login succesfull");
        window.location.href= "./Dashboard.html"
    }
    else{
        alert(result.message)
    }
    
    

})

const logoutbtn = document.getElementById("logout") as HTMLButtonElement;

logoutbtn.addEventListener("click",()=>{
    logoutAdmin();
})