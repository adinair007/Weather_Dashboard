var cityFormEl = document.getElementById('citySearch-form');
var userInputEl = document.getElementById('user-input');
var pastSearchBtnEl = document.getElementById('previousSearches-btn');
var currentForecastEl = document.getElementById('current-forecast')
var searchedInputEl = document.getElementById('searched-city');
var weatherContainerEl = document.getElementById('weather-container');
var forecastHeaderEl = document.getElementById('forecast-title')
var weekForecastContainerEl = document.getElementById('fiveDay-container')
var cities = [];


var formSubmission = function(event) {
    event.preventDefault();
    var city = cityInputEl.ariaValueMax.trim();

    if(city){
        cityWeather(city);
        fiveDay(city);
        cities.unshift({city});
        userInputEl.value = "";

    }else{
        alert("Please enter a city")
    }
    saveSearch ();
    pastSearch(city);
}



//--Fetching OpenWeather Api--

var cityWeather = function(city){
    var apiKey = "c93dcbf9d2d3c9f5a47e3578c1193891";
    var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            currentForecast(data, city);
        });
    });

};

//--Getting current weather--

var currentForecast = function(weather, searchCity){
    weatherContainerEl.textContent ="";
    searchedInputEl.textContent = searchCity;

    //--Displaying current day--
    var currentDay = document.createElement("span");
    currentDay.textContent=" ("+ moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    searchedInputEl.appendChild(currentDay);

    //--Displaying current weather icon--
    var weatherIconEl = document.createElement("span");
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
    weatherIconEl.appendChild(weatherIcon);
    searchedInputEl.appendChild(weatherIconEl);

    //--Displaying current temperature--
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item";

    //--Appending to the main weather-container--
    weatherContainerEl.appendChild(temperatureEl);

    //--Displaying current humidity--
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item";
    
     //--Appending to the main weather-container--
    weatherContainerEl.appendChild(humidityEl);

    //--Displaying current wind-speed--
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind-Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";

    //--Appending to the main weather-container--
    weatherContainerEl.appendChild(windSpeedEl);

}


var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

cityFormEl.addEventListener("submit", formSubmission);