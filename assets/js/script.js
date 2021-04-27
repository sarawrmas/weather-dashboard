var searchButton = document.getElementById("searchBtn");

var displaySearchCity = function() {
    var citySearch = document.getElementById("searchText").value;
    var newCityBtn = document.createElement("button");
    newCityBtn.className = "searchChild";
    newCityBtn.innerHTML = citySearch;
    var newCityList = document.getElementById("searchHistory");
    newCityList.appendChild(newCityBtn);
    document.getElementById("resultHeader").innerHTML = citySearch + "  " + moment().format('l');
}

searchButton.addEventListener("click", displaySearchCity);


// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     });

// api key: 75d360e486d3c1c8a360575d67c292a7
// https://openweathermap.org/api/one-call-api

var header = document.getElementById("resultHeader");
var temp = document.getElementById("tempResult");
var wind = document.getElementById("windResult");
var humidity = document.getElementById("humidityResult");
var uv = document.getElementById("uvResult")

var city = document.getElementById("searchText").value;


fetch("https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var weatherIcon= data.weather[0].icon;
        header.innerHTML = data.name + " <img class='icon' src='http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png'>"
        temp.innerHTML = data.main.temp;
        wind.innerHTML = data.wind.speed;
        humidity.innerHTML = data.main.humidity;
        
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
        .then(function(response) {
            return response.json();
        })
        .then(function(uvData) {
        var uvIndex = uvData.current.uvi;
        uv.innerHTML = uvIndex;
            if (uvIndex <= 2) {
                uv.className = "favorable";
            }
            if (uvIndex >= 3 && uvIndex <= 7) {
                uv.className = "moderate";
            }
            if (uvIndex >= 8) {
                uv.className = "severe";
            }
        })
    });