var cities = []
getfromStorage()

function getinfo() {
    const cityInputEl = document.getElementById("cityInput")
    const cityNameEl = document.getElementById("cityName")
    cityNameEl.innerHTML = cityInputEl.value

}

function weatherFetch(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c1b5cc60aa24f5931e48ec067693e189")
        .then(response => response.json())
        .then((data) => this.displayWeather(data));

}

function displayWeather(data) {

    var name = data.name
    var temperature = data.main.temp
    var humidity = data.main.humidity
    var wind = data.wind.speed
    var date = data.dt
    var dailyDateFormat = new Date(0)
        dailyDateFormat.setUTCSeconds(date)
        var dateSTR = (dailyDateFormat.getMonth() + 1)+ "/" + dailyDateFormat.getDate() + "/" + dailyDateFormat.getFullYear()
    document.getElementById("cityName").innerText = "City: " + name + " (" + dateSTR + ")"
    document.getElementById("currentCityTemp").innerText = "Temperature: " + temperature + " F"
    document.getElementById("currentWind").innerText = "Wind: " + wind + " MPH"
    document.getElementById("currentHumidity").innerText = "Humidity: " + humidity + "%"
    var longitude = data.coord.lon
    var latitude = data.coord.lat
    next5Days(latitude, longitude)
    console.log(data)
    
}

function searchCity() {
    var city = document.getElementById("cityInput").value;
    cities.push(city)
    addToStorage()
    getfromStorage()
    weatherFetch(city)

}


function next5Days(latitude, longitude) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=c1b5cc60aa24f5931e48ec067693e189")
        .then(response => response.json())
        .then(function (data) {
            display5Days(data)
            displayCurrentUV(data)
        });

}

function display5Days(data) {

    var forcastBoxContainer = document.getElementById("forcastBoxContainer")
    forcastBoxContainer.innerHTML = ""

    for (i = 1; i < 6; i++) {

        var dailyData = data.daily[i]
        var dailyTemperature = dailyData.temp.max
        var dailyWind = dailyData.wind_speed
        var dailyHumidity = dailyData.humidity
        var dailyDate = dailyData.dt
        var dailyIcon = dailyData.weather[0].icon
        var forcastBox = document.createElement("div")
        var forcastDate = document.createElement('header')
        var dailyDateFormat = new Date(0)
        dailyDateFormat.setUTCSeconds(dailyDate)
        var dateSTR = (dailyDateFormat.getMonth() + 1)+ "/" + dailyDateFormat.getDate() + "/" + dailyDateFormat.getFullYear()
        forcastDate.innerText = "Date:" + dateSTR
        forcastBox.appendChild(forcastDate)
        var forcastImage = document.createElement("img")
        forcastImage.src = "https://openweathermap.org/img/wn/" + dailyIcon + ".png"
        forcastBox.appendChild(forcastImage)
        var forcastTemperature = document.createElement('p')
        forcastTemperature.innerText = "Temperature: " + dailyTemperature + " F"
        forcastBox.appendChild(forcastTemperature)
        var forcastWind = document.createElement('p')
        forcastWind.innerText = "Wind: " + dailyWind + " MPH"
        forcastBox.appendChild(forcastWind)
        var forcastHumidity = document.createElement('p')
        forcastHumidity.innerText = "Humidity: " + dailyHumidity + "%"
        forcastBox.appendChild(forcastHumidity)



        forcastBoxContainer.appendChild(forcastBox)

        console.log(dailyTemperature, dailyHumidity, dailyWind)

    }

    console.log(data)
}

function displayCurrentUV(data) {
    var currentUVI = data.current.uvi

    var currentUVIDisplay = document.getElementById("currentUV")
     currentUVIDisplay.innerText = "UV Index: " + currentUVI
    
    let currentUVIBackground = document.getElementById("currentUV")

     if (currentUVI <=5) {
    
        currentUVIBackground.style.backgroundColor = "azure";
     } else if (currentUVI <=7 || currentUVI.value >=5.1) {

        currentUVIBackground.style.backgroundColor = "yellow";
     } else if (currentUVI >=7.1) {

        currentUVIBackground.style.backgroundColor = "red";
     }



     
}

function addToStorage() {
localStorage.setItem("cities", JSON.stringify(cities))

}

function getfromStorage() {
if (localStorage.getItem("cities") != undefined){
let cities = JSON.parse(localStorage.getItem("cities"))
var searchedCitiesEl = document.getElementById("searchedCities")
searchedCitiesEl.innerHTML = ""
for (var i = cities.length -1; i >= cities.length-5; i--){
let cityButton = document.createElement("button")
cityButton.innerText = cities[i]
let city = cities[i]
cityButton.addEventListener("click", function buttonClick(event){
weatherFetch(city)

})
searchedCitiesEl.appendChild(cityButton)

}
}


}





