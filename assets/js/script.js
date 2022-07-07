var citySearch = document.querySelector('.form-control');
var btnSearch = document.querySelector('#search-btn');
var cityNameDisplay = document.querySelector('.card-title');
var currentWeatherDisplay = document.querySelector('.card-text');
var dateDisplay5 = document.querySelector('.date-1');
var dateDisplay4 = document.querySelector('.date-2');
var dateDisplay3 = document.querySelector('.date-3');
var dateDisplay2 = document.querySelector('.date-4');
var dateDisplay1 = document.querySelector('.date-5');
var weatherDisplay5 = document.querySelector('.weather-1');
var weatherDisplay4 = document.querySelector('.weather-2');
var weatherDisplay3 = document.querySelector('.weather-3');
var weatherDisplay2 = document.querySelector('.weather-4');
var weatherDisplay1 = document.querySelector('.weather-5');

// Using Moment.js to display current date and forecast dates
var currentDate = moment().format("M/D/YYYY");
var date1 = moment().add(1, "days").format("M/D/YYYY");
var date2 = moment().add(2, "days").format("M/D/YYYY");
var date3 = moment().add(3, "days").format("M/D/YYYY");
var date4 = moment().add(4, "days").format("M/D/YYYY");
var date5 = moment().add(5, "days").format("M/D/YYYY");

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
                    // Displaying today's date and today's weather conditions
                    cityNameDisplay.textContent = data.name;
                    cityNameDisplay.innerHTML += "&nbsp" + "(" + currentDate + ")";
                    currentWeatherDisplay.innerHTML = "Temperature: ";
                    currentWeatherDisplay.textContent += data.main.temp;
                    currentWeatherDisplay.innerHTML += "°F<br><br>";
                    currentWeatherDisplay.innerHTML += "Humidity: " + data.main.humidity + "%<br><br>";
                    currentWeatherDisplay.innerHTML += "Wind Speed: " + data.wind.speed + "&nbspmph<br><br>";
                    // Recording lat and lon of the searched city for use in uv index and forecast fetches
                    lat = data.coord.lat;
                    lon = data.coord.lon;
                    // Fetching UV index and forecast for next 5 days
                    var uvUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
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
                                    console.log(data.daily);
                                    weatherDisplay1.textContent = "";
                                    weatherDisplay1.innerHTML += "Temp: " + data.daily[1].temp.day + "°F<br><br>";
                                    weatherDisplay1.innerHTML += "Humidity: " + data.daily[1].humidity + "%"; 

                                    weatherDisplay2.textContent = "";
                                    weatherDisplay2.innerHTML += "Temp: " + data.daily[2].temp.day + "°F<br><br>";
                                    weatherDisplay2.innerHTML += "Humidity: " + data.daily[2].humidity + "%"; 

                                    weatherDisplay3.textContent = "";
                                    weatherDisplay3.innerHTML += "Temp: " + data.daily[3].temp.day + "°F<br><br>";
                                    weatherDisplay3.innerHTML += "Humidity: " + data.daily[3].humidity + "%"; 

                                    weatherDisplay4.textContent = "";
                                    weatherDisplay4.innerHTML += "Temp: " + data.daily[4].temp.day + "°F<br><br>";
                                    weatherDisplay4.innerHTML += "Humidity: " + data.daily[4].humidity + "%"; 

                                    weatherDisplay5.textContent = "";
                                    weatherDisplay5.innerHTML += "Temp: " + data.daily[5].temp.day + "°F<br><br>";
                                    weatherDisplay5.innerHTML += "Humidity: " + data.daily[5].humidity + "%"; 
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

    // Displaying the dates of the forecasted days
    dateDisplay1.innerHTML = date1;
    dateDisplay2.innerHTML = date2;
    dateDisplay3.innerHTML = date3;
    dateDisplay4.innerHTML = date4;
    dateDisplay5.innerHTML = date5;
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