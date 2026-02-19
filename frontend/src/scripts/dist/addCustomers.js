function showSuccess() {
    Swal.fire({
        title: "Success!",
        text: "Customer Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
    }).then(() => {
        window.location.reload();
    });
}
window.showSuccess = showSuccess;
const organization_id = 1;
const STORAGE_KEY = "customers";
let customers = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const form = document.getElementById("customer-form");
const table = document.querySelector("#customerTable");
let sub_form = document.getElementById("customer-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("customers");
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const company = document.getElementById("company")?.value.trim();
    if (!name) {
        alert("Suppliers name required");
        return;
    }
    if (!email) {
        alert("Email is required");
        return;
    }
    const existsCustomerEmail = customers.some((cus) => cus.email === email && cus.organization_id === organization_id);
    if (existsCustomerEmail) {
        alert("Customer with this email id is already exists");
        return;
    }
    const newCustomer = {
        id: Number(Date.now().toString()),
        organization_id,
        name,
        email,
        company,
        is_active: true,
    };
    customers.push(newCustomer);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    sub_form.classList.add("hidden");
    table.classList.remove("hidden");
    showSuccess();
    // renderCategories();
    form.reset();
});
const btn = document.getElementById("add-btn");
console.log("btn", btn);
btn.addEventListener("click", () => {
    console.log("clicked");
    sub_form.classList.toggle("hidden");
    table.classList.toggle("hidden");
});
function renderCustomers() {
    const tableBody = document.querySelector("#customerTable tbody");
    tableBody.innerHTML = "";
    customers.forEach((cus, index) => {
        tableBody.innerHTML += `
            <tr>
                <td class="p-2">${index + 1}</td>
                <td class="p-2">${cus.name}</td>
                <td class="p-2">${cus.email}</td>
                <td class="p-2">${cus.company}</td>

               
            </tr>
        `;
    });
}
renderCustomers();
export {};
//# sourceMappingURL=addCustomers.js.map