import { loginSuperAdmin, logoutAdmin } from "../dist/Auth.js";
const adminLoginForm = document.querySelector("form");
console.log("hello kajri");
async function showAlert() {
    Swal.fire({
        title: 'Success!',
        text: 'Login Successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = "./Dashboard.html";
    });
}
function showError() {
    Swal.fire({
        title: 'Invalid Credentials or something went wrong!',
        text: 'Login Failed',
        icon: 'fail',
        confirmButtonText: 'Try Again'
    });
}
adminLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("input[type = 'email']").value;
    const password = document.querySelector("input[type = 'password']").value;
    console.log("email", email, ": ", "password", password);
    const result = await loginSuperAdmin(email, password);
    if (result.succcess) {
        showAlert();
        // window.location.href= "./Dashboard.html"
    }
    else {
        showError();
    }
});
const logoutbtn = document.getElementById("logout");
logoutbtn.addEventListener("click", () => {
    logoutAdmin();
});
//# sourceMappingURL=adminLogin.js.map