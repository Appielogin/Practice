let modeBtn = document.getElementById("modeBtn");
let body = document.querySelector("body");
let currMode = "light";

// const changeMode = () => {
    
//     if (currMode === "light"){
//         currMode = "dark";
//          body.classList.add("dark");
//          body.classList.remove("light");        
//     } else {
//         currMode = "light";
//          body.classList.add("light");
//          body.classList.remove("dark");
//     }
// }

modeBtn.addEventListener("click", () => {
    body.classList.toggle("dark")
});