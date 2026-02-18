import { logoutAdmin } from "./Auth.js";
export function logout() {
    const logoutbtn = document.getElementById("logout");
    logoutbtn.addEventListener("click", () => {
        logoutAdmin();
        window.location.reload();
    });
}
/* function deleteFeature(id: string) {

    Swal.fire({
    title: "Are you sure?",
    text: "This feature will be permanently deleted",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancel",
    cancelButtonColor: "#64748B",
    confirmButtonText: "Yes, Delete it",
    confirmButtonColor: "#DC2626"

    }).then((result: any) => {
        if(result.isConfirmed){
             const features = getFeatures().filter(f => f.id != id);
             setFeatures(features);
             renderFeatures();
             Swal.fire({
                 title: "Deleted",
                 text: "Feature successfully deleted",
                 icon: "success",
                 confirmButtonText: "OK",
             });
        }
    });



  }(window as any).deleteFeature = deleteFeature;
*/ 
//# sourceMappingURL=navbar.js.map