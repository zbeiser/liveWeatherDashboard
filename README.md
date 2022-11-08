# liveWeatherDashboard

## Description
The goal of this project was to create an application that can search for cities by name and display their current weather data, as well as a 5 day forecast. This involved the usage of the OpenWeatherMap API, which provided 3 useful API call links with a free subscription. The first is a geocoding API, which allows you to enter the name of a city and receive its latitude and longitude. This incorporates into the usage of the other two API urls, the Current Weather and 5 Day Forecast, since they both require latitude and longitude values for each search. With JavaScript fetches, I was able to store the weather data into arrays and update the UI with their values. Then using local storage, I was able to create persistent buttons that retrieve previously searched weather data and display it once again onto the UI.

## Installation
N/A

## Usage
Website's URL: https://zbeiser.github.io/liveWeatherDashboard/

Open to application and type in the name of a city, then press search. You should be able to view the current weather in a large card on top, as well as a 5-day forecast in 5 smaller cards below. Upon searching for a city, a button with the name of the city will be created below the search button. You can click these buttons to view the data for that city again. There are icons that display the weather conditions, as well as lists displaying the temperature, wind, and humidity.

![Screenshot](https://github.com/zbeiser/liveWeatherDashboard/blob/main/Assets/liveWeatherDashboard.png?raw=true)

## Credits
Thank you to the UW Coding Bootcamp staff and students, as well as W3Schools, Mozilla MDN Web Docs, and Stack Overflow for providing numerous educational resources during the development of this project. Thank you to the OpenWeatherMap API for providing the cities' locational and weather data for this project.

## License
Please refer to the LICENSE in the repo.