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

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

//--Fetching OpenWeather Api--

var cityWeather = function(city){
    var apiKey = "c93dcbf9d2d3c9f5a47e3578c1193891";
    var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiURL).then(function(response){
        response.json().then(function(data){
            currentForecast(data,city);
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
    
}