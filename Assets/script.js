var searchButtonEl = document.getElementById('searchBtn');
var citySearchEl = document.getElementById('citySearch');
var cityNameDateEl = document.getElementById('cityNameDate');
var cityTempEl = document.getElementById('cityTemp');
var cityWindEl = document.getElementById('cityWind');
var cityHumidityEl = document.getElementById('cityHum');
var forecastCardEl = document.getElementsByClassName('forecastCard');
var APIKey = "6eeea499c62fe1e384fc56e6dc479df1";

var forecastArray = [];

searchButtonEl.addEventListener('click', getApi);

function getApi() {
  var cityName = citySearchEl.value
  var geocodeUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" 
    + cityName + "&limit=1&appid=" + APIKey;

  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      var cityCurrentUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" 
        + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
      var cityFiveDayUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" 
        + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

      fetch(cityCurrentUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var date = new Date(data.dt * 1000);
          date = date.toLocaleDateString("en-US");

          cityNameDateEl.innerText = data.name + " " + "(" + date + ")";
          cityTempEl.innerText = "Temp: " + data.main.temp + " °F";
          cityWindEl.innerText = "Wind: " + data.wind.speed + " MPH";
          cityHumidityEl.innerText = "Humidity: " + data.main.humidity + " %";

          var currentCityIcon = document.createElement("img");
          currentCityIcon.setAttribute("src", "http://openweathermap.org/img/wn/" 
          + data.weather[0].icon + "@2x.png");
          currentCityIcon.setAttribute("style", "scale:50%");
          cityNameDateEl.appendChild(currentCityIcon);

          var savedCity = {
            cityName: data.name,
            cityDate: "(" + date + ")",
            cityIcon: "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png",
            temp: cityTempEl.innerText,
            wind: cityWindEl.innerText,
            humidity: cityHumidityEl.innerText
          }
          forecastArray.push(savedCity);
          localStorage.setItem("Forecasts", JSON.stringify(forecastArray));

          var savedCityBtnEl = document.createElement("button");
          savedCityBtnEl.innerText = data.name;
          savedCityBtnEl.classList.add("btn", "btn-secondary", "btn-block")
          document.getElementById("searchColumn").appendChild(savedCityBtnEl);
          savedCityBtnEl.addEventListener("click", retrieveSearch)
        });

      fetch(cityFiveDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var fiveDayArray = [];

          for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
              fiveDayArray.push(data.list[i]);
            }
          }

          for (i = 0; i < fiveDayArray.length; i++) {
            var date = new Date(fiveDayArray[i].dt * 1000);
            date = date.toLocaleDateString("en-US");

            forecastCardEl[i].children[0].innerText = date;
            forecastCardEl[i].children[2].children[0].innerText = "Temp: " + fiveDayArray[i].main.temp + " °F";
            forecastCardEl[i].children[2].children[1].innerText = "Wind: " + fiveDayArray[i].wind.speed + " MPH";
            forecastCardEl[i].children[2].children[2].innerText = "Humidity: " + fiveDayArray[i].main.humidity + " %";
          }
          // Store data into local storage
          var savedFiveDay = {
            cityName: data.city.name,
            dateOne: forecastCardEl[0].children[0].innerText,
            tempOne: forecastCardEl[0].children[2].children[0].innerText,
            windOne: forecastCardEl[0].children[2].children[1].innerText,
            humOne: forecastCardEl[0].children[2].children[2].innerText,
            dateTwo: forecastCardEl[1].children[0].innerText,
            tempTwo: forecastCardEl[1].children[2].children[0].innerText,
            windTwo: forecastCardEl[1].children[2].children[1].innerText,
            humTwo: forecastCardEl[1].children[2].children[2].innerText,
            dateThree: forecastCardEl[2].children[0].innerText,
            tempThree: forecastCardEl[2].children[2].children[0].innerText,
            windThree: forecastCardEl[2].children[2].children[1].innerText,
            humThree: forecastCardEl[2].children[2].children[2].innerText,
            dateFour: forecastCardEl[3].children[0].innerText,
            tempFour: forecastCardEl[3].children[2].children[0].innerText,
            windFour: forecastCardEl[3].children[2].children[1].innerText,
            humFour: forecastCardEl[3].children[2].children[2].innerText,
            dateFive: forecastCardEl[4].children[0].innerText,
            tempFive: forecastCardEl[4].children[2].children[0].innerText,
            windFive: forecastCardEl[4].children[2].children[1].innerText,
            humFive: forecastCardEl[4].children[2].children[2].innerText,
          }
          forecastArray.push(savedFiveDay);
          localStorage.setItem("Forecasts", JSON.stringify(forecastArray));
        });
    });
}

function retrieveSearch(ev) {
  var clickedBtn = ev.target.innerText;
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
    } else if (forecastArray[i].cityName == clickedBtn && Object.keys(forecastArray[i]).length == 21) {
      forecastCardEl[0].children[0].innerText = forecastArray[i].dateOne;
      forecastCardEl[0].children[2].children[0].innerText = forecastArray[i].tempOne;
      forecastCardEl[0].children[2].children[1].innerText = forecastArray[i].windOne;
      forecastCardEl[0].children[2].children[2].innerText = forecastArray[i].humOne;
      forecastCardEl[1].children[0].innerText = forecastArray[i].dateTwo;
      forecastCardEl[1].children[2].children[0].innerText = forecastArray[i].tempTwo;
      forecastCardEl[1].children[2].children[1].innerText = forecastArray[i].windTwo;
      forecastCardEl[1].children[2].children[2].innerText = forecastArray[i].humTwo;
      forecastCardEl[2].children[0].innerText = forecastArray[i].dateThree;
      forecastCardEl[2].children[2].children[0].innerText = forecastArray[i].tempThree;
      forecastCardEl[2].children[2].children[1].innerText = forecastArray[i].windThree;
      forecastCardEl[2].children[2].children[2].innerText = forecastArray[i].humThree;
      forecastCardEl[3].children[0].innerText = forecastArray[i].dateFour;
      forecastCardEl[3].children[2].children[0].innerText = forecastArray[i].tempFour;
      forecastCardEl[3].children[2].children[1].innerText = forecastArray[i].windFour;
      forecastCardEl[3].children[2].children[2].innerText = forecastArray[i].humFour;
      forecastCardEl[4].children[0].innerText = forecastArray[i].dateFive;
      forecastCardEl[4].children[2].children[0].innerText = forecastArray[i].tempFive;
      forecastCardEl[4].children[2].children[1].innerText = forecastArray[i].windFive;
      forecastCardEl[4].children[2].children[2].innerText = forecastArray[i].humFive;
    }
  }
}

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

// TODO: Display icons;