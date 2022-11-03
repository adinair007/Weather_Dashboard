var cityFormEl = document.getElementById("citySearch-form");
var userInputEl = document.getElementById("user-input");
var pastSearchBtnEl = document.getElementById("previousSearches-btn");
var currentForecastEl = document.getElementById("current-forecast");
var searchedInputEl = document.getElementById("searched-city");
var weatherContainerEl = document.getElementById("weather-container");
var forecastHeaderEl = document.getElementById("forecast-title");
var forecastContainerEl = document.getElementById("fiveday-container");
var cities = [];

var formSubmission = function (event) {
  event.preventDefault();
  var city = userInputEl.value.trim();

  if (city) {
    cityWeather(city);
    fiveDayForecast(city);
    cities.unshift({ city });
    userInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
  saveSearch();
  pastSearch(city);
};

//--Fetching OpenWeather Api--

var cityWeather = function (city) {
  var apiKey = "c93dcbf9d2d3c9f5a47e3578c1193891";
  var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      currentForecast(data, city);
    });
  });
};

//--Getting current weather--

var currentForecast = function (weather, searchCity) {
  weatherContainerEl.textContent = "";
  searchedInputEl.textContent = searchCity;

  //--Displaying current day--
  var currentDay = document.createElement("span");
  currentDay.textContent =
    " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
  searchedInputEl.appendChild(currentDay);

  //--Displaying current weather icon--
  var weatherIconEl = document.createElement("span");
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
  );
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
};

var fiveDayForecast = function(city) {
  var apiKey = "a3ea51331f76c8184ea6d14f912424e8";
  var apiURL = `api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      displayForecast(data);
    });
  });
};

//--Function to display 5-day forecast--
var displayForecast = function (weather) {
  forecastContainerEl.textContent = "";
  forecastHeaderEl.textContent = "5 Day Forecast";

  var forecast = weather.list;
  for (var i = 0; i < forecast.length; i += 8) {
    var dailyForecast = forecast[i];

    var forecastEl = document.createElement("div");
    forecastEl.classList = "card bg-primary text-light d-flex";

    //--Displaying date--
    var dateEl = document.createElement("h5");
    dateEl.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
    dateEl.classList = "card-header text-center";

    //--Displaying weather image--
    var weatherIconEl = document.createElement("img");
    weatherIconEl.classList = "card-body text-center";
    weatherIconEl.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );

    //--Displaying temperature for that day--
    var tempEl = document.createElement("span");
    tempEl.classList = "card-body text-center";
    tempEl.textContent = "Temperature: " + dailyForecast.main.temp + " °F";

    //--Displaying wind-speed--
    var windEl = document.createElement("span");
    windEl.classList = "card-body text-center";
    windEl.textContent = "Wind: " + dailyForecast.wind.speed + " MPH";

    //--Displaying humidity--
    var humidEl=document.createElement("span");
    humidEl.classList = "card-body text-center";
    humidEl.textContent = "Humidity: " + dailyForecast.main.humidity + "  %";


    //--Appending to daily forecast--
    forecastEl.appendChild(dateEl);
    forecastEl.appendChild(weatherIconEl);
    forecastEl.appendChild(tempEl);
    forecastEl.appendChild(windEl);
    forecastEl.appendChild(humidEl);

    //--Appending to main forecast-container--
    forecastContainerEl.appendChild(forecastEl);
  }
};

var pastSearch = function (pastSearch) {
  var pastSearchEl = document.createElement("button");
  pastSearchEl.textContent = pastSearch;
  pastSearchEl.classList = "d-flex w-100 btn-light  border p-2";
  pastSearchEl.setAttribute("data-city", pastSearch);
  pastSearchEl.setAttribute("type", "submit");

  pastSearchBtnEl.append(pastSearchEl);
};

var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

var pastSearchHandler = function (event) {
  var city = event.target.getAttribute("data-city");

  if (city) {
    cityWeather(city);
    fiveDayForecast(city);
  }
};

cityFormEl.addEventListener("submit", formSubmission);
pastSearchBtnEl.addEventListener("click", pastSearchHandler);
