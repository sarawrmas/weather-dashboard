var searchButton = document.getElementById("searchBtn");

document.getElementById("headerDayOne").innerHTML = moment().add(1, 'days').format('l');
document.getElementById("headerDayTwo").innerHTML = moment().add(2, 'days').format('l');
document.getElementById("headerDayThree").innerHTML = moment().add(3, 'days').format('l');
document.getElementById("headerDayFour").innerHTML = moment().add(4, 'days').format('l');
document.getElementById("headerDayFive").innerHTML = moment().add(5, 'days').format('l');

var searchByCity = function() {
    var citySearch = document.getElementById("searchText").value;
    var newCityBtn = document.createElement("button");
    newCityBtn.className = "searchChild";
    newCityBtn.innerHTML = citySearch;
    var newCityList = document.getElementById("searchHistory");
    newCityList.appendChild(newCityBtn);
    document.getElementById("resultHeader").innerHTML = citySearch;
}

var header = document.getElementById("resultHeader");
var temp = document.getElementById("tempResult");
var wind = document.getElementById("windResult");
var humidity = document.getElementById("humidityResult");
var uv = document.getElementById("uvResult")

var getCurrentWeather = function() {
    var city = document.getElementById("searchText").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
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
                console.log("imgDay" + i);
                document.getElementById("imgDay" + i).innerHTML = "<img class='icon' src='http://openweathermap.org/img/wn/" + icon +"@2x.png'>"
                document.getElementById("tempDay" + i).innerHTML = uvData.daily[i].temp.day + "° F";
                document.getElementById("windDay" + i).innerHTML = uvData.daily[i].wind_speed + " MPH";
                document.getElementById("humidityDay" + i).innerHTML = uvData.daily[i].humidity + "%";
                }
            })
        });
}

// var dayOneIcon = uvData.daily[1].weather[0].icon;
//                 document.getElementById("imgDayOne").innerHTML = "<img class='icon' src='http://openweathermap.org/img/wn/" + dayOneIcon +"@2x.png'>"
//                 document.getElementById("tempDayOne").innerHTML = uvData.daily[1].temp.day + "° F";
//                 document.getElementById("windDayOne").innerHTML = uvData.daily[1].wind_speed + " MPH";
//                 document.getElementById("humidityDayOne").innerHTML = uvData.daily[1].humidity + "%";

// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=31.1171&lon=-97.7278&units=imperial&appid=75d360e486d3c1c8a360575d67c292a7")
// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {
//     console.log(data);
// })

searchButton.addEventListener("click", () => {
    searchByCity();
    getCurrentWeather();
});

// api key: 75d360e486d3c1c8a360575d67c292a7
// https://openweathermap.org/api/one-call-api