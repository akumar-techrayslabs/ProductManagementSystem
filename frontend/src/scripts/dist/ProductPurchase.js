import { addStockEntry } from "./stockManagement.js";
function showSuccess() {
    Swal.fire({
        title: "Success!",
        text: "Purchase Order Created",
        icon: "success",
        confirmButtonText: "OK",
    }).then(() => {
        window.location.reload();
    });
}
function showWarning(message) {
    Swal.fire({
        title: "warning!",
        text: `${message}`,
        icon: "warning",
        confirmButtonText: "OK",
    });
}
window.showSuccess = showSuccess;
window.showWarning = showWarning;
let items = [];
let itemId = 1;
let editingId = null;
const addItemsForm = document.getElementById("product-items-form");
const saveBtn = document.getElementById("savePO");
const table = document.getElementById("itemsTable");
const grandTotalEl = document.getElementById("grandTotal");
const purchase_add_section = document.getElementById("purchase-add-section");
const purchase_list = document.getElementById("purchase-list");
let item;
let products = JSON.parse(localStorage.getItem("products") || "[]");
const btn = document.getElementById("add-btn");
console.log("btn", btn);
btn.addEventListener("click", () => {
    console.log("clicked");
    purchase_add_section.classList.toggle("hidden");
    purchase_list.classList.toggle("hidden");
});
addItemsForm.addEventListener("submit", (e) => {
    console.log("addbtnclicked");
    e.preventDefault();
    const product_id = Number(document.getElementById("product").value);
    const qty = Number(document.getElementById("qty").value);
    const price = Number(document.getElementById("price").value);
    const taxPercent = Number(document.getElementById("tax").value);
    const tax = (qty * price * taxPercent) / 100;
    const total = qty * price + tax;
    item = {
        id: itemId++,
        product_id,
        quantity: qty,
        unitPrice: price,
        tax,
        total
    };
    console.log("purchase items added ");
    items.push(item);
    renderItems();
});
function renderItems() {
    table.innerHTML = "";
    let grandTotal = 0;
    items.forEach(item => {
        grandTotal += item.total;
        let productname = products.find((c) => c.id == item.product_id);
        table.innerHTML += `
      <tr class="border-t">
        <td>${productname.name}</td>
        <td>${item.quantity}</td>
        <td>${item.unitPrice}</td>
        <td>${item.tax.toFixed(2)}</td>
        <td>${item.total.toFixed(2)}</td>
        <td>
        <button onclick="removeItem(${item.id})" class=" text-white   cursor-pointer">
       <i class="fa-solid fa-xmark" style="color: #FF0000;"></i></button>
        </td>
      </tr>
    `;
        window.removeItem = function (id) {
            items = items.filter(item => item.id !== id);
            renderItems();
        };
    });
    grandTotalEl.textContent = grandTotal.toFixed(2);
}
saveBtn.addEventListener("click", (e) => {
    if (items.length == 0) {
        showWarning("Add atleast one product to create a Purchase Order!");
        return;
    }
    e.preventDefault();
    const warehouse_id = 1;
    const supplier_id = Number(document.getElementById("supplier_id").value);
    if (!supplier_id) {
        showWarning("Add Supplier first");
        return;
    }
    const name = document.getElementById("name").value;
    if (!name) {
        showWarning("Add Purchase Title ");
        return;
    }
    const grandTotal = Number(grandTotalEl.textContent);
    const purchaseOrders = JSON.parse(localStorage.getItem("purchaseOrders") || "[]");
    // editProduct Logic 
    if (editingId) {
        const index = purchaseOrders.findIndex(po => po.id === editingId);
        purchaseOrders[index] = {
            ...purchaseOrders[index],
            supplier_id,
            id: editingId,
            name,
            status: "draft",
            warehouse_id,
            total_amount: grandTotal,
            items
        };
        editingId = null;
    }
    else {
        const newPO = {
            id: Date.now(),
            warehouse_id,
            supplier_id,
            name,
            status: "draft",
            total_amount: grandTotal,
            items
        };
        purchaseOrders.push(newPO);
    }
    localStorage.setItem("purchaseOrders", JSON.stringify(purchaseOrders));
    items.forEach(item => {
        addStockEntry(item.product_id, 1, // warehouse_id by default 1 but I have to change it after applying multiple warehouse logic 
        1, item.quantity);
    });
    items = [];
    itemId = 1;
    renderItems();
    document.getElementById("name").value = "";
    document.getElementById("supplier_id").value = "";
    showSuccess();
});
const tableBody = document.querySelector("#purchaseTable tbody");
function render() {
    const purchaseOrders = JSON.parse(localStorage.getItem("purchaseOrders") || "[]");
    tableBody.innerHTML = "";
    purchaseOrders.forEach((po, index) => {
        const rowId = `items-${po.id}`;
        tableBody.innerHTML += `
      <tr class="border-t bg-white">
        <td class="py-3 px-2">${index + 1}</td>
        <td class="py-3 px-2">${po.id}</td>
        <td class="py-3 px-2">${po.warehouse_id}</td>
        <td class="py-3 px-2">${po.supplier_id}</td>
        <td class="py-3 px-2">${po.name}</td>
        <td class="py-3 px-2">${po.status}</td>
        <td class="py-3 px-2">₹ ${po.total_amount}</td>
        <td class="py-3 px-2">
          <button onclick="toggleItems('${rowId}')"
            class=" text-black px-3 py-1 rounded flex flex-col justify-center items-center hover:bg-teal-600 cursor-pointer" title="see all items">
         
           <i class="fa-solid fa-angle-down " style="color: #000;"></i>
          </button>
        </td>
        <td>
         <button onclick="editPurchaseOrder(${po.id})"
    class=" text-white px-2 py-3 rounded">
   <i class="fa-solid fa-pen-to-square cursor-pointer" style="color: #1e2939;"></i>
  </button>
    </td>
    <td>
  <button onclick="deletePurchaseOrder(${po.id})"
    class=" text-white px-2 py-3 rounded">
      <i class="fa-solid fa-trash cursor-pointer" style="color: #1e2939;"></i>
  </button>
    </td>
      </tr>

      <tr id="${rowId}" class="hidden ">
        <td colspan="8">
          ${renderItemsTable(po.items)}
        </td>
      </tr>
    `;
    });
}
window.deletePurchaseOrder = function (id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This will delete the Purchase Order",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            let purchaseOrders = JSON.parse(localStorage.getItem("purchaseOrders") || "[]");
            purchaseOrders = purchaseOrders.filter(po => po.id !== id);
            items.forEach((item) => {
                addStockEntry(item.product_id, 1, 1, // in  movement
                item.quantity);
            });
            localStorage.setItem("purchaseOrders", JSON.stringify(purchaseOrders));
            render();
        }
    });
};
window.editPurchaseOrder = function (id) {
    const purchaseOrders = JSON.parse(localStorage.getItem("purchaseOrders") || "[]");
    const po = purchaseOrders.find(p => p.id === id);
    if (!po)
        return;
    editingId = id;
    purchase_add_section.classList.remove("hidden");
    purchase_list.classList.add("hidden");
    document.getElementById("supplier_id").value =
        po.supplier_id.toString();
    document.getElementById("name").value =
        po.name;
    items = [...po.items];
    // this will prevent any id to be same after creating a new purchase item id 
    itemId = Math.max(...items.map(i => i.id), 0) + 1;
    renderItems();
};
function renderItemsTable(items) {
    let html = `
    <div class="p-4 mt-2 mb-10">
    <table class="w-full border text-sm text-center py-4">
      <thead class="bg-emerald-400 h-4">
        <tr class="py-4 px-3">
          <th class="py-3 px-3">Product</th>
          <th class="py-3 px-3">Qty</th>
          <th class="py-3 px-3">Price</th>
          <th class="py-3 px-3">Tax</th>
          <th class="py-3 px-3">Total</th>
        </tr>
      </thead>
      <tbody>
  `;
    items.forEach(item => {
        let product = products.find((c) => c.id == item.product_id);
        html += `
      <tr class="divide-y">
        <td class="py-3 px-3">${product.name}</td>
        <td class="py-3 px-3">${item.quantity}</td>
        <td class="py-3 px-3">${item.unitPrice}</td>
        <td class="py-3 px-3">${item.tax.toFixed(2)}</td>
        <td class="py-3 px-3">${item.total.toFixed(2)}</td>
      </tr>
    `;
    });
    html += `</tbody></table></div>`;
    return html;
}
window.toggleItems = function (id) {
    const row = document.getElementById(id);
    row?.classList.toggle("hidden");
};
render();
function loadSuppliersForDropdown() {
    const suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]");
    console.log("suppliers running");
    if (suppliers.length === 0) {
        console.log("No Suppliers available");
        alert("You can't create Purchase Order first add Product Suppliers");
    }
    const select = document.getElementById("supplier_id");
    select.innerHTML = `<option value="">Select Suppliers</option>`;
    suppliers
        .forEach((sup) => {
        select.innerHTML += `
                <option value="${sup.id}">
                    ${sup.name}
                </option>
            `;
    });
}
function loadProductsForDropdown() {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    console.log("products running");
    if (products.length === 0) {
        console.log("No Products available");
        alert("You can't create Purchase Order first add Products");
    }
    const select = document.getElementById("product");
    select.innerHTML = `<option value="">Select Produts</option>`;
    products
        .forEach((pro) => {
        select.innerHTML += `
                <option value="${pro.id}">
                    ${pro.name}
                </option>
            `;
    });
}
loadProductsForDropdown();
loadSuppliersForDropdown();
// deleting customer order:
// reverse stock
// addStockEntry(product_id, warehouse_id, 1, quantity);
// If deleting purchase order:
// addStockEntry(product_id, warehouse_id, 2, quantity);
//# sourceMappingURL=ProductPurchase.js.map