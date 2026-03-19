const theme = {
    dark: {
        background : "#1a1a2e",
        text: " #e0e0e0"
    },
    light:{
        background: "#ffffff ",
       text : "#000"
    }
}
const light = document.getElementById("light");
const dark = document.getElementById("dark");
const clear = document.getElementById("clear");

light.addEventListener("click",(e)=>{
    localStorage.setItem("theme","light")
    console.log(localStorage.getItem("theme"))
    applyTheme()
})
dark.addEventListener("click",(e)=>{
    localStorage.setItem("theme","dark")
    
    console.log(localStorage.getItem("theme"))
    applyTheme()
})
clear.addEventListener("click",(e)=>{
    localStorage.removeItem("theme")
    applyTheme()
})
window.addEventListener("load",(e)=>{
    if(localStorage.getItem("theme")){
        console.log(localStorage.getItem("theme"))
        applyTheme()
    }
})
function applyTheme(){
    const root = document.documentElement;
    if(localStorage.getItem("theme")){
         const activeTheme = localStorage.getItem("theme");
        console.log(localStorage.getItem("theme"))
       
        console.log(theme[activeTheme].background);
        root.style.backgroundColor = `${theme[activeTheme].background}`
        root.style.color = `${theme[activeTheme].text}`
    }
}