document.addEventListener("DOMContentLoaded", () => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const categories = JSON.parse(localStorage.getItem("categories") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const customerOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
    document.getElementById("total-products").textContent =
        products.length.toString();
    document.getElementById("total-categories").textContent =
        categories.length.toString();
    document.getElementById("total-users").textContent =
        users.length.toString();
    document.getElementById("total-orders").textContent =
        customerOrders.length.toString();
});
export {};
//# sourceMappingURL=Dashboard.js.map