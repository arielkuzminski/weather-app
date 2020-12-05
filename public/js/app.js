const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageWeather = document.querySelector(".weather");
const messageStatus = document.querySelector(".status");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  messageStatus.textContent = "Loading...";
  messageWeather.textContent = "";

  fetch(`http://localhost:3000/weather?address=${searchInput.value}`)
    .then(response => response.json())
    .then((data) => {
        messageWeather.textContent = `Temperature in city of ${data.address} is: ${data.forecast.currentTemperature}`;
        messageStatus.textContent = "";
    })
    .catch((error) => {
        console.log(error);
        messageStatus.textContent = "Please try again!";
    });
});
