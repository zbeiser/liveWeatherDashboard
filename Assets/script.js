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
          var cityNameDate = data.name + " " + "(" + date + ")";
          var temp = "Temp: " + data.main.temp + " °F";
          var wind = "Wind: " + data.wind.speed + " MPH";
          var humidity = "Humidity: " + data.main.humidity + " %";

          cityNameDateEl.innerText = cityNameDate;
          cityTempEl.innerText = temp;
          cityWindEl.innerText = wind;
          cityHumidityEl.innerText = humidity;
        });

      fetch(cityFiveDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          // for (let i = 0; i < forecastCardEl.length; i++) {
          //   if ()
          // }

        });
    })
}

searchButtonEl.addEventListener('click', getApi);

console.log(forecastCardEl);