import { logoutAdmin,  verifyToken } from "./Auth.js";


export function logout(){
    
    const logoutbtn = document.getElementById("logout") as HTMLButtonElement;
    
    
    logoutbtn.addEventListener("click",()=>{
        logoutAdmin()
        
        window.location.reload();
        
        
        
    })
}

export async function rolefinder(){
    const user_label = document.getElementById("user-label")as HTMLDivElement
    const isTokenIsStillValid = await verifyToken();
    console.log(user_label);

  const role = isTokenIsStillValid.payload.payload.role;
  const p = document.createElement(`p`)
    p.innerHTML =  `<p 
     
      class="px-5 py-2 text-sm font-medium border rounded-3xl  text-gray-700 hover:text-black transition duration-200 mr-3"
    >
   ${role}
  </p>`
  user_label.append(p)


  
  console.log(role);
}

  


// if(userRole.)
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