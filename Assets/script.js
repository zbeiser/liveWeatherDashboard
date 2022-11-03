var searchButtonEl = document.getElementById('searchBtn');
var citySearchEl = document.getElementById('citySearch');
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
      var latitude = data.lat;
      var longitude = data.lon;

      var cityCurrentUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
      var cityFiveDayUrl = 
        "api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;

      fetch(cityCurrentUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
      })

      fetch(cityFiveDayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

      })
    });
}

searchButtonEl.addEventListener('click', getApi);