const BASE_PRICE = 12;


function calcShipping(method, z){
    if(method === "pickup") return 0;
    const byZone = {A:2.5, B:4, C:6.5};
    return byZone[z] ?? 0;
}

function updateTotals(){
    const ship = calcShipping(delivery.value, zone.value);
    const total = basePrice + ship;
    
}