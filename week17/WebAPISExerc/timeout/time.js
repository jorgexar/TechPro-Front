let searchTimeout;
const search = document.getElementById("search");
const result = document.getElementById("results");
const stats = document.getElementById("stats");
let keystrokes = 0;
let searches =0;
search.addEventListener("input",(e)=>{

    clearTimeout(searchTimeout);
    keystrokes++;
    if(!e.target.value){
        result.textContent = "";
        return
    }
    searchTimeout = setTimeout(()=>{
        result.innerHTML = `Searching for: <strong>${e.target.value}</strong>`
        searches++;
        stats.textContent = `KeyStrokes : ${keystrokes} -- Completed Searches :${searches}`
    },500)

})