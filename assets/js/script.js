var citySearch = document.querySelector('.form-control');
var btnSearch = document.querySelector('#search-btn');
var cityNameDisplay = document.querySelector('.card-title');
var currentWeatherDisplay = document.querySelector('.card-text');

// api key
var apiKey = "c673edd3fa85ebee83a764380b4acf45";

// latitude and longitude
var lat = "";
var lon = "";

// api url
var apiUrl = "";
// Forecast url: https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// Current weather url: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// UV index url: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var apiRequest = function(city) {
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    cityNameDisplay.textContent = data.name;
                    currentWeatherDisplay.innerHTML = "Temperature: ";
                    currentWeatherDisplay.textContent += Math.round((data.main.temp - 273.15) * 9/5 + 32); // Api gives temp in K, this formula converts to F
                    currentWeatherDisplay.innerHTML += "°F<br><br>";
                    currentWeatherDisplay.innerHTML += "Humidity: " + data.main.humidity + "%<br><br>";
                    currentWeatherDisplay.innerHTML += "Wind speed: " + data.wind.speed + "&nbspmph<br><br>";
                    // Recording lat and lon of the searched city for use in uv index fetch
                    lat = data.coord.lat;
                    lon = data.coord.lon;
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve weather data');
        });

        // Fetching UV index
        var uvUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        fetch(uvUrl)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data);
                        var uvIndexDisplay = document.createElement('span');
                        currentWeatherDisplay.innerHTML += "UV index: " + data.current.uvi;
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function(error) {
                alert('Unable to retrieve weather data');
            });

    // apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    // fetch(apiUrl)
    //     .then(function(response) {
    //         if(response.ok) {
    //             console.log(response);
    //             response.json().then(function(data) {
    //                 console.log(data);

    //             })
    //         } else {
    //             alert('Error: ' + response.statusText);
    //         }
    //     })
    //     .catch(function (error) {
    //         alert('Unable to retrieve weather data');
    //     });
}

var search = function(event) {
    event.preventDefault();

    // Event.which will equal 13 when enter is pressed, and it will equal 1 when the button is pressed
    if (event.which != 13 && event.which != 1) {
        return;
    }

    var cityName = citySearch.value.trim();

    if (cityName) {
        citySearch.value = '';
        apiRequest(cityName);
    } else {
        alert('Please enter a city');
    }
}

// Executing the search when enter is pressed
citySearch.addEventListener('keyup', search);

// Executing the search when search button is pressed
btnSearch.addEventListener('click', search);