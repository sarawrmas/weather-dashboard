var searchButton = document.getElementById("searchBtn");
var city = document.getElementById("searchText");

var searchByCity = function() {
    var newCityBtn = document.createElement("button");
    newCityBtn.className = "searchResult";
    newCityBtn.innerHTML = city.value;
    var newCityList = document.getElementById("searchHistory");
    newCityList.appendChild(newCityBtn);
    newCityBtn.addEventListener("click", function() {
        var buttonText = newCityBtn.innerHTML;
        city.value = buttonText;
        newCityBtn.remove();
    })
}

var header = document.getElementById("resultHeader");
var temp = document.getElementById("tempResult");
var wind = document.getElementById("windResult");
var humidity = document.getElementById("humidityResult");
var uv = document.getElementById("uvResult")

var getCurrentWeather = function() {    
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var weatherIcon= data.weather[0].icon;
            header.innerHTML = data.name + " <img class='icon' src='http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png'>" + "</br>" + moment().format('l');
            temp.innerHTML = data.main.temp + "° F";
            wind.innerHTML = data.wind.speed + " MPH";
            humidity.innerHTML = data.main.humidity + "%";
            
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
            .then(function(response) {
                return response.json();
            })
            .then(function(uvData) {
            var uvIndex = uvData.current.uvi;
            uv.innerHTML = uvIndex;
                if (uvIndex <= 2.99) {
                    uv.className = "favorable";
                }
                if (uvIndex >= 3 && uvIndex <= 7.99) {
                    uv.className = "moderate";
                }
                if (uvIndex >= 8) {
                    uv.className = "severe";
                }

                for (var i = 1; i < 6; i++) {
                var icon = uvData.daily[i].weather[0].icon;
                document.getElementById("headerDay" + i).innerHTML = moment().add(i, 'days').format('l');
                document.getElementById("imgDay" + i).innerHTML = "<img class='icon' src='http://openweathermap.org/img/wn/" + icon +"@2x.png'>"
                document.getElementById("tempDay" + i).innerHTML = uvData.daily[i].temp.day + "° F";
                document.getElementById("windDay" + i).innerHTML = uvData.daily[i].wind_speed + " MPH";
                document.getElementById("humidityDay" + i).innerHTML = uvData.daily[i].humidity + "%";
                }
            })
        });
}

searchButton.addEventListener("click", function() {
    searchByCity();
    getCurrentWeather();
    city.value = "";
});

// api key: 75d360e486d3c1c8a360575d67c292a7
// https://openweathermap.org/api/one-call-api