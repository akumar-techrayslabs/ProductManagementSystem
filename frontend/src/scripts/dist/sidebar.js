export function sidebar() {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    // console.log(menuBtn);
    // console.log("dhduihsdjiue");
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("-translate-x-full");
    });
}
//# sourceMappingURL=sidebar.js.map