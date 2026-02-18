interface Category {
    id: number;
    organization_id: number;
    name: string;
    is_active: boolean;
}


const organization_id = 1;

const STORAGE_KEY = "categories";

let categories: Category[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);

const form = document.getElementById("category-form") as HTMLFormElement;
// const tableBody = document.getElementById("category-table") as HTMLElement;


form.addEventListener("submit", (e) => {
    e.preventDefault();

   console.log("category");
   

    const name = (
        document.getElementById("name") as HTMLInputElement
    ).value.trim();

    if (!name) {
        alert("Category name required");
        return;
    }

   
    const existsCategory = categories.some(
        cat => cat.name.toLowerCase() === name.toLowerCase()
            && cat.organization_id === organization_id
    );

    if (existsCategory) {
        alert("Category already exists");
        return;
    }

    const newCategory: Category = {
        id: Number(Date.now().toString()),
        organization_id,
        name,
        is_active: true
    };

    categories.push(newCategory);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));

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
