const fullName = document.getElementById("name");
const email = document.getElementById("email");
const deliveryMethod = document.getElementById("deliveryMethod")
const zone = document.getElementById("zone");
const notes = document.getElementById("notes");
const submit = document.getElementById("submit");

const totalDisplay = document.getElementById("totalDisplay");
const totalBreakdown = document.getElementById("totalBreakdown");
const output = document.getElementById("output")
const basePrice = 12;
let shippingCost = 0;
let totalCost = basePrice + shippingCost;

totalDisplay.textContent = `Total: €${totalCost.toFixed(2)}`
function detailTotal(){
    totalBreakdown.textContent = `Base: €${basePrice.toFixed(2)}`;
    if(shippingCost>0){
        totalBreakdown.textContent += ` + Shipping: €${shippingCost.toFixed(2)}`
    }
    totalDisplay.textContent = `Total: €${totalCost.toFixed(2)}`
}

const order = {
    name : "",
    email : "",
    delivery_method : "",
    zone : "",
    notes : "",
    base_price : 0,
    shipping_cost : 0,
    total_cost : 0
}



const zones = {
        "zone_a" : 2.5,
        "zone_b" : 4,
        "zone_c" : 6.5
}
const deliveryFees = {
    "pickup" : 0,
    "courier" : 0
}

function getShippingCost(method){
    totalCost = basePrice + deliveryFees[`${method}`];
    return deliveryFees[`${method}`]
}

deliveryMethod.addEventListener("change",(e)=>{
    if(deliveryMethod.value === "courier"){
        zone.removeAttribute("disabled")
        zone.setAttribute("required",true)
        
    }else{
        zone.setAttribute("disabled",true)
        zone.removeAttribute("required")
        shippingCost = getShippingCost(deliveryMethod.value);
    }


    console.log(deliveryMethod.value)
})

zone.addEventListener("change",(e)=>{
    deliveryFees.courier = zones[`${zone.value}`];
    shippingCost = getShippingCost(deliveryMethod.value);
})
const form = document.getElementById("myForm")
form.addEventListener("change",()=>{
    detailTotal();
    console.log("triggerd")
})

submit.addEventListener("click",(e)=>{
    e.preventDefault()
    const fd = new FormData(form);
    const formData = Object.fromEntries(fd.entries());
    const out = {
        ...formData,
        basePrice,
        shippingCost,
        totalCost,
        createdAt : new Date().toISOString()
    }
    createSummary(out)
   if(form.checkValidity()){
    
    // order.name = fullName.value;
    // order.email = email.value;
    // order.delivery_method = deliveryMethod.value;
    // order.zone = zone.value;
    // order.notes = notes.value;
    // order.base_price = basePrice;
    // order.shipping_cost = shippingCost;
    // order.total_cost = order.base_price + order.shipping_cost;
    // createSummary(order);
    }else{
        form.reportValidity();
   }
    
    

    console.log(out);
    // console.log(order);
    

})
function createSummary(item){
    output.textContent = JSON.stringify(item,undefined,2)
}