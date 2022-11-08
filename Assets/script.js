// Declare DOM elements
var searchButtonEl = document.getElementById('searchBtn');
var citySearchEl = document.getElementById('citySearch');
var cityNameDateEl = document.getElementById('cityNameDate');
var cityTempEl = document.getElementById('cityTemp');
var cityWindEl = document.getElementById('cityWind');
var cityHumidityEl = document.getElementById('cityHum');
var forecastCardEl = document.getElementsByClassName('forecastCard');

// Declare API key as variable
var APIKey = "6eeea499c62fe1e384fc56e6dc479df1";

// Declare today's date as variable for a comparison in the five day forecast function
var currentDate = new Date().toLocaleDateString("en-US");

// Declare global array for weather forecast data
var forecastArray = [];

searchButtonEl.addEventListener('click', getApi);

function getApi() {
  var cityName = citySearchEl.value
  var geocodeUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q="
    + cityName + "&limit=1&appid=" + APIKey;

  // First fetch utilizes user input of a city's name to store its latitude and longitude
  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      // Creates both the current weather and five day forecast api URLs with the lat and long
      var cityCurrentUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat="
        + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
      var cityFiveDayUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat="
        + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

      // Second fetch retrieves the current weather
      fetch(cityCurrentUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Assigns the current weather data values to their respective elements
          var date = new Date(data.dt * 1000);
          date = date.toLocaleDateString("en-US");

          cityNameDateEl.innerText = data.name + " " + "(" + date + ")";
          cityTempEl.innerText = "Temp: " + data.main.temp + " °F";
          cityWindEl.innerText = "Wind: " + data.wind.speed + " MPH";
          cityHumidityEl.innerText = "Humidity: " + data.main.humidity + " %";

          // Creates the current weather icon
          var currentCityIcon = document.createElement("img");
          currentCityIcon.setAttribute("src", "https://openweathermap.org/img/wn/"
            + data.weather[0].icon + "@2x.png");
          currentCityIcon.setAttribute("style", "scale:50%");
          cityNameDateEl.appendChild(currentCityIcon);

          // Assigns current weather data values to an object and stores it into an array,
          // then sets that array into the localStorage
          var savedCity = {
            cityName: data.name,
            cityDate: "(" + date + ")",
            cityIcon: "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
            temp: cityTempEl.innerText,
            wind: cityWindEl.innerText,
            humidity: cityHumidityEl.innerText
          }
          forecastArray.push(savedCity);
          localStorage.setItem("Forecasts", JSON.stringify(forecastArray));

          // Creates a button for every city search, adds event listener to retrieve their data
          var savedCityBtnEl = document.createElement("button");
          savedCityBtnEl.innerText = data.name;
          savedCityBtnEl.classList.add("btn", "btn-secondary", "btn-block")
          document.getElementById("searchColumn").appendChild(savedCityBtnEl);
          savedCityBtnEl.addEventListener("click", retrieveSearch)
        });

      // Last fetch retrieves the five day forecast
      fetch(cityFiveDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var fiveDayArray = [];

          // Out of the 40 list items that contain 3-hour intervals of weather, this targets the 
          // same hour of each day and makes sure it's not the current day. Stores 5 days into array.
          for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("18:00:00") && new Date(data.list[i].dt * 1000) !== currentDate) {
              fiveDayArray.push(data.list[i]);
            }
          }

          // Assigns the five day forecast data values & icons to their respective cards. 
          for (i = 0; i < fiveDayArray.length; i++) {
            var date = new Date(fiveDayArray[i].dt * 1000);
            date = date.toLocaleDateString("en-US");

            forecastCardEl[i].children[0].innerText = date;
            forecastCardEl[i].children[1].src = "https://openweathermap.org/img/wn/"
              + fiveDayArray[i].weather[0].icon + "@2x.png";
            forecastCardEl[i].children[1].style = "width:50px; height:50px;"
            forecastCardEl[i].children[2].children[0].innerText = "Temp: "
              + fiveDayArray[i].main.temp + " °F";
            forecastCardEl[i].children[2].children[1].innerText = "Wind: "
              + fiveDayArray[i].wind.speed + " MPH";
            forecastCardEl[i].children[2].children[2].innerText = "Humidity: "
              + fiveDayArray[i].main.humidity + " %";
          }

          // Assigns five day forecast data values to an object and stores it into an array,
          // then sets that array into the localStorage.
          var savedFiveDay = {
            cityName: data.city.name,
            dateOne: forecastCardEl[0].children[0].innerText,
            iconOne: forecastCardEl[0].children[1].src,
            tempOne: forecastCardEl[0].children[2].children[0].innerText,
            windOne: forecastCardEl[0].children[2].children[1].innerText,
            humOne: forecastCardEl[0].children[2].children[2].innerText,
            dateTwo: forecastCardEl[1].children[0].innerText,
            iconTwo: forecastCardEl[1].children[1].src,
            tempTwo: forecastCardEl[1].children[2].children[0].innerText,
            windTwo: forecastCardEl[1].children[2].children[1].innerText,
            humTwo: forecastCardEl[1].children[2].children[2].innerText,
            dateThree: forecastCardEl[2].children[0].innerText,
            iconThree: forecastCardEl[2].children[1].src,
            tempThree: forecastCardEl[2].children[2].children[0].innerText,
            windThree: forecastCardEl[2].children[2].children[1].innerText,
            humThree: forecastCardEl[2].children[2].children[2].innerText,
            dateFour: forecastCardEl[3].children[0].innerText,
            iconFour: forecastCardEl[3].children[1].src,
            tempFour: forecastCardEl[3].children[2].children[0].innerText,
            windFour: forecastCardEl[3].children[2].children[1].innerText,
            humFour: forecastCardEl[3].children[2].children[2].innerText,
            dateFive: forecastCardEl[4].children[0].innerText,
            iconFive: forecastCardEl[4].children[1].src,
            tempFive: forecastCardEl[4].children[2].children[0].innerText,
            windFive: forecastCardEl[4].children[2].children[1].innerText,
            humFive: forecastCardEl[4].children[2].children[2].innerText,
          }
          forecastArray.push(savedFiveDay);
          localStorage.setItem("Forecasts", JSON.stringify(forecastArray));
        });
    });
}

