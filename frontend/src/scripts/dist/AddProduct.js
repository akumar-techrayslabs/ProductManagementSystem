import { hasPermission } from "./protect.js";
console.log("Products page");
let products = JSON.parse(localStorage.getItem("products") || "[]");
let varieties = JSON.parse(localStorage.getItem("varieties") || "[]");
const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!hasPermission("ADD_PRODUCT")) {
        alert("You are not authorized");
        return;
    }
    else {
        const organization_id = 1;
        const name = document.getElementById("product-name").value.trim();
        const sku = document.getElementById("product-sku").value.trim();
        const category_id = Number(document.getElementById("product-category").value) || null;
        const reorder_level = 0;
        //   const skuExists = products.some(
        //     (p) => p.organization_id === organization_id && p.sku === sku,
        //   );
        //   if (skuExists) {
        //     alert("SKU already exists for this organization");
        //     return;
        //   }
        const productId = Date.now();
        const newProduct = {
            id: productId,
            organization_id,
            name,
            sku,
            category_id,
            reorder_level,
            is_active: true,
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        const variant_name = document.getElementById("product-variant-name").value.trim();
        const variant_sku = document.getElementById("product-variant-sku").value.trim();
        const variant_price = Number(document.getElementById("product-price").value);
        if (variant_sku) {
            const variantExists = varieties.some((v) => v.sku === variant_sku);
            if (variantExists) {
                alert("Variant SKU must be unique");
                return;
            }
            const newVariant = {
                id: Date.now() + 1,
                product_id: productId,
                product_variant_name: variant_name,
                sku: variant_sku,
                price: variant_price,
            };
            varieties.push(newVariant);
            localStorage.setItem("varieties", JSON.stringify(varieties));
        }
        alert("Product Created Successfully");
        form.reset();
    }
});
function loadCategoriesForDropdown() {
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    console.log("loadcategory running");
    if (categories.length === 0) {
        console.log("No category available");
        alert("No categories added Please add a category First!");
    }
    const select = document.getElementById("product-category");
    select.innerHTML = `<option value="">Select Category</option>`;
    categories
        .forEach((category) => {
        select.innerHTML += `
                <option value="${category.id}">
                    ${category.name}
                </option>
            `;
    });
}
window.addEventListener("DOMContentLoaded", () => {
    loadCategoriesForDropdown();
});
//# sourceMappingURL=AddProduct.js.map