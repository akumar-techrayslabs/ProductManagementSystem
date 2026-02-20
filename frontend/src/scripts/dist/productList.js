import { getCurrentStock } from "./stockManagement.js";
function showWarning() {
    Swal.fire({
        title: "Warning!",
        text: "No Data Available",
        icon: "warning",
        confirmButtonText: "OK",
    });
}
// function showDelete() {
//   Swal.fire({
//     title: "Success!",
//     text: "Product Deleted Successfully",
//     icon: "success",
//     confirmButtonText: "OK",
//   }).then(() => {
//     window.location.reload();
//   });
// }
function deleteFeature(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This will be deleted and can't be recover later",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Yes, Delete it",
        confirmButtonColor: "#DC2626",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted",
                text: "Feature successfully deleted",
                icon: "success",
                confirmButtonText: "OK",
            });
            deleteProduct(id);
            window.location.reload();
        }
    });
}
function editFeature() {
    Swal.fire({
        title: "Are you sure?",
        text: "This will change the edited fields",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Yes, Edit it",
        confirmButtonColor: "#DC2626",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Edited",
                text: "Feature successfully edited",
                icon: "success",
                confirmButtonText: "OK",
            });
            updatedProduct();
            window.location.reload();
        }
    });
}
window.deleteFeature = deleteFeature;
window.deleteProduct = deleteProduct;
let products = JSON.parse(localStorage.getItem("products") || "[]");
let varieties = JSON.parse(localStorage.getItem("varieties") || "[]");
let categories = JSON.parse(localStorage.getItem("categories") || "[]");
function getCombinedProducts() {
    const combined = [];
    products.forEach((product) => {
        const category = categories.find((c) => c.id === product.category_id);
        const productVariants = varieties.filter((v) => v.product_id === product.id);
        // for now it is not working but later one when I will fixed the issue with the id I can change it
        if (productVariants.length === 0) {
            combined.push({
                product_id: product.id,
                product_name: product.name,
                product_sku: product.sku,
                is_active: product.is_active,
                category_name: category ? category.name : "N/A",
            });
        }
        productVariants.forEach((variant) => {
            combined.push({
                product_id: product.id,
                product_name: product.name,
                product_sku: product.sku,
                category_name: category ? category.name : "N/A",
                is_active: product.is_active,
                variant_name: variant.product_variant_name,
                variant_sku: variant.sku,
                price: variant.price,
                quantity: 0,
                reserved_quantity: 0,
            });
        });
    });
    return combined;
}
function renderTable() {
    const tableBody = document.querySelector("#productTable tbody");
    if (!tableBody) {
        console.error("Table body not found");
        return;
    }
    const finalProductList = getCombinedProducts();
    if (finalProductList.length === 0) {
        showWarning();
        return;
    }
    tableBody.innerHTML = "";
    finalProductList.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td class="py-3 px-4 ">${index + 1}</td>
      <td class="py-3 px-4 ">${product.product_name}</td>
      <td class="py-3 px-4 ">${product.category_name}</td>
      <td class="py-3 px-4 ">${product.product_sku}</td>
      <td class="py-3 px-4 ">${product.variant_name ?? "-"}</td>
      <td class="py-3 px-4 ">${product.variant_sku ?? "-"}</td>
      <td class="py-3 px-4 ">${product.price ?? "-"}</td>
      <td class="py-3 px-4 ">${product.price ?? "-"}</td>
      <td class="py-3 px-4 text-green-500">${product.is_active ?? "-"}</td>
      <td class="py-3 px-4 ">${getCurrentStock(product.product_id, 1)}</td>
   

      
        <td class="py-3 px-4"> <i class="fa-solid fa-trash cursor-pointer" style="color: #1e2939;" onclick="deleteFeature(${product.product_id})"></i>
      </td>


        <td class="py-3 px-4"> <i class="fa-solid fa-pen-to-square cursor-pointer" style="color: #1e2939;" onclick="editProduct(${product.product_id})"></i>
      </td>
  
    `;
        // <td class="py-3 px-4 ">${product.reserved_quantity ?? "-"}</td> 
        tableBody.appendChild(row);
    });
}
function deleteProduct(id) {
    products = products.filter((p) => p.id != id);
    varieties = varieties.filter((v) => v.product_id != id);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("varieties", JSON.stringify(varieties));
    //   showDelete();
}
window.deleteProduct = deleteProduct;
function loadCategoriesForDropdown(selectedCategoryId = null) {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const select = document.getElementById("product-category");
    select.innerHTML = `<option value="">Select Category</option>`;
    categories.forEach((category) => {
        const isSelected = selectedCategoryId !== null && category.id === selectedCategoryId
            ? "selected"
            : "";
        select.innerHTML += `
      <option value="${category.id}" ${isSelected}>
        ${category.name}
      </option>
    `;
    });
}
renderTable();
let editingProductId = null;
function editProduct(id) {
    console.log("edit-btn-clicked");
    const product = products.find(p => p.id == id);
    console.log("produ t", product);
    const variant = varieties.find(v => v.product_id == id);
    //   if (!product && !variant) return;
    editingProductId = id;
    const editForm = document.getElementById("edit-form");
    console.log("editform", editForm);
    const table = document.getElementById("productTable");
    editForm.classList.remove("hidden");
    table.classList.add("hidden");
    document.getElementById("product-name").value =
        product.name;
    document.getElementById("product-sku").value =
        product.sku;
    //   (document.getElementById("product-category") as HTMLSelectElement).value =
    //     product.category_id ? String(product.category_id) : "";
    loadCategoriesForDropdown(product?.category_id);
    //   (document.getElementById("product-category") as HTMLSelectElement).value =
    //     product.category_id ? String(product.category_id) : "";
    if (variant) {
        document.getElementById("product-variant-name").value =
            variant.product_variant_name;
        document.getElementById("product-variant-sku").value =
            variant.sku;
        document.getElementById("product-price").value =
            String(variant.price);
    }
}
window.editProduct = editProduct;
function updatedProduct() {
    if (editingProductId == null)
        return;
    const updatedProduct = {
        id: editingProductId,
        name: document.getElementById("product-name").value,
        sku: document.getElementById("product-sku").value,
        category_id: Number(document.getElementById("product-category").value) || null,
        reorder_level: 0, organization_id: 1,
        is_active: true
    };
    const variantId = varieties.find(v => v.product_id == editingProductId);
    const updateVariant = {
        product_variant_name: document.getElementById("product-variant-name").value,
        sku: document.getElementById("product-variant-sku").value,
        price: Number(document.getElementById("product-price").value),
        id: Number(variantId?.id),
        product_id: editingProductId
    };
    console.log("editiingProductId", editingProductId);
    products = products.map(p => p.id == editingProductId
        ? updatedProduct
        : p);
    varieties = varieties.map(v => v.product_id == editingProductId
        ? updateVariant
        : v);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("varieties", JSON.stringify(varieties));
    document.getElementById("edit-form")?.classList.add("hidden");
    document.getElementById("productTable")?.classList.remove("hidden");
    editingProductId = null;
    renderTable();
    Swal.fire({
        title: "Success!",
        text: "Product Updated Successfully",
        icon: "success",
        confirmButtonText: "OK"
    });
}
window.updatedProduct = updatedProduct;
const btn = document.getElementById("edit-btn");
console.log("btn", btn);
btn?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("edit-btnclicked");
    // updatedProduct();
    editFeature();
});
//# sourceMappingURL=productList.js.map