const organization_id = 1;
const STORAGE_KEY = "categories";
let categories = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const form = document.getElementById("category-form");
// const tableBody = document.getElementById("category-table") as HTMLElement;
const table = document.querySelector("#categoryTable");
let sub_form = document.getElementById("category-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("category");
    const name = document.getElementById("name").value.trim();
    if (!name) {
        alert("Category name required");
        return;
    }
    const existsCategory = categories.some(cat => cat.name.toLowerCase() === name.toLowerCase()
        && cat.organization_id === organization_id);
    if (existsCategory) {
        alert("Category already exists");
        return;
    }
    const newCategory = {
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
const btn = document.getElementById("add-btn");
console.log("btn", btn);
btn.addEventListener("click", () => {
    console.log("clicked");
    sub_form.classList.toggle("hidden");
    table.classList.toggle("hidden");
});
function renderCategories() {
    const tableBody = document.querySelector("#categoryTable tbody");
    tableBody.innerHTML = "";
    categories.forEach((cat, index) => {
        tableBody.innerHTML += `
            <tr>
                <td class="p-2">${index + 1}</td>
                <td class="p-2">${cat.name}</td>
                <td class="p-2">${cat.is_active}</td>
        

               
            </tr>
        `;
    });
}
renderCategories();
export {};
//# sourceMappingURL=addCategory.js.map