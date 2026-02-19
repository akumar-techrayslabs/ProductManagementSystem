


export function sidebar()
{
const menuBtn = document.getElementById("menu-btn") as HTMLButtonElement;
const sidebar = document.getElementById("sidebar") as HTMLDivElement;
// console.log(menuBtn);
// console.log("dhduihsdjiue");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});
}
