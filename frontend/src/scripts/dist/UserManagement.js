function showSuccess() {
    Swal.fire({
        title: "Success!",
        text: "User Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
    }).then(() => {
        window.location.reload();
        form.reset();
    });
}
window.showSuccess = showSuccess;
function showWarning(message) {
    Swal.fire({
        title: "Warning!",
        text: `${message}`,
        icon: "warning",
        confirmButtonText: "OK",
    }).then(() => {
        return;
    });
}
window.showWarning = showWarning;
console.log("User Management page");
let users = JSON.parse(localStorage.getItem("users") || "[]");
const table = document.querySelector("#userTable");
let sub_form = document.getElementById("customer-form");
const form = document.getElementById("user-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const organization_id = 1;
    const full_name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const exisitingEmail = users.find((us) => us.email == email);
    if (exisitingEmail) {
        showWarning("User already exists for this email");
        return;
    }
    const phone_no = document.getElementById("user-phone").value;
    const password = document.getElementById("user-password").value;
    const role_id = Number(document.getElementById("user-role").value) || null;
    // if(phone_no.length() < 10)
    // {
    //     showWarning("Phone No should be atleast 10 digit")
    //     return;
    // }
    const userId = Date.now();
    const newUser = {
        id: userId,
        organization_id,
        full_name,
        email,
        phone_no,
        role_id,
        password,
        is_active: true,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    form.classList.toggle("hidden");
    table.classList.toggle("hidden");
    showSuccess();
});
function loadRolesForDropdown() {
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");
    console.log("loadroles running");
    if (roles.length === 0) {
        console.log("No roles available");
        alert("No roles added Please add a Role First!");
    }
    const select = document.getElementById("user-role");
    select.innerHTML = `<option value="">Select Role</option>`;
    roles
        .forEach((roles) => {
        select.innerHTML += `
                <option value="${roles.id}">
                    ${roles.name}
                </option>
            `;
    });
}
window.addEventListener("DOMContentLoaded", () => {
    loadRolesForDropdown();
});
const btn = document.getElementById("add-btn");
console.log("btn", btn);
btn.addEventListener("click", () => {
    console.log("clicked");
    form.classList.toggle("hidden");
    table.classList.toggle("hidden");
});
function renderSuppliers() {
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";
    let roles = JSON.parse(localStorage.getItem("roles") || "[]");
    users.forEach((user, index) => {
        const role = roles.find((c) => c.id == user.role_id);
        console.log("role", role);
        tableBody.innerHTML += `
            <tr>
                <td class="p-2">${index + 1}</td>
                <td class="p-2">${user.full_name}</td>
                <td class="p-2">${user.email}</td>
                <td class="p-2">${user.phone_no}</td>
                <td class="p-2">${user.password}</td>
                <td class="p-2">${role.name}</td>
                <td class="p-2">${user.is_active}</td>

               
            </tr>
        `;
    });
}
renderSuppliers();
export {};
//# sourceMappingURL=UserManagement.js.map