function showSuccess() {
    Swal.fire({
        title: "Success!",
        text: "Customer Order Created",
        icon: "success",
        confirmButtonText: "OK",
    }).then(() => {
        window.location.reload();
    });
}
function showWarning(message) {
    Swal.fire({
        title: "Warning!",
        text: message,
        icon: "warning",
        confirmButtonText: "OK",
    });
}
window.showSuccess = showSuccess;
window.showWarning = showWarning;
let items = [];
let itemId = 1;
const addItemsForm = document.getElementById("product-items-form");
const saveBtn = document.getElementById("saveCO");
const table = document.getElementById("itemsTable");
const grandTotalEl = document.getElementById("grandTotal");
const customer_add_section = document.getElementById("customer-add-section");
const customer_list = document.getElementById("customer-list");
let products = JSON.parse(localStorage.getItem("products") || "[]");
const tableBody = document.querySelector("#customerTable tbody");
const btn = document.getElementById("add-btn");
btn.addEventListener("click", () => {
    customer_add_section.classList.toggle("hidden");
    customer_list.classList.toggle("hidden");
});
addItemsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product_id = Number(document.getElementById("product").value);
    const qty = Number(document.getElementById("qty").value);
    const price = Number(document.getElementById("price").value);
    if (!product_id || !qty || !price) {
        showWarning("Please fill all product details");
        return;
    }
    const total = qty * price;
    const item = {
        id: itemId++,
        product_id,
        quantity: qty,
        unit_price: price,
        total_amount: total,
    };
    items.push(item);
    renderItems();
});
function renderItems() {
    table.innerHTML = "";
    let grandTotal = 0;
    items.forEach((item) => {
        grandTotal += item.total_amount;
        let product = products.find((p) => p.id == item.product_id);
        table.innerHTML += `
      <tr class="border-t">
        <td>${product?.name || "N/A"}</td>
        <td>${item.quantity}</td>
        <td>${item.unit_price}</td>
        <td>${item.total_amount.toFixed(2)}</td>
      </tr>
    `;
    });
    grandTotalEl.textContent = grandTotal.toFixed(2);
}
saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (items.length === 0) {
        showWarning("Add at least one product to create Customer Order!");
        return;
    }
    const customer_id = Number(document.getElementById("customer_id").value);
    const warehouse_id = 1;
    const status_id = 1;
    const created_by = 1;
    if (!customer_id || !warehouse_id || !status_id) {
        showWarning("Please fill all required fields");
        return;
    }
    const grandTotal = Number(grandTotalEl.textContent);
    const customerOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
    const newOrder = {
        id: Date.now(),
        customer_id,
        warehouse_id,
        status_id,
        total_amount: grandTotal,
        created_by,
        items,
    };
    customerOrders.push(newOrder);
    localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
    showSuccess();
});
function loadProductsForDropdown() {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const select = document.getElementById("product");
    select.innerHTML = `<option value="">Select Product</option>`;
    if (products.length === 0) {
        alert("You must add Products first");
        return;
    }
    products.forEach((pro) => {
        select.innerHTML += `
      <option value="${pro.id}">
        ${pro.name}
      </option>
    `;
    });
}
function loadCustomersForDropdown() {
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const select = document.getElementById("customer_id");
    select.innerHTML = `<option value="">Select Customer</option>`;
    if (customers.length === 0) {
        alert("You must add Customers first");
        return;
    }
    customers.forEach((cus) => {
        select.innerHTML += `
      <option value="${cus.id}">
        ${cus.name}
      </option>
    `;
    });
}
function renderCustomerOrders() {
    const customerOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const warehouses = JSON.parse(localStorage.getItem("warehouses") || "[]");
    const statuses = JSON.parse(localStorage.getItem("statuses") || "[]");
    tableBody.innerHTML = "";
    customerOrders.forEach((order, index) => {
        const rowId = `items-${order.id}`;
        const customer = customers.find((c) => c.id == order.customer_id);
        const warehouse = warehouses.find((w) => w.id == order.warehouse_id);
        const status = statuses.find((s) => s.id == order.status_id);
        tableBody.innerHTML += `
      <tr class="border-t bg-white">
        <td class="py-3 px-2">${index + 1}</td>
        <td class="py-3 px-2">${order.id}</td>
        <td class="py-3 px-2">${customer?.name || "-"}</td>
        <td class="py-3 px-2">${warehouse?.name || "-"}</td>
        <td class="py-3 px-2">${status?.name || "-"}</td>
        <td class="py-3 px-2">₹ ${order.total_amount}</td>
        <td class="py-3 px-2">
          <button onclick="toggleItems('${rowId}')"
            class="text-black px-3 py-1 rounded hover:bg-teal-600 cursor-pointer">
            <i class="fa-solid fa-angle-down"></i>
          </button>
        </td>
      </tr>

      <tr id="${rowId}" class="hidden ">
        <td colspan="7">
          ${renderItemsTable(order.items)}
        </td>
      </tr>
    `;
    });
}
function renderItemsTable(items) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    let html = `
    <div class="p-4 mt-2 mb-10">
      <table class="w-full border text-sm text-center">
        <thead class="bg-emerald-400">
          <tr>
            <th class="py-3 px-3">Product</th>
            <th class="py-3 px-3">Qty</th>
            <th class="py-3 px-3">Unit Price</th>
            <th class="py-3 px-3">Total</th>
          </tr>
        </thead>
        <tbody>
  `;
    items.forEach(item => {
        const product = products.find((p) => p.id == item.product_id);
        html += `
      <tr>
        <td class="py-3 px-3">${product?.name || "-"}</td>
        <td class="py-3 px-3">${item.quantity}</td>
        <td class="py-3 px-3">${item.unit_price}</td>
        <td class="py-3 px-3">${item.total_amount.toFixed(2)}</td>
      </tr>
    `;
    });
    html += `
        </tbody>
      </table>
    </div>
  `;
    return html;
}
window.toggleItems = function (id) {
    const row = document.getElementById(id);
    row?.classList.toggle("hidden");
};
renderCustomerOrders();
loadProductsForDropdown();
loadCustomersForDropdown();
export {};
//# sourceMappingURL=customerOrder.js.map