interface Role {
    id: number;
    organization_id: number;
    name: string;
    
}


const organization_id = 1;

const STORAGE_KEY = "roles";

let roles: Role[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);
declare var Swal: any;

function showSuccess() {
  Swal.fire({
    title: "Success!",
    text: "Role Added Successfully",
    icon: "success",
    confirmButtonText: "OK",
  });
}
(window as any).showSuccess = showSuccess
const form = document.getElementById("role-form") as HTMLFormElement;
// const tableBody = document.getElementById("category-table") as HTMLElement;


form.addEventListener("submit", (e) => {
    e.preventDefault();

   console.log("roles");
   

    const name = (
        document.getElementById("name") as HTMLInputElement
    ).value.trim();

    if (!name) {
        alert("Role name required");
        return;
    }

   
    const existsCategory = roles.some(
        rol => rol.name.toLowerCase() === name.toLowerCase()
            && rol.organization_id === organization_id
    );

    if (existsCategory) {
        alert("Role already exists");
        return;
    }

    const newRole: Role = {
        id: Number(Date.now().toString()),
        organization_id,
        name,
  
    };

    roles.push(newRole);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
    
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
