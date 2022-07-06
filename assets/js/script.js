var citySearch = document.querySelector('.form-control');
var btnSearch = document.querySelector('#search-btn');
var cityNameDisplay = document.querySelector('.card-title');
var currentWeatherDisplay = document.querySelector('.card-text');

// api key
var apiKey = "c673edd3fa85ebee83a764380b4acf45";

// Current weather url: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// UV index and forecast url: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var apiRequest = function(city) {
    // latitude and longitude
    var lat = "";
    var lon = "";

    // Fetching current weather data
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    console.log(data);
                    cityNameDisplay.textContent = data.name;
                    currentWeatherDisplay.innerHTML = "Temperature: ";
                    currentWeatherDisplay.textContent += data.main.temp;
                    currentWeatherDisplay.innerHTML += "°F<br><br>";
                    currentWeatherDisplay.innerHTML += "Humidity: " + data.main.humidity + "%<br><br>";
                    currentWeatherDisplay.innerHTML += "Wind Speed: " + data.wind.speed + "&nbspmph<br><br>";
                    // Recording lat and lon of the searched city for use in uv index and forecast fetches
                    lat = data.coord.lat;
                    lon = data.coord.lon;
                    // Fetching UV index and forecast for next 5 days
                    var uvUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=" + apiKey;
                    fetch(uvUrl)
                        .then(function(response) {
                            if (response.ok) {
                                response.json().then(function(data) {
                                    console.log(data);
                                    // UV Index
                                    var uvIndexDisplay = document.createElement('span');
                                    currentWeatherDisplay.innerHTML += "UV Index: ";
                                    uvIndexDisplay.innerHTML = data.current.uvi;
                                    // color coding the uv index
                                    if (data.current.uvi <= 2.4) {
                                        uvIndexDisplay.style.backgroundColor = "darkgreen";
                                    } else if (data.current.uvi > 2.4 && data.current.uvi < 6) {
                                        uvIndexDisplay.style.backgroundColor = "gold";
                                    } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
                                        uvIndexDisplay.style.backgroundColor = "darkorange";
                                    } else if (data.current.uvi >= 8 && data.current.uvi < 10) {
                                        uvIndexDisplay.style.backgroundColor = "darkred";
                                    } else {
                                        uvIndexDisplay.style.backgroundColor = "darkviolet";
                                    }
                                    uvIndexDisplay.style.color = "white";
                                    uvIndexDisplay.style.padding = "5px";
                                    uvIndexDisplay.style.borderRadius = "9px";
                                    currentWeatherDisplay.appendChild(uvIndexDisplay);

                                    // Current weather icon
                                    var currentIcon = document.createElement('img');
                                    currentIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png');
                                    currentIcon.setAttribute('alt', 'icon symbolizing the current weather conditions');
                                    cityNameDisplay.appendChild(currentIcon);

                                    // Forecast
                                    
                                });
                            } else {
                                alert('Error: ' + response.statusText);
                            }
                        })
                        .catch(function(error) {
                            alert('Unable to retrieve UV index or forecast');
                        });
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to retrieve weather data');
        });
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