// Upon clicking saved city buttons, this function retrieves & displays their data.
function retrieveSearch(ev) {
  // This saves the city's name to target the correct objects.
  var clickedBtn = ev.target.innerText;

  // This targets current weather objects since they have a length of 6. Then updates current
  // weather elements accordingly.
  for (i = 0; i < forecastArray.length; i++) {
    if (forecastArray[i].cityName == clickedBtn && Object.keys(forecastArray[i]).length == 6) {
      cityNameDateEl.innerText = forecastArray[i].cityName + " " + forecastArray[i].cityDate;
      cityTempEl.innerText = forecastArray[i].temp;
      cityWindEl.innerText = forecastArray[i].wind;
      cityHumidityEl.innerText = forecastArray[i].humidity;

      if (currentCityIcon) {
        currentCityIcon.src = forecastArray[i].cityIcon;
      } else {
        var currentCityIcon = document.createElement("img");
        currentCityIcon.setAttribute("src", forecastArray[i].cityIcon);
        currentCityIcon.setAttribute("style", "scale:50%");
        cityNameDateEl.appendChild(currentCityIcon);
      }
      // This targets five day forecast objects since they have a length of 26. Then updates the
      // five day forecast cards accordingly.
    } else if (forecastArray[i].cityName == clickedBtn && Object.keys(forecastArray[i]).length == 26) {
      forecastCardEl[0].children[0].innerText = forecastArray[i].dateOne;
      forecastCardEl[0].children[1].src = forecastArray[i].iconOne;
      forecastCardEl[0].children[1].style = "width:50px; height:50px;"
      forecastCardEl[0].children[2].children[0].innerText = forecastArray[i].tempOne;
      forecastCardEl[0].children[2].children[1].innerText = forecastArray[i].windOne;
      forecastCardEl[0].children[2].children[2].innerText = forecastArray[i].humOne;
      forecastCardEl[1].children[0].innerText = forecastArray[i].dateTwo;
      forecastCardEl[1].children[1].src = forecastArray[i].iconTwo;
      forecastCardEl[1].children[1].style = "width:50px; height:50px;"
      forecastCardEl[1].children[2].children[0].innerText = forecastArray[i].tempTwo;
      forecastCardEl[1].children[2].children[1].innerText = forecastArray[i].windTwo;
      forecastCardEl[1].children[2].children[2].innerText = forecastArray[i].humTwo;
      forecastCardEl[2].children[0].innerText = forecastArray[i].dateThree;
      forecastCardEl[2].children[1].src = forecastArray[i].iconThree;
      forecastCardEl[2].children[1].style = "width:50px; height:50px;"
      forecastCardEl[2].children[2].children[0].innerText = forecastArray[i].tempThree;
      forecastCardEl[2].children[2].children[1].innerText = forecastArray[i].windThree;
      forecastCardEl[2].children[2].children[2].innerText = forecastArray[i].humThree;
      forecastCardEl[3].children[0].innerText = forecastArray[i].dateFour;
      forecastCardEl[3].children[1].src = forecastArray[i].iconFour;
      forecastCardEl[3].children[1].style = "width:50px; height:50px;"
      forecastCardEl[3].children[2].children[0].innerText = forecastArray[i].tempFour;
      forecastCardEl[3].children[2].children[1].innerText = forecastArray[i].windFour;
      forecastCardEl[3].children[2].children[2].innerText = forecastArray[i].humFour;
      forecastCardEl[4].children[0].innerText = forecastArray[i].dateFive;
      forecastCardEl[4].children[1].src = forecastArray[i].iconFive;
      forecastCardEl[4].children[1].style = "width:50px; height:50px;"
      forecastCardEl[4].children[2].children[0].innerText = forecastArray[i].tempFive;
      forecastCardEl[4].children[2].children[1].innerText = forecastArray[i].windFive;
      forecastCardEl[4].children[2].children[2].innerText = forecastArray[i].humFive;
    }
  }
}

// Upon webpage load, updates the forecast array if there's data saved in the localStorage.
// Then recreates the saved city buttons by targeting city names in each current weather object.
function updateSearches() {
  var loadForecasts = JSON.parse(localStorage.getItem('Forecasts'));

  if (loadForecasts) {
    forecastArray = loadForecasts;
  }

  for (i = 0; i < forecastArray.length; i++) {
    if (Object.keys(forecastArray[i]).length == 6) {
      var savedCityBtnEl = document.createElement("button");
      savedCityBtnEl.innerText = forecastArray[i].cityName;
      savedCityBtnEl.classList.add("btn", "btn-secondary", "btn-block")
      document.getElementById("searchColumn").appendChild(savedCityBtnEl);
      savedCityBtnEl.addEventListener("click", retrieveSearch)
    }
  }
}

updateSearches();