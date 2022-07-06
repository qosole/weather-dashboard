var citySearch = document.querySelector('.form-control');
var btnSearch = document.querySelector('#search-btn');

// api key
var apiKey = "c673edd3fa85ebee83a764380b4acf45";

// latitude and longitude
var lat = "";
var lon = "";

// api url
var apiUrl = "";
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

var apiRequest = function(city) {
    apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                console.log(response);
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