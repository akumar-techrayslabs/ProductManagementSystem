import { logoutAdmin } from "./Auth.js";
import { loadComponent } from "./layout.js";
import { logout } from "./navbar.js";



import { sidebar } from "./sidebar.js";


document.addEventListener("DOMContentLoaded", async () => {

  await loadComponent("sidebar-placeholder", "/frontend/src/components/sidebar.html");
  await loadComponent("dashboard-placeholder", "/frontend/src/pages/Dashboard.html");
  await loadComponent("sidebar-navbar", "/frontend/src/components/navbar.html");
  sidebar();
  logout();
});


localStorage.setItem("movementTypes", JSON.stringify([
  { id: 1, name: "IN" },
  { id: 2, name: "OUT" }
]));
