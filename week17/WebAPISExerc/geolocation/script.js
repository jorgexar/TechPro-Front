
const btn = document.getElementById("location-btn")
const latEl = document.getElementById("lat")
const longEl = document.getElementById("long")
const accEl = document.getElementById("acc")
const errorEl = document.getElementById("error")
const gMaps = document.getElementById("gMaps")
const locationWeatherEl = document.getElementById("locationWeather");
const locationTempEl = document.getElementById("locationTemp");
const locationDayEl = document.getElementById("locationDay")
const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};
let map;
const mapInfo = document.getElementById("mapInfo")
const weatherDescriptions = {
    0: "Clear",
    1: "Clear",
    2: "Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    56: "FreezingDrizzle",
    57: "FreezingDrizzle",
    61: "Rain",
    63: "Rain",
    65: "Rain",
    66: "FreezingRain",
    67: "FreezingRain",
    71: "Snow",
    73: "Snow",
    75: "Snow",
    77: "SnowGrains",
    80: "Showers",
    81: "Showers",
    82: "Showers",
    85: "SnowShowers",
    86: "SnowShowers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm"
};

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
async function getWeather(lat,long) {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current=temperature_2m,is_day,weather_code`;
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Current Temperature
        const currentTemp = data.current.temperature_2m;
        const tempUnit = data.current_units.temperature_2m;
        locationTempEl.textContent = `${currentTemp}${tempUnit}`

        // Is Day
        const isDayTime = data.current.is_day>0
        locationDayEl.textContent = isDayTime ? "Daytime" : "NightTime"

        const weatherCode = data.current.weather_code
        const currentWeather = weatherDescriptions[weatherCode]
        locationWeatherEl.textContent = currentWeather;
        
    })
        
}
function success(position) {
    
    let coords = position.coords
    console.log(position)
    console.log(coords)
    latEl.innerHTML = `${coords.latitude}`;
    longEl.innerHTML = `${coords.longitude}`;
    accEl.innerHTML = `${(coords.accuracy / 1000).toFixed(2)}kms `
    btn.textContent = "Get My Location";
    btn.disabled = false;
    gMaps.innerHTML = `<a href="https://www.google.com/maps/place/${coords.latitude}+${coords.longitude}" target="_blank">Open on Google Maps</a>`
    console.log(`https://www.google.com/maps/place/${coords.latitude}+${coords.longitude}`)
    getWeather(coords.latitude,coords.longitude)
    // Leaflet free - No API key - Found this ready, not my code
    if (!map) {
        console.log(`${coords.latitude } + ${coords.longitude}`)
        map = L.map('map').setView([coords.latitude, coords.longitude], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    } else {
        map.setView([coords.latitude, coords.longitude], 15);
    }
    L.marker([coords.latitude, coords.longitude]).addTo(map)
        // .bindPopup('You are around here!')
        // .openPopup();

}

function error() {
    errorEl.innerHTML = "Sorry, no position available.";
    btn.textContent = "Get My Location";
    btn.disabled = false;
}
btn.addEventListener('click', () => {
    getLocation();
})

