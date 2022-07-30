function getinfo() {
    const cityInputEl = document.getElementById("cityInput")
    const cityNameEl = document.getElementById("cityName")
    cityNameEl.innerHTML = cityInputEl.value

}

function weatherFetch(city) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c1b5cc60aa24f5931e48ec067693e189")
        .then(response => response.json())
        .then((data) => this.displayWeather(data));

}

function displayWeather(data) {

    var name = data.name
    var temperature = data.main.temp
    var humidity = data.main.humidity
    var wind = data.wind.speed
    var date = data.dt
    document.getElementById("cityName").innerText = "City: " + name + " (" + date + ")"
    document.getElementById("currentCityTemp").innerText = "Temperature: " + temperature
    document.getElementById("currentWind").innerText = "Wind: " + wind
    document.getElementById("currentHumidity").innerText = "Humidity: " + humidity
    var longitude = data.coord.lon
    var latitude = data.coord.lat
    next5Days(latitude, longitude)
    console.log(data)
}

function searchCity() {
    var city = document.getElementById("cityInput").value;
    weatherFetch(city)

}


function next5Days(latitude, longitude) {
    fetch("http://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=c1b5cc60aa24f5931e48ec067693e189")
        .then(response => response.json())
        .then(function (data) {
            display5Days(data)
            displayCurrentUV(data)
        });

}

function display5Days(data) {
    for (i = 1; i < 6; i++) {

        var dailyData = data.daily[i]
        var dailyTemperature = dailyData.temp.max
        var dailyWind = dailyData.wind_speed
        var dailyHumidity = dailyData.humidity
        var dailyDate = dailyData.dt
        var dailyIcon = dailyData.weather[0].icon
        var forcastBox = document.createElement("div")
        var forcastDate = document.createElement('header')
        forcastDate.innerText = "Date:" + dailyDate
        forcastBox.appendChild(forcastDate)
        var forcastImage = document.createElement("img")
        forcastImage.src = "https://openweathermap.org/img/wn/" + dailyIcon + ".png"
        forcastBox.appendChild(forcastImage)
        var forcastTemperature = document.createElement('p')
        forcastTemperature.innerText = "Temperature" + dailyTemperature
        forcastBox.appendChild(forcastTemperature)
        var forcastWind = document.createElement('p')
        forcastWind.innerText = "Wind:" + dailyWind
        forcastBox.appendChild(forcastWind)
        var forcastHumidity = document.createElement('p')
        forcastHumidity.innerText = "Humidity:" + dailyHumidity
        forcastBox.appendChild(forcastHumidity)



        var forcastBoxContainer = document.getElementById("forcastBoxContainer")
        forcastBoxContainer.appendChild(forcastBox)

        console.log(dailyTemperature, dailyHumidity, dailyWind)

    }

    console.log(data)
}

function displayCurrentUV(data) {
    var currentUVI = data.current.uvi

    var currentUVIDisplay = document.getElementById("currentUV")
     currentUVIDisplay.innerText = "UVI: " + currentUVI

}

function changeUVBackground {


}