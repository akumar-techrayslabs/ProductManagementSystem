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
  }).then(()=>{
    window.location.reload();
  });
}
(window as any).showSuccess = showSuccess
const form = document.getElementById("role-form") as HTMLFormElement;
// const tableBody = document.getElementById("category-table") as HTMLElement;
const table = document.querySelector(
  "#roleTable",
) as HTMLTableSectionElement;
  let sub_form = document.getElementById("role-form") as HTMLElement;

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
      form.classList.toggle("hidden");
  table.classList.toggle("hidden")
    // renderCategories();
    form.reset();
});



const btn = document.getElementById("add-btn") as HTMLDivElement;
console.log("btn", btn);

btn.addEventListener("click", () => {
  console.log("clicked");
  

  form.classList.toggle("hidden");
  table.classList.toggle("hidden")
});
function renderSuppliers() {
    const tableBody = document.querySelector(
  "#roleTable tbody",
) as HTMLTableSectionElement;
  tableBody.innerHTML = "";

  roles.forEach((role, index) => {
    tableBody.innerHTML += `
            <tr>
                <td class="p-2">${index + 1}</td>
                <td class="p-2">${role.name}</td>
 

               
            </tr>
        `;
  });
}

renderSuppliers();
