interface Product {
  id: number;
  organization_id: number;
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

function showDelete() {
  Swal.fire({
    title: "Success!",
    text: "Product Deleted Successfully",
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    window.location.reload();
  });
}

(window as any).deleteProduct = deleteProduct;

let products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");

let varieties: ProductVariant[] = JSON.parse(
  localStorage.getItem("varieties") || "[]",
);

let categories: Category[] = JSON.parse(
  localStorage.getItem("categories") || "[]",
);

function getCombinedProducts(): CombinedProduct[] {
  const combined: CombinedProduct[] = [];

  products.forEach((product) => {
    const category = categories.find((c) => c.id === product.category_id);

    const productVariants = varieties.filter(
      (v) => v.product_id === product.id,
    );

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
        quantity: 12,
        reserved_quantity: 65,
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
      <td class="py-3 px-4 ">${product.price ?? "-"}</td>
      <td class="py-3 px-4 text-green-500">${product.is_active ?? "-"}</td>
      <td class="py-3 px-4 ">${product.quantity ?? "-"}</td>
      <td class="py-3 px-4 ">${product.reserved_quantity ?? "-"}</td>

      
        <td class="py-3 px-4"> <i class="fa-solid fa-trash cursor-pointer" style="color: #1e2939;" onclick="deleteProduct('${product.product_id}')"></i>
      </td>
    
  
    `;

    //     <td class="py-3 px-4"> <i class="fa-solid fa-pen-to-square cursor-pointer" style="color: #1e2939;" onclick="deleteProduct('${product.product_id}')"></i>
    //   </td>

    tableBody.appendChild(row);
  });
}

function deleteProduct(id: number): void {
  products = products.filter((p) => p.id != id);
  varieties = varieties.filter((v) => v.product_id != id);

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("varieties", JSON.stringify(varieties));

  showDelete();
}
(window as any).deleteProduct = deleteProduct
renderTable();
