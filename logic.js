function getinfo() {
const cityInputEl = document.getElementById("cityInput")
const cityNameEl = document.getElementById("cityName")
cityNameEl.innerHTML = cityInputEl.value

}

function weatherFetch(city) {
fetch("http://api.openweathermap.org/data/2.5/forecast?q=tokyo&appid=c1b5cc60aa24f5931e48ec067693e189")
.then(response => response.json())
.then((data) => this.displayWeather(data));

}

function displayWeather(data) {

const {name} = data;
const {temp} = data.main
const {humidity} = data.main

console.log(name,temp,humidity)

}
