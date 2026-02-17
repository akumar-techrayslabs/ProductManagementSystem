import { loginSuperAdmin } from "../dist/Auth.js";
const adminLoginForm = document.querySelector("form");
console.log("hello kajri");
adminLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("input[type = 'email']").value;
    const password = document.querySelector("input[type = 'password']").value;
    console.log("email", email, ": ", "password", password);
    const result = await loginSuperAdmin(email, password);
    if (result.succcess) {
        alert("Login succesfull");
        window.location.href = "./Dashboard.html";
    }
    else {
        alert(result.message);
    }
});
//# sourceMappingURL=adminLogin.js.map