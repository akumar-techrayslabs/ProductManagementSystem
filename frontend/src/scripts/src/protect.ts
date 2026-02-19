import {verifyToken } from "../dist/Auth.js";


document.addEventListener('DOMContentLoaded', async ()=>{
    const isTokenIsStillValid = await verifyToken();
    // console.log(isTokenIsStillValid);
    
    if(!isTokenIsStillValid)
    {
        window.location.href = '/frontend/src/pages/Auth.html'
    }
})