function fetchWeather(cityName) {
    var weatherKey = '96515e32da8200e2651c60008ed403ea';
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}`;
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherKey}`;

    // Fetching and processing data from currentWeatherURL
    fetch(currentWeatherURL)
      .then(response => response.json())
      .then(data => {
          var name = data.name;
          var date = new Date(data.dt * 1000).toLocaleDateString();
          var weatherIcon = data.weather[0].icon;
          var temperature = data.main.temp;
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;
          
          
          document.getElementById("city-name").textContent = name;
          document.getElementById("date").textContent = date;
          document.getElementById("weather-icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;
          document.getElementById("temperature").textContent = temperature;
          document.getElementById("humidity").textContent = humidity;
          document.getElementById("wind-speed").textContent = windSpeed;
        })
        .catch(error => {
            console.log(error);
      });
  
    // Fetching and processing data from forecastURL
    fetch(forecastURL)
      .then(response => response.json())
      .then(data => {
        console.log("DATA: ", data)
        var forecastElements = document.getElementById("forecast");
        forecastElements.innerHTML = ""; ;
        var currentDate = new Date(); // Get the current date
    //   Ran For Loop to iterate weather forecast for next 5 days
        for (var i = 0; i < data.list.length; i+=8) {
            console.log("RESULT: ", data.list[i])
          var forecastData = data.list[i];
          var date = new Date(forecastData.dt * 1000).toLocaleDateString();
          var weatherIcon = forecastData.weather[0].icon;
          var temperature = forecastData.main.temp;
          var humidity = forecastData.main.humidity;
          var windSpeed = forecastData.wind.speed;
  
          // Create a forecast item element
          var forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item");
  
          // Update forecast item elements
          forecastItem.innerHTML = `
            <div class="date">${date}</div>
            <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon"></div>
            <div class="temperature">${temperature}</div>
            <div class="humidity">${humidity}</div>
            <div class="wind-speed">${windSpeed}</div>
          `;
  
          // Appended forecast item to the forecast container
          forecastElements.appendChild(forecastItem);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
//   click listener runs function once use inputs desired city 
// added local storage save users functions
var cityList = JSON.parse(localStorage.getItem("City Name")) || [];
var button = document.querySelector("#button");
var searchHistory = document.getElementById('history');

button.addEventListener("click", function() {
  var cityName = document.getElementById("cityInput").value;
  fetchWeather(cityName);
  cityList.push(cityName);
  localStorage.setItem("City Name", JSON.stringify(cityList));

  // Clear the search history
  searchHistory.innerHTML = "";

  // Display the updated search history on the screen
  for (var i = 0; i < cityList.length; i++) {
    var searchItem = document.createElement("li");
    searchItem.textContent = cityList[i];
    searchHistory.appendChild(searchItem);
  }
});
function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5) + 32;
  }
  
  // Update the temperature display to show Fahrenheit
  var temperatureInKelvin = data.main.temp; // Replace with the actual temperature value in Kelvin
  var temperatureInFahrenheit = kelvinToFahrenheit(temperatureInKelvin);
  var temperatureElement = document.getElementById("temperature");
  temperatureElement.textContent = `${temperatureInFahrenheit.toFixed(2)}°F`;





  