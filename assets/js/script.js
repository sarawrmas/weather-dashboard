fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=75d360e486d3c1c8a360575d67c292a7")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });

// api key: 75d360e486d3c1c8a360575d67c292a7
// https://openweathermap.org/api/one-call-api