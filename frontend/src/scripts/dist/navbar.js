import { logoutAdmin } from "./Auth.js";
export function logout() {
    const logoutbtn = document.getElementById("logout");
    logoutbtn.addEventListener("click", () => {
        logoutAdmin();
        window.location.reload();
    });
}
//# sourceMappingURL=navbar.js.map