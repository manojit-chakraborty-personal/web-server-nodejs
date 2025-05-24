// console.log('client side javascript file is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.getElementById("weather-form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = document.getElementById("address").value;

  fetch(`http://localhost:3000/weather?search=${address}`).then((response) => {
    response.json().then((data) => {
      const resultBox = document.getElementById("weather-result");
      const locationEl = document.getElementById("location");
      const descriptionEl = document.getElementById("description");
      const temperatureEl = document.getElementById("temperature");
      const feelsLikeEl = document.getElementById("feelslike");
      const humidityEl = document.getElementById("humidity");

      if (data.error != undefined) {
        locationEl.textContent = "Error";
        descriptionEl.textContent = data.error;
        temperatureEl.textContent = "";
        feelsLikeEl.textContent = "";
        humidityEl.textContent = "";
        return;
      }

      locationEl.textContent = data.location;
      descriptionEl.textContent = data.forecast.weather_description;
      temperatureEl.textContent = data.forecast.temperature;
      feelsLikeEl.textContent = data.forecast.feelsLike;
      humidityEl.textContent = data.forecast.humidity + '%';
      resultBox.style.display = "block";
    });
  });
});
