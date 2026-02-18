const form = document.getElementById("multiStepForm")
const groups = document.querySelectorAll(".form-group");
const buttons = document.querySelectorAll("button");
for(let i=0; i<buttons.length;i++){
    buttons[i].addEventListener("click",(e)=>{
        e.preventDefault();
    })
}
// console.log(groups)

let currentIndex = 0
let currentGroup = groups[currentIndex]
currentGroup.style.display = "block"

function goBack(){
    
    currentGroup.style.display = "none";
    currentIndex--;
    currentGroup = groups[currentIndex]
    currentGroup.style.display = "block"; 
    
}
function validateAndShowNextGroup(){
    const inputs = currentGroup.querySelectorAll("input");
    for(input of inputs){
        if(input.checkValidity()){
            console.log(`${input.name} : ${input.checkValidity()}`)
            
        }else{
            input.reportValidity();
            console.log(`${input.name} : ${input.checkValidity()}`)
            return 0;
        }
    }
    currentGroup.style.display = "none";
    currentIndex++;
    currentGroup = groups[currentIndex]
    currentGroup.style.display = "block";     
}
