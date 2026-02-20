import { getCurrentStock } from "./stockManagement.js";

interface Product {
  id: number;
  warehouse_id: number;
  name: string;
  sku: string;
  category_id: number | null;
  reorder_level: number;
  is_active: boolean;
}

interface ProductVariant {
  id: number;
  product_id: number;
  product_variant_name: string;
  sku: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
}

interface CombinedProduct {
  product_id: number;
  product_name: string;
  product_sku: string;
  category_name: string;
   warehouse_name:string;
  is_active: boolean;
  variant_name?: string;
  variant_sku?: string;
  price?: number;
  quantity?: number;
  reserved_quantity?: number;
}

declare var Swal: any;

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

function deleteFeature(id: number) {
  Swal.fire({
    title: "Are you sure?",
    text: "This will be deleted and can't be recover later",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#64748B",
    confirmButtonText: "Yes, Delete it",
    confirmButtonColor: "#DC2626",
  }).then((result: any) => {
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
  }).then((result: any) => {
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
(window as any).deleteFeature = deleteFeature;

(window as any).deleteProduct = deleteProduct;

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

let varieties: ProductVariant[] = JSON.parse(
  localStorage.getItem("varieties") || "[]",
);

let categories: Category[] = JSON.parse(
  localStorage.getItem("categories") || "[]",
);

 const warehouses = JSON.parse(localStorage.getItem("warehouses") || "[]");
function getCombinedProducts(): CombinedProduct[] {
  const combined: CombinedProduct[] = [];

 products.forEach((product) => {


  const category = categories.find((c) => c.id === product.category_id);


  const warehouseObj = warehouses.find(
    (war: any) => Number(war.id) === Number(product.warehouse_id)
  );


  const warehouse_name = warehouseObj ? warehouseObj.name : "N/A";


  const productVariants = varieties.filter(
    (v) => v.product_id === product.id,
  );


  if (productVariants.length === 0) {
    combined.push({
      product_id: product.id,
      product_name: product.name,
      product_sku: product.sku,
      is_active: product.is_active,
      warehouse_name: warehouse_name,
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
      warehouse_name: warehouse_name,
      quantity: 0,
      reserved_quantity: 0,
    });
  });


});



  return combined;
}

function renderTable() {
  const tableBody = document.querySelector(
    "#productTable tbody",
  ) as HTMLTableSectionElement;

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
      <td class="py-3 px-4 ">${product.warehouse_name}</td>
      <td class="py-3 px-4 text-green-500">${product.is_active ?? "-"}</td>
      <td class="py-3 px-4 ">${getCurrentStock(product.product_id,1)}</td>
   

      
        <td class="py-3 px-4"> <i class="fa-solid fa-trash cursor-pointer" style="color: #1e2939;" onclick="deleteFeature(${product.product_id})"></i>
      </td>


        <td class="py-3 px-4"> <i class="fa-solid fa-pen-to-square cursor-pointer" style="color: #1e2939;" onclick="editProduct(${product.product_id})"></i>
      </td>
  
    `;
        // <td class="py-3 px-4 ">${product.reserved_quantity ?? "-"}</td> 

    tableBody.appendChild(row);
  });
}

function deleteProduct(id: number): void {
  products = products.filter((p) => p.id != id);
  varieties = varieties.filter((v) => v.product_id != id);

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("varieties", JSON.stringify(varieties));

//   showDelete();
}
(window as any).deleteProduct = deleteProduct;

function loadCategoriesForDropdown(selectedCategoryId: number | null = null) {
  const categories = JSON.parse(localStorage.getItem("categories") || "[]");


  const select = document.getElementById(
    "product-category"
  ) as HTMLSelectElement;


  select.innerHTML = `<option value="">Select Category</option>`;


  categories.forEach((category: any) => {
    const isSelected =
      selectedCategoryId !== null && category.id === selectedCategoryId
        ? "selected"
        : "";


    select.innerHTML += `
      <option value="${category.id}" ${isSelected}>
        ${category.name}
      </option>
    `;
  });
}

function loadWarehousesForDropdown(selectedWarehouseId: number | null = null) {
  const warehouses = JSON.parse(
    localStorage.getItem("warehouses") || "[]"
  );

  const select = document.getElementById(
    "warehouse_id"
  ) as HTMLSelectElement;

  select.innerHTML = `<option value="">Select Warehouse</option>`;

  warehouses.forEach((warehouse: any) => {
    const isSelected =
      selectedWarehouseId !== null &&
      warehouse.id === selectedWarehouseId
        ? "selected"
        : "";

    select.innerHTML += `
      <option value="${warehouse.id}" ${isSelected}>
        ${warehouse.name}
      </option>
    `;
  });
}

renderTable();
let editingProductId:number|null = null
function editProduct(id: number): void {
    console.log("edit-btn-clicked");
    

  const product = products.find(p => p.id == id);
  console.log("produ t",product);
  
  const variant = varieties.find(v => v.product_id == id);

//   if (!product && !variant) return;

   editingProductId = id;


  const editForm = document.getElementById("edit-form") as HTMLElement;
  console.log("editform",editForm);
  
  const table = document.getElementById("productTable") as HTMLElement;

  editForm.classList.remove("hidden");
  table.classList.add("hidden");


  (document.getElementById("product-name") as HTMLInputElement).value =
    product.name;

  (document.getElementById("product-sku") as HTMLInputElement).value =
    product.sku;

//   (document.getElementById("product-category") as HTMLSelectElement).value =
//     product.category_id ? String(product.category_id) : "";
    loadCategoriesForDropdown(product?.category_id)
    loadWarehousesForDropdown(product?.warehouse_id)
//   (document.getElementById("product-category") as HTMLSelectElement).value =
//     product.category_id ? String(product.category_id) : "";




  if (variant) {
    (document.getElementById("product-variant-name") as HTMLInputElement).value =
      variant.product_variant_name;

    (document.getElementById("product-variant-sku") as HTMLInputElement).value =
      variant.sku;

    (document.getElementById("product-price") as HTMLInputElement).value =
      String(variant.price);
  }
 
}

(window as any).editProduct = editProduct;



function updatedProduct(): void {

  if (editingProductId == null) return;
const updatedProduct :Product = {
    id:editingProductId,
     name:
    (document.getElementById("product-name") as HTMLInputElement).value,
  sku : (document.getElementById("product-sku") as HTMLInputElement).value,

  category_id :
    Number(
      (document.getElementById("product-category") as HTMLSelectElement).value
    ) || null,

  reorder_level : 0,
  warehouse_id: Number(
  (document.getElementById("warehouse_id") as HTMLSelectElement).value
),

  is_active:true

}
 const variantId  = varieties.find(v=>v.product_id == editingProductId);
  const updateVariant:ProductVariant={
    product_variant_name :
    (document.getElementById("product-variant-name") as HTMLInputElement).value,

   sku :
    (document.getElementById("product-variant-sku") as HTMLInputElement).value,

   price :
    Number(
      (document.getElementById("product-price") as HTMLInputElement).value
    ),
    id:Number(variantId?.id),
    product_id:editingProductId


}
console.log("editiingProductId",editingProductId);


  products = products.map(p =>
    p.id == editingProductId
      ? updatedProduct
      : p
  );



  varieties = varieties.map(v =>
    v.product_id == editingProductId
      ? updateVariant
      : v
  );

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("varieties", JSON.stringify(varieties));

  document.getElementById("edit-form")?.classList.toggle("hidden");
  document.getElementById("productTable")?.classList.toggle("hidden");

  editingProductId = null;

  renderTable();

  Swal.fire({
    title: "Success!",
    text: "Product Updated Successfully",
    icon: "success",
    confirmButtonText: "OK"
  });
}

(window as any).updatedProduct = updatedProduct;


  const btn = document.getElementById("edit-btn") as HTMLButtonElement;
    console.log("btn",btn);
    
  btn?.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("edit-btnclicked");
    // updatedProduct();
    editFeature();
   
 document.getElementById("edit-form")?.classList.toggle("hidden");
document.getElementById("productTable")?.classList.toggle("hidden");
  })
