
const btn = document.getElementById("location-btn")
const latEl = document.getElementById("lat")
const longEl = document.getElementById("long")
const accEl = document.getElementById("acc")
const errorEl = document.getElementById("error")
const gMaps = document.getElementById("gMaps")
const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};
let map;
const mapInfo = document.getElementById("mapInfo")

function getLocation() {
    btn.textContent = "Loading..."
    mapInfo.textContent = `Palantir is looking for you...`
    btn.disabled = true;
    if (!navigator.geolocation) {
        errorEl.innerHTML = "Geolocation is not supported by this browser.";
        return;
    }
    navigator.geolocation.getCurrentPosition(success, error, options);

}

function success(position) {
    let coords = position.coords

    console.log(coords)
    latEl.innerHTML = `${coords.latitude}`;
    longEl.innerHTML = `${coords.longitude}`;
    accEl.innerHTML = `${(coords.accuracy / 1000).toFixed(2)}kms `
    btn.textContent = "Get My Location";
    btn.disabled = false;
    gMaps.innerHTML = `<a href="https://www.google.com/maps/place/${coords.latitude}+${coords.longitude}" target="_blank">Open on Google Maps</a>`
    console.log(`https://www.google.com/maps/place/${coords.latitude}+${coords.longitude}`)
    // Leaflet free - No API key - Found this ready, not my code
    if (!map) {
        map = L.map('map').setView([coords.latitude, coords.longitude], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    } else {
        map.setView([coords.latitude, coords.longitude], 15);
    }
    L.marker([coords.latitude, coords.longitude]).addTo(map)
        .bindPopup('You are around here!')
        .openPopup();

}

function error() {
    errorEl.innerHTML = "Sorry, no position available.";
    btn.textContent = "Get My Location";
    btn.disabled = false;
}
btn.addEventListener('click', () => {
    getLocation();
})