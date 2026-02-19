interface Suppliers {
    id: number;
    organization_id: number;
    name: string; 
    email:string;
    is_active: boolean;
}
declare var Swal:any
function showSuccess() {
  Swal.fire({
    title: "Success!",
    text: "Supplier Added Successfully",
    icon: "success",
    confirmButtonText: "OK",
  });
}
(window as any).showSuccess = showSuccess

const organization_id = 1;

const STORAGE_KEY = "suppliers";

let suppliers: Suppliers[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);

const form = document.getElementById("supplier-form") as HTMLFormElement;



form.addEventListener("submit", (e) => {
    e.preventDefault();

   console.log("suppliers");
   

    const name = (
        document.getElementById("name") as HTMLInputElement
    ).value.trim();
    const email = (
        document.getElementById("email") as HTMLInputElement
    ).value.trim();

    if (!name) {
        alert("Suppliers name required");
        return;
    }
    if (!email) {
        alert("Email is required");
        return;
    }

   
    const existsSupplierEmail = suppliers.some(
        sup => sup.email === email
            && sup.organization_id === organization_id
    );

    if (existsSupplierEmail) {
        alert("Supplier with this email id is already exists");
        return;
    }

    const newSupplier: Suppliers = {
        id: Number(Date.now().toString()),
        organization_id,
        name,
        email,
        is_active: true
    };

    suppliers.push(newSupplier);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(suppliers));
    showSuccess();
    // renderCategories();
    form.reset();
});


// function renderCategories() {
//     tableBody.innerHTML = "";

//     categories.forEach(cat => {
//         tableBody.innerHTML += `
//             <tr>
//                 <td class="border p-2">${cat.id}</td>
//                 <td class="border p-2">${cat.organization_id}</td>
//                 <td class="border p-2">${cat.name}</td>
//                 <td class="border p-2">
//                     ${cat.is_active ? "Active" : "Inactive"}
//                 </td>
//             </tr>
//         `;
//     });
// }

// renderCategories();
