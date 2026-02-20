import { loadComponent } from "./layout.js";
import { logout, rolefinder } from "./navbar.js";
import { sidebar } from "./sidebar.js";
document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("sidebar-placeholder", "/frontend/src/components/sidebar.html");
    await loadComponent("dashboard-placeholder", "/frontend/src/pages/Dashboard.html");
    await loadComponent("sidebar-navbar", "/frontend/src/components/navbar.html");
    sidebar();
    logout();
    await rolefinder();
});
localStorage.setItem("movementTypes", JSON.stringify([
    { id: 1, name: "IN" },
    { id: 2, name: "OUT" }
]));
localStorage.setItem("permissions", JSON.stringify([
    { id: 1, name: "CREATE_PRODUCT" },
    { id: 2, name: "EDIT_PRODUCT" },
    { id: 3, name: "DELETE_PRODUCT" },
    { id: 4, name: "VIEW_STOCK" },
    { id: 5, name: "CREATE_ORDER" },
    { id: 6, name: "DELETE_ORDER" }
]));
//# sourceMappingURL=index.js.map