import { hasPermission } from "./protect.js";
import { addStockEntry, getCurrentStock } from "./stockManagement.js";
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
let editingCustomerId = null;
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
        <td>
        <button onclick="removeItem(${item.id})" class=" text-white   cursor-pointer">
       <i class="fa-solid fa-xmark" style="color: #FF0000;"></i></button>
        </td>
      </tr>
    `;
        window.removeItem = function (id) {
            items = items.filter((item) => item.id !== id);
            renderItems();
        };
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
    if (editingCustomerId) {
        const index = customerOrders.findIndex((order) => order.id === editingCustomerId);
        customerOrders[index] = {
            ...customerOrders[index],
            id: editingCustomerId,
            customer_id,
            warehouse_id,
            status_id,
            created_by,
            total_amount: grandTotal,
            items,
        };
        editingCustomerId = null;
    }
    else {
        localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
        items.forEach((item) => {
            const currentStock = getCurrentStock(item.product_id, 1);
            console.log("currentStock ", currentStock);
            console.log("item-quantity", item.quantity);
            let curStock = Number(currentStock);
            let curQuantity = Number(item.quantity);
            if (curStock < curQuantity) {
                console.log("------------------------------------------------");
                alert("Insufficient stock for selected product!");
                // showWarning("Insufficient stock for selected product!");
                return;
            }
            else {
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
                addStockEntry(item.product_id, 1, 2, // out movement
                item.quantity);
                items = [];
                itemId = 1;
                renderItems();
                document.getElementById("customer_id").value =
                    "";
                customer_add_section.classList.add("hidden");
                customer_list.classList.remove("hidden");
                renderCustomerOrders();
                showSuccess();
            }
        });
    }
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
        <td>
         <button onclick="editCustomerOrder(${order.id})"
    class=" text-white px-2 py-3 rounded">
   <i class="fa-solid fa-pen-to-square cursor-pointer" style="color: #1e2939;"></i>
  </button>
    </td>
    <td>
  <button onclick="deleteCustomerOrder(${order.id})"
    class=" text-white px-2 py-3 rounded">
      <i class="fa-solid fa-trash cursor-pointer" style="color: #1e2939;"></i>
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
window.deleteCustomerOrder = function (id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This will delete the Customer Order",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            if (!hasPermission("DELETE_PRODUCT")) {
                alert("You are not authorized");
                return;
            }
            else {
                let customerOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
                customerOrders = customerOrders.filter((order) => order.id !== id);
                //   const orderId = products.find((pr)=)
                items.forEach((item) => {
                    addStockEntry(item.product_id, 1, 1, // in  movement
                    item.quantity);
                });
                localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
                renderCustomerOrders();
            }
        }
    });
};
/*

  items.forEach(item => {

  const currentStock = getCurrentStock(item.product_id, 1);
    console.log("currentStock ",currentStock);
    console.log("item-quantity",item.quantity);
    let curStock = Number(currentStock);
    let curQuantity = Number(item.quantity)
  if(curStock < curQuantity){
    console.log("------------------------------------------------");
    alert("Insufficient stock for selected product!")
    // showWarning("Insufficient stock for selected product!");
    return;
  }
  else{
      const newOrder: CustomerOrder = {
    id: Date.now(),
    customer_id,
    warehouse_id,
    status_id,
    total_amount: grandTotal,
    created_by,
    items
  };

  customerOrders.push(newOrder);
     addStockEntry(
    item.product_id,
    1,
    2, // out movement
    item.quantity
  );

  items = [];
itemId = 1;
renderItems();

(document.getElementById("customer_id") as HTMLSelectElement).value = "";

customer_add_section.classList.add("hidden");
customer_list.classList.remove("hidden");

renderCustomerOrders();

  showSuccess();
  }

 

});

*/
window.editCustomerOrder = function (id) {
    const customerOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
    if (!hasPermission("UPDATE_ORDERS")) {
        alert("You are not authorized");
        return;
    }
    else {
        const order = customerOrders.find((o) => o.id === id);
        if (!order)
            return;
        editingCustomerId = id;
        customer_add_section.classList.remove("hidden");
        customer_list.classList.add("hidden");
        document.getElementById("customer_id").value =
            order.customer_id.toString();
        items = [...order.items];
        // this is so that no items can have the same id after adding new items
        itemId = Math.max(...items.map((i) => i.id), 0) + 1;
        renderItems();
    }
};
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
    items.forEach((item) => {
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
//# sourceMappingURL=customerOrder.js.map