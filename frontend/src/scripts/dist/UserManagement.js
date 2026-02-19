function showSuccess() {
    Swal.fire({
        title: "Success!",
        text: "User Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
    }).then(() => {
        form.reset();
    });
}
window.showSuccess = showSuccess;
console.log("User Management page");
let users = JSON.parse(localStorage.getItem("users") || "[]");
const form = document.getElementById("user-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const organization_id = 1;
    const full_name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const phone_no = document.getElementById("user-phone").value;
    const password = document.getElementById("user-password").value;
    const role_id = Number(document.getElementById("user-role").value) || null;
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
export {};
//# sourceMappingURL=UserManagement.js.map