function fetchWeather(cityName) {
    var weatherKey = '96515e32da8200e2651c60008ed403ea';
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherKey}`;
    
// Fetching and processing data from weatherURL, which is pulling data from Openweathermaps
    fetch(weatherURL)
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
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector("#button");
    button.addEventListener("click", function() {
      var cityName = document.getElementById("cityInput").value;
      fetchWeather(cityName);
    });
  });
  