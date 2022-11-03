var searchButtonEl = document.getElementById('searchBtn');
var citySearchEl = document.getElementById('citySearch');
var cityNameDateEl = document.getElementById('cityNameDate');
var cityTempEl = document.getElementById('cityTemp');
var cityWindEl = document.getElementById('cityWind');
var cityHumidityEl = document.getElementById('cityHum');
var forecastCardEl = document.getElementsByClassName('forecastCard');
var APIKey = "6eeea499c62fe1e384fc56e6dc479df1";

function getApi() {
  var cityName = citySearchEl.value
  var geocodeUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + APIKey;

  fetch(geocodeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      var cityCurrentUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
      var cityFiveDayUrl =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

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
        });

      fetch(cityFiveDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var fiveDayArray = [];

          for (i = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
              fiveDayArray.push(data.list[i]);
            }
          }
          console.log(fiveDayArray);

          for (i = 0; i < fiveDayArray.length; i++) {
            var date = new Date(fiveDayArray[i].dt * 1000);
            date = date.toLocaleDateString("en-US");

            forecastCardEl[i].children[0].innerText = date;
            forecastCardEl[i].children[2].children[0].innerText = "Temp: " + fiveDayArray[i].main.temp + " °F";
            forecastCardEl[i].children[2].children[1].innerText = "Wind: " + fiveDayArray[i].wind.speed + " MPH";
            forecastCardEl[i].children[2].children[2].innerText = "Humidity: " + fiveDayArray[i].main.humidity + " %";
          }

        });
    })
}

searchButtonEl.addEventListener('click', getApi);

console.log(forecastCardEl);