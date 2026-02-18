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



console.log("Products page");


let products: Product[] = JSON.parse(
  localStorage.getItem("products") || "[]",
);

let varieties: ProductVariant[] = JSON.parse(
  localStorage.getItem("varieties") || "[]",
);

const form = document.getElementById("product-form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const organization_id = 1
  const name = (
    document.getElementById("product-name") as HTMLInputElement
  ).value.trim();
  const sku = (
    document.getElementById("product-sku") as HTMLInputElement
  ).value.trim();
  const category_id =
    Number(
      (document.getElementById("product-category") as HTMLSelectElement).value,
    ) || null;

  const reorder_level = 0;

  
//   const skuExists = products.some(
//     (p) => p.organization_id === organization_id && p.sku === sku,
//   );

//   if (skuExists) {
//     alert("SKU already exists for this organization");
//     return;
//   }

  const productId = Date.now();

  const newProduct: Product = {
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


  const variant_name = (
    document.getElementById("product-variant-name") as HTMLInputElement
  ).value.trim();
  const variant_sku = (
    document.getElementById("product-variant-sku") as HTMLInputElement
  ).value.trim();
  const variant_price = Number(
    (document.getElementById("product-price") as HTMLInputElement).value,
  );

  if (variant_sku) {
    const variantExists = varieties.some((v) => v.sku === variant_sku);

    if (variantExists) {
      alert("Variant SKU must be unique");
      return;
    }

    const newVariant: ProductVariant = {
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
});

function loadCategoriesForDropdown() {
  const categories = JSON.parse(localStorage.getItem("categories") || "[]");
  console.log("loadcategory running");
  
  if(categories.length === 0 )
  {
    console.log("No category available");
    alert("No categories added Please add a category First!")
  }
  const select = document.getElementById(
    "product-category",
  ) as HTMLSelectElement;

  select.innerHTML = `<option value="">Select Category</option>`;

  categories
    .forEach((category: any) => {
      select.innerHTML += `
                <option value="${category.id}">
                    ${category.name}
                </option>
            `;
    });
}

window.addEventListener("DOMContentLoaded",()=>{

    loadCategoriesForDropdown();
})
