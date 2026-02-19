interface User {
  id: number;
  organization_id: number;
  full_name: string;
  email:string;
  phone_no:string;
  password:string;
  role_id:number|null;
  is_active: boolean;
}
declare var Swal:any
function showSuccess() {
  Swal.fire({
    title: "Success!",
    text: "User Added Successfully",
    icon: "success",
    confirmButtonText: "OK",
  }).then(()=>{
    form.reset();
  });
}
(window as any).showSuccess = showSuccess


console.log("User Management page");


let users: User[] = JSON.parse(
  localStorage.getItem("users") || "[]",
);


const form = document.getElementById("user-form") as HTMLFormElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const organization_id = 1
  const full_name = (
    document.getElementById("user-name") as HTMLInputElement
  ).value.trim();
  const email = (
    document.getElementById("user-email") as HTMLInputElement
  ).value.trim();
  const phone_no = (document.getElementById("user-phone") as HTMLSelectElement).value;
  const password = (document.getElementById("user-password") as HTMLSelectElement).value;
   
  const role_id =
    Number(
      (document.getElementById("user-role") as HTMLSelectElement).value,
    ) || null;


  

  const userId = Date.now();

  const newUser: User = {
    id: userId,
    organization_id,
    full_name,
    email,
    phone_no,
    role_id,
    password,
    is_active: true,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  showSuccess();
})

function loadRolesForDropdown() {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  console.log("loadroles running");
  
  if(roles.length === 0 )
  {
    console.log("No roles available");
    alert("No roles added Please add a Role First!")
  }
  const select = document.getElementById(
    "user-role",
  ) as HTMLSelectElement;

  select.innerHTML = `<option value="">Select Role</option>`;

  roles
    .forEach((roles: any) => {
      select.innerHTML += `
                <option value="${roles.id}">
                    ${roles.name}
                </option>
            `;
    });
}

window.addEventListener("DOMContentLoaded",()=>{

    loadRolesForDropdown();
})
