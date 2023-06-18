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
        var forecastElements = document.getElementById("forecast");
        forecastElements.innerHTML = ""; 
    //   Ran For Loop to iterate weather forecast for next 5 days
        for (var i = 0; i < 5; i++) {
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
  document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector("#button");
    button.addEventListener("click", function() {
      var cityName = document.getElementById("cityInput").value;
      fetchWeather(cityName);
    });
  });
  