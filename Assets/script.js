var searchButtonEl = document.getElementById('searchBtn');
var citySearchEl = document.getElementById('citySearch');
var cityNameDateEl = document.getElementById('cityNameDate');
var cityTempEl = document.getElementById('cityTemp');
var cityWindEl = document.getElementById('cityWind');
var cityHumidityEl = document.getElementById('cityHum');
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

      var cityFiveDayUrl = 
        "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";

      fetch(cityFiveDayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        var cityNameDate = data.city.name + " (" + data.list[0].dt_txt.substring(0, 10) + ")";
        var temp = "Temp: " + data.list[0].main.temp + " °F";
        var wind = "Wind: " + data.list[0].wind.speed + " MPH";
        var humidity = "Humidity: " + data.list[0].main.humidity + " %";

        cityNameDateEl.innerText = cityNameDate;
        cityTempEl.innerText = temp;
        cityWindEl.innerText = wind;
        cityHumidityEl.innerText = humidity;
      })
    });
}

searchButtonEl.addEventListener('click', getApi);