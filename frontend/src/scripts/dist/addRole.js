const organization_id = 1;
const STORAGE_KEY = "roles";
let roles = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
function showSuccess() {
    Swal.fire({
        title: "Success!",
        text: "Role Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
    }).then(() => {
        window.location.reload();
    });
}
window.showSuccess = showSuccess;
const form = document.getElementById("role-form");
// const tableBody = document.getElementById("category-table") as HTMLElement;
const table = document.querySelector("#roleTable");
let sub_form = document.getElementById("role-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("roles");
    const name = document.getElementById("name").value.trim();
    if (!name) {
        alert("Role name required");
        return;
    }
    const existsCategory = roles.some(rol => rol.name.toLowerCase() === name.toLowerCase()
        && rol.organization_id === organization_id);
    if (existsCategory) {
        alert("Role already exists");
        return;
    }
    const newRole = {
        id: Number(Date.now().toString()),
        organization_id,
        name,
    };
    roles.push(newRole);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
    showSuccess();
    form.classList.toggle("hidden");
    table.classList.toggle("hidden");
    // renderCategories();
    form.reset();
});
const btn = document.getElementById("add-btn");
console.log("btn", btn);
btn.addEventListener("click", () => {
    console.log("clicked");
    form.classList.toggle("hidden");
    table.classList.toggle("hidden");
});
function renderSuppliers() {
    const tableBody = document.querySelector("#roleTable tbody");
    tableBody.innerHTML = "";
    roles.forEach((role, index) => {
        tableBody.innerHTML += `
            <tr>
                <td class="p-2">${index + 1}</td>
                <td class="p-2">${role.name}</td>
 

               
            </tr>
        `;
    });
}
renderSuppliers();
export {};
//# sourceMappingURL=addRole.js.